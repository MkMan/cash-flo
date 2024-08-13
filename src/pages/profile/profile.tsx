import { A, useParams } from "@solidjs/router";
import { userSettingsStore } from "$app-state";
import { getHrefTo } from "$app-utils";
import { Component, createMemo, For, Show } from "solid-js";

import { AddAccount } from "./add-account/add-account";
import { addAccount } from "./utils";

const ProfilePage: Component = () => {
  const { profileId } = useParams();

  const profile = userSettingsStore.profiles.find(({ id }) => id === profileId);

  if (!profile) {
    throw new Error(`Could not find profile for id ${profileId}`);
  }

  const accountsForProfile = createMemo(() =>
    userSettingsStore.accounts.filter(({ id }) =>
      profile.accountIds?.includes(id),
    ),
  );

  return (
    <section>
      <h2>{profile.name}</h2>
      <Show
        fallback={"You currently have no accounts under this profile"}
        when={accountsForProfile().length > 0}
      >
        <ul>
          <For each={accountsForProfile()}>
            {({ id, name }) => (
              <li>
                {name} <A href={getHrefTo("account", id)}>Visit</A>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <AddAccount
        onAdd={(accountName) => {
          addAccount(accountName, profile.id);
        }}
      />
    </section>
  );
};

export { ProfilePage };

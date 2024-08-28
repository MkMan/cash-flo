import type { Account, Profile } from "$app-db";

import { A, useParams } from "@solidjs/router";
import { db } from "$app-db";
import { getHrefTo } from "$app-utils";
import { Component, createMemo, createResource, For, Show } from "solid-js";

import { AddAccount } from "./add-account/add-account";
import { addAccount } from "./utils";

const ProfilePage: Component = () => {
  const { profileId: profileIdParam } = useParams();
  const profileId = parseInt(profileIdParam);

  const [profileResource] = createResource<Profile>(() =>
    db.query.profile
      .findFirst({
        where: (profile, { eq }) => eq(profile.id, profileId),
      })
      .execute()
      .then((profile) => {
        if (!profile) {
          throw new Error(`Profile not found for id ${profileId.toString()}`);
        }
        return profile;
      }),
  );

  const [accountsResource, { refetch: refreshAccounts }] = createResource<
    Account[]
  >(() =>
    db.query.account
      .findMany({
        where: (account, { eq }) => eq(account.profileId, profileId),
      })
      .execute(),
  );

  const hasAccounts = createMemo(() => {
    const numberOfAccounts = accountsResource()?.length;

    return numberOfAccounts && numberOfAccounts > 0;
  });

  return (
    <section>
      <h2>{profileResource()?.name}</h2>
      <Show
        fallback={"You currently have no accounts under this profile"}
        when={hasAccounts()}
      >
        <ul>
          <For each={accountsResource()}>
            {({ id, name }) => (
              <li>
                {name} <A href={getHrefTo("account", id.toString())}>Visit</A>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <AddAccount
        onAdd={(accountName) => {
          addAccount(accountName, profileId);
          void refreshAccounts();
        }}
      />
    </section>
  );
};

export { ProfilePage };

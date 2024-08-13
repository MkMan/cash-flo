import { useParams } from "@solidjs/router";
import { userSettingsStore } from "$app-state";
import { Component } from "solid-js";

const AccountPage: Component = () => {
  const { accountId } = useParams();

  const account = userSettingsStore.accounts.find(({ id }) => id === accountId);

  if (!account) {
    throw new Error(`Could not find account for id ${accountId}`);
  }

  return (
    <section>
      <h2>{account.name}</h2>
    </section>
  );
};

export { AccountPage };

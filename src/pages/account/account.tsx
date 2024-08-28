import type { Account } from "$app-db";
import type { Component } from "solid-js";

import { useParams } from "@solidjs/router";
import { db } from "$app-db";
import { createResource } from "solid-js";

const AccountPage: Component = () => {
  const { accountId: accountIdParam } = useParams();
  const accountId = parseInt(accountIdParam);

  const [accountResource] = createResource<Account>(() =>
    db.query.account
      .findFirst({
        where: (account, { eq }) => eq(account.id, accountId),
      })
      .execute()
      .then((account) => {
        if (!account) {
          throw new Error(`Profile not found for id ${accountId.toString()}`);
        }
        return account;
      }),
  );

  return (
    <section>
      <h2>{accountResource()?.name}</h2>
    </section>
  );
};

export { AccountPage };

import { setUserSettingsStore, userSettingsStore } from "$app-state";

const addAccount = (accountName: string, profileId: string): void => {
  const profileIndex = userSettingsStore.profiles.findIndex(
    ({ id }) => profileId === id,
  );

  if (profileIndex === -1) {
    throw new Error(
      `No Profile found with id ${profileId} while adding an account`,
    );
  }

  const newAccountId = globalThis.crypto.randomUUID();

  setUserSettingsStore("accounts", userSettingsStore.accounts.length, {
    id: newAccountId,
    name: accountName,
  });

  setUserSettingsStore("profiles", profileIndex, ({ accountIds = [] }) => ({
    accountIds: [...accountIds, newAccountId],
  }));
};

export { addAccount };

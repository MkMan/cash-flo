import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Store } from "tauri-plugin-store-api";

import { storeFileName } from "./constants";
import { UserSettings } from "./types";

const store = new Store(storeFileName);

const getInitialAppStoreValue = async (): Promise<UserSettings> => ({
  accounts: (await store.get("accounts")) ?? [],
  profiles: (await store.get("profiles")) ?? [],
});

const [userSettingsStore, setUserSettingsStore] = createStore<UserSettings>(
  await getInitialAppStoreValue(),
);

const initialiseUserSettings = (): void => {
  createEffect(() => {
    void store.set("accounts", userSettingsStore.accounts);
    void store.set("profiles", userSettingsStore.profiles);
  });
};

const eraseStore = async (): Promise<void> => {
  await store.clear();
};

export {
  eraseStore,
  initialiseUserSettings,
  setUserSettingsStore,
  userSettingsStore,
};

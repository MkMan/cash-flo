import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Store } from "tauri-plugin-store-api";

import { storeFileName } from "./constants";
import { UserSettings } from "./types";

const store = new Store(storeFileName);

const getInitialAppStoreValue = async (): Promise<UserSettings> => ({
  profiles: (await store.get("profiles")) ?? [],
});

const [userSettingsStore, setUserSettingsStore] = createStore<UserSettings>(
  await getInitialAppStoreValue(),
);

const initialiseUserSettings = (): void => {
  createEffect(() => {
    store.set("profiles", userSettingsStore.profiles).then(
      () => {},
      () => {},
    );
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

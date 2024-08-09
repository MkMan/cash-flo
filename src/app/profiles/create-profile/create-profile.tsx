import { confirm } from "@tauri-apps/api/dialog";
import { Component, createSignal, For } from "solid-js";

import {
  eraseStore,
  setUserSettingsStore,
  userSettingsStore,
} from "../../../state";

const fieldName = "profileName";

const [profileName, setProfileName] = createSignal<string>("");

const CreateProfile: Component = () => (
  <div>
    <ul>
      <For each={userSettingsStore.profiles}>
        {(profile) => (
          <li>
            {profile.name}{" "}
            <button
              onClick={() => {
                confirm(
                  `Are you sure you wish to delete profile ${profile.name}?`,
                  { title: "Confirm profile deletion", type: "warning" },
                ).then((shouldDelete) => {
                  if (shouldDelete) {
                    const newProfiles = userSettingsStore.profiles.filter(
                      ({ id }) => id !== profile.id,
                    );

                    setUserSettingsStore("profiles", newProfiles);
                  }
                }, console.error);
              }}
            >
              Delete
            </button>
          </li>
        )}
      </For>
    </ul>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const value = profileName();

        if (!value) return;

        setUserSettingsStore("profiles", (currentProfiles) => [
          ...currentProfiles,
          { id: globalThis.crypto.randomUUID(), name: value },
        ]);
        setProfileName("");
      }}
    >
      <label for={fieldName}>Profile name</label>
      <input
        id={fieldName}
        name={fieldName}
        onChange={({ target }) => {
          setProfileName(target.value);
        }}
        type="text"
        value={profileName()}
      />
      <button type="submit">Create</button>
    </form>
    <button
      onClick={() => {
        void eraseStore();
      }}
    >
      Nuke it
    </button>
  </div>
);

export { CreateProfile };

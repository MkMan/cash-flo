import { Component, createSignal, For, Show } from "solid-js";

import { userSettingsStore } from "../../../state";
import { createProfile, onProfileDeleteClick } from "./utils";

const fieldName = "profileName";

const [profileName, setProfileName] = createSignal<string>("");

const ProfilesPage: Component = () => (
  <section>
    <h2>Profiles</h2>
    <p>
      A Profile is a collection of Accounts. For example, you can create a{" "}
      <i>Work Expenses</i> Profile and a separate <i>Personal Expenses</i>{" "}
      Profile.
    </p>

    <h3>Your Profiles</h3>
    <Show
      fallback={"You currently don't have any Profiles"}
      when={userSettingsStore.profiles.length > 0}
    >
      <ul>
        <For each={userSettingsStore.profiles}>
          {(profile) => (
            <li>
              {profile.name}{" "}
              <button
                onClick={() => {
                  onProfileDeleteClick(profile);
                }}
              >
                Delete
              </button>
            </li>
          )}
        </For>
      </ul>
    </Show>

    <h3>Create a Profile</h3>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const value = profileName();

        if (!value) return;

        createProfile(value);
        setProfileName(""); // Reset the input
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
  </section>
);

export { ProfilesPage };

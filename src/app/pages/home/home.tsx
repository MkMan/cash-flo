import { userSettingsStore } from "$app-state";
import { Component } from "solid-js";

import { CreateProfile } from "./create-profile/create-profile";
import { CurrentProfiles } from "./current-profiles/current-profiles";
import { createProfile, onProfileDelete } from "./utils";

const HomePage: Component = () => (
  <section>
    <h2>Profiles</h2>
    <p>
      A Profile is a collection of Accounts. For example, you can create a{" "}
      <i>Work Expenses</i> Profile and a separate <i>Personal Expenses</i>{" "}
      Profile.
    </p>
    <CurrentProfiles
      onProfileDelete={onProfileDelete}
      profiles={userSettingsStore.profiles}
    />
    <CreateProfile onCreate={createProfile} />
  </section>
);

export { HomePage };

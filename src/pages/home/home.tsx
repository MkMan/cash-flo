import { Component, createMemo } from "solid-js";

import { CreateProfile } from "./create-profile/create-profile";
import { CurrentProfiles } from "./current-profiles/current-profiles";
import { createProfile, onProfileDelete, profilesResource } from "./utils";

const HomePage: Component = () => {
  const profiles = createMemo(() => profilesResource());

  return (
    <section>
      <h2>Profiles</h2>
      <p>
        A Profile is a collection of Accounts. For example, you can create a{" "}
        <i>Work Expenses</i> Profile and a separate <i>Personal Expenses</i>{" "}
        Profile.
      </p>
      <CurrentProfiles
        onProfileDelete={onProfileDelete}
        profiles={profiles()}
      />
      <CreateProfile onCreate={createProfile} />
    </section>
  );
};

export { HomePage };

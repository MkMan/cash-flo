import { Component, For, Show } from "solid-js";

import { Profile } from "../../../../state";

type CurrentProfilesProps = {
  onProfileDelete: (profile: Profile) => void;
  profiles: Profile[];
};

const CurrentProfiles: Component<CurrentProfilesProps> = (props) => (
  <>
    <h3>Your Profiles</h3>
    <Show
      fallback={"You currently don't have any Profiles"}
      when={props.profiles.length > 0}
    >
      <ul>
        <For each={props.profiles}>
          {(profile) => (
            <li>
              {profile.name}{" "}
              <button
                onClick={() => {
                  props.onProfileDelete(profile);
                }}
              >
                Delete
              </button>
            </li>
          )}
        </For>
      </ul>
    </Show>
  </>
);

export { CurrentProfiles };

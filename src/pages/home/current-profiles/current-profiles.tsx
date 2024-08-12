import { A } from "@solidjs/router";
import { Profile } from "$app-state";
import { Component, For, Show } from "solid-js";

import { getHrefTo } from "../../../utils";

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
              </button>{" "}
              <A href={getHrefTo("profile", profile.id)}>Visit</A>
            </li>
          )}
        </For>
      </ul>
    </Show>
  </>
);

export { CurrentProfiles };

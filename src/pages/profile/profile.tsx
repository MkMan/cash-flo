import { useParams } from "@solidjs/router";
import { userSettingsStore } from "$app-state";
import { Component } from "solid-js";

const ProfilePage: Component = () => {
  const { profileId } = useParams();

  const profile = userSettingsStore.profiles.find(({ id }) => id === profileId);

  return (
    <>
      {!!profile ? (
        <h2>{profile.name}</h2>
      ) : (
        <h2>ERROR: could not find profile for id {profileId}</h2>
      )}
    </>
  );
};

export { ProfilePage };

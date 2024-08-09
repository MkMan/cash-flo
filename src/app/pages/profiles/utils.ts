import { confirm } from "@tauri-apps/api/dialog";

import {
  Profile,
  setUserSettingsStore,
  userSettingsStore,
} from "../../../state";

const createProfile = (profileName: string): void => {
  setUserSettingsStore("profiles", (currentProfiles) => [
    ...currentProfiles,
    { id: globalThis.crypto.randomUUID(), name: profileName },
  ]);
};

const confirmProfileDeletion = (profileName: string): Promise<boolean> =>
  confirm(`Are you sure you wish to delete profile ${profileName}?`, {
    title: "Confirm profile deletion",
    type: "warning",
  });

const deleteProfile = (profileId: string): void => {
  const newProfiles = userSettingsStore.profiles.filter(
    ({ id }) => id !== profileId,
  );

  setUserSettingsStore("profiles", newProfiles);
};

const onProfileDeleteClick = ({ id, name }: Profile): void => {
  confirmProfileDeletion(name)
    .then((shouldDelete) => {
      if (shouldDelete) deleteProfile(id);
    })
    .catch((error: unknown) => {
      console.error(`Error deleting profile ${id}:${name}`, error);
    });
};

export { createProfile, onProfileDeleteClick };

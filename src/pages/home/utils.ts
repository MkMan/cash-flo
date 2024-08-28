import type { Profile } from "$app-db";

import { confirm } from "@tauri-apps/api/dialog";
import { db, schema } from "$app-db";
import { eq } from "drizzle-orm";
import { createResource } from "solid-js";

const [profilesResource, { refetch }] = createResource<Profile[]>(
  () =>
    db.query.profile
      .findMany()
      .execute()
      .then((profiles) => profiles)
      .catch((error: unknown) => {
        console.error("Error fetching profiles", error);
        return [];
      }),
  { initialValue: [] },
);

const createProfile = (name: string): void => {
  db.insert(schema.profile)
    .values({ name })
    .then(() => {
      console.log("Profile created successfully");
    })
    .catch(() => {
      console.error("Error adding profile");
    });

  void refetch();
};

const confirmProfileDeletion = (profileName: string): Promise<boolean> =>
  confirm(`Are you sure you wish to delete profile ${profileName}?`, {
    title: "Confirm profile deletion",
    type: "warning",
  });

const removeProfileFromDb = (profileId: number): void => {
  db.delete(schema.profile)
    .where(eq(schema.profile.id, profileId))
    .execute()
    .then(refetch)
    .catch((error: unknown) => {
      console.error(
        `Error deleting profile with id ${profileId.toString()}`,
        error,
      );
    });
};

const onProfileDelete = ({ id, name }: Profile): void => {
  confirmProfileDeletion(name)
    .then((shouldDelete) => {
      if (shouldDelete) removeProfileFromDb(id);
    })
    .catch((error: unknown) => {
      console.error(`Error deleting profile ${id.toString()}:${name}`, error);
    });
};

export { createProfile, onProfileDelete, profilesResource };

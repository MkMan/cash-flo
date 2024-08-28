import { db, schema } from "$app-db";

const addAccount = (name: string, profileId: number): void => {
  db.insert(schema.account)
    .values({ name, profileId })
    .then(() => {
      console.log("Account created successfully");
    })
    .catch(() => {
      console.error("Error adding Account");
    });
};

export { addAccount };

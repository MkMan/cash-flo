import { Component, createEffect } from "solid-js";

import { CreateProfile } from "./app/profiles/create-profile/create-profile";
import { initialiseUserSettings } from "./state";

const App: Component = () => {
  createEffect(() => {
    initialiseUserSettings();
  });

  return (
    <div>
      <h1>Welcome to Tauri!</h1>
      <CreateProfile />
    </div>
  );
};

export { App };

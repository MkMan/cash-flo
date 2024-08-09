/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import { App } from "./App";
import { CreateProfile } from "./app/profiles/create-profile/create-profile";

render(
  () => (
    <Router root={App}>
      <Route component={CreateProfile} path="/" />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);

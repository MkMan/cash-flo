/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import { App } from "./App";
import { HomePage } from "./app/pages";

render(
  () => (
    <Router root={App}>
      <Route component={HomePage} path="/" />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);

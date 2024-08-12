/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import { App } from "./App";
import { HomePage, ProfilePage } from "./pages";
import { routePathsMap } from "./utils";

render(
  () => (
    <Router root={App}>
      <Route component={HomePage} path={routePathsMap.home} />
      <Route component={ProfilePage} path={routePathsMap.profile} />
    </Router>
  ),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- defined in index.html
  document.getElementById("root")!,
);

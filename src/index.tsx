/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { routePathsMap } from "$app-utils";
import { render } from "solid-js/web";

import { App } from "./App";
import { AccountPage, HomePage, ProfilePage } from "./pages";

render(
  () => (
    <Router root={App}>
      <Route component={HomePage} path={routePathsMap.home} />
      <Route component={ProfilePage} path={routePathsMap.profile} />
      <Route component={AccountPage} path={routePathsMap.account} />
    </Router>
  ),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- defined in index.html
  document.getElementById("root")!,
);

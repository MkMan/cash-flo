import { Component, createEffect, JSX } from "solid-js";

import { initialiseUserSettings } from "./state";

const App: Component<{ children?: JSX.Element }> = (props) => {
  createEffect(() => {
    initialiseUserSettings();
  });

  return (
    <>
      <h1>CashFlo</h1>
      {props.children}
    </>
  );
};

export { App };

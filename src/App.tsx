import { Component, JSX } from "solid-js";

const App: Component<{ children?: JSX.Element }> = (props) => {
  return (
    <>
      <h1>CashFlo</h1>
      {props.children}
    </>
  );
};

export { App };

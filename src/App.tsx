import { invoke } from "@tauri-apps/api/tauri";
import { createSignal } from "solid-js";

import "./App.css";
import logo from "./assets/logo.svg";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="container">
      <h1>Welcome to Tauri!</h1>

      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img alt="Vite logo" class="logo vite" src="/vite.svg" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img alt="Tauri logo" class="logo tauri" src="/tauri.svg" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img alt="Solid logo" class="logo solid" src={logo} />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          void greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg()}</p>
    </div>
  );
}

export default App;

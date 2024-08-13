import { Component } from "solid-js";

const fieldName = "accountName";

type AddAccountProps = {
  onAdd: (accountName: string) => void;
};

const AddAccount: Component<AddAccountProps> = (props) => {
  let accountNameInput: HTMLInputElement | undefined;

  return (
    <>
      <h3>Add an Account</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const accountName = accountNameInput?.value;

          if (!accountName) return;

          props.onAdd(accountName);
          accountNameInput.value = "";
        }}
      >
        <label for={fieldName}>Account name</label>
        <input id={fieldName} ref={accountNameInput} type="text" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export { AddAccount };

import { Component } from "solid-js";

const fieldName = "profileName";

type CreateProfileProps = {
  onCreate: (profileName: string) => void;
};

const CreateProfile: Component<CreateProfileProps> = (props) => {
  let profileNameInput: HTMLInputElement | undefined;

  return (
    <>
      <h3>Create a Profile</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const profileName = profileNameInput?.value;

          if (!profileName) return;

          props.onCreate(profileName);
          profileNameInput.value = "";
        }}
      >
        <label for={fieldName}>Profile name</label>
        <input id={fieldName} ref={profileNameInput} type="text" />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export { CreateProfile };

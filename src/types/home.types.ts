export type AuthProps = {
  type: "login" | "register";
  setFormState: (state: "login" | "register") => void;
};

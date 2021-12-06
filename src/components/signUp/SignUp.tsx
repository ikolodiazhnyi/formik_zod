import React, { Dispatch, SetStateAction, useState } from "react";
import "./SignUp.css";
import { validate } from "../Validator";
import TextField from "../TextField/TextField";

export const SignUp:React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [isDisableConfirm, setIsDisableConfirm] = useState(true);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    setErrorState:
      | React.Dispatch<React.SetStateAction<boolean>>
      | React.Dispatch<React.SetStateAction<string>>
  ) => {
    /*
    to do
    make switch
    */

    const targetName = e.target.name;
    const targetValue = e.target.value;
    setState(targetValue);
    if (targetName === "confirm") {
      const checkPasswords = validate
        .pick({ password: true, confirm: true })
        .refine((data) => data.password === data.confirm, {
          message: "Passwords don't match",
          path: ["confirm"],
        });
      if (
        !checkPasswords.safeParse({ password: password, confirm: targetValue })
          .success
      ) {
        setConfirmError(
          (
            checkPasswords.safeParse({
              password: password,
              confirm: targetValue,
            }) as any
          ).error.issues.pop().message
        );
      } else {
        setConfirmError(false as any);
      }
    } else if (
      !(validate.shape as any)[targetName].safeParse(targetValue).success
    ) {
      setErrorState(
        (validate.shape as any)[targetName]
          .safeParse(targetValue)
          .error.issues.pop().message
      );
    } else {
      setErrorState(false as any);
    }
  };

  const onResetHandler = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirm('')
  }
  return (
    <div className="form-wrapper">
      <form onReset={onResetHandler}>
        <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
        <TextField
          inputName="name"
          type="text"
          fieldName="Nickname:"
          name={name}
          onChange={(e) => onChange(e, setName, setNameError)}
          error={nameError}
          setState={setName}
          setErrorState={setNameError}
          disabled={false}
        />
        <TextField
          inputName="email"
          type="email"
          fieldName="Email:"
          name={email}
          onChange={(e) => onChange(e, setEmail, setEmailError)}
          error={emailError}
          setState={setEmail}
          setErrorState={setEmailError}
          disabled={false}
        />
        <TextField
          inputName="password"
          type="password"
          fieldName="Password:"
          name={password}
          onChange={(e) => onChange(e, setPassword, setPasswordError)}
          error={passwordError}
          setState={setPassword}
          setErrorState={setPasswordError}
          disabled={false}
        />
        <TextField
          inputName="confirm"
          type="password"
          fieldName="Confirm Password:"
          name={confirm}
          onChange={(e) => onChange(e, setConfirm, setConfirmError)}
          error={confirmError}
          setState={setConfirm}
          setErrorState={setConfirmError}
          disabled={passwordError || !password.length ? true : false}
        />
        <button className="btn btn-dark mt-3" type={"submit"}>
          Register
        </button>
        <button className="btn btn-danger mt-3 ms-3" type={"reset"}>
          Reset
        </button>
      </form>
    </div>
  );
};

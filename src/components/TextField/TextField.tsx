import React, { Dispatch, SetStateAction, useState } from "react";
import "./TextField.css"

type TextFieldProps = {
  inputName: string;
  fieldName: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<string>>,
    setErrorState:
      | Dispatch<SetStateAction<string>>
      | Dispatch<SetStateAction<boolean>>
  ) => void;
  error: boolean | string;
  setState: Dispatch<SetStateAction<string>>;
  setErrorState:
    | Dispatch<SetStateAction<string>>
  | Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  type: string;
};

const TextField = ({
  disabled,
  inputName,
  fieldName,
  name,
  onChange,
  error,
  setState,
  setErrorState,
  type
}: TextFieldProps) => {
  return (
    <label className={ disabled ? "disabled-input" : ''}>
      {fieldName}
      <input
        required={true}
        className={ "form-control shadow-none"}
        disabled={disabled}
        name={inputName}
        autoComplete="off"
        type={type}
        value={name}
        onChange={(e) => onChange(e, setState, setErrorState)}
      />
      {{ error } && (
        <div style={{ color: "darkred", whiteSpace: "pre" }}>{error}</div>
      )}
    </label>
  );
};

export default TextField;

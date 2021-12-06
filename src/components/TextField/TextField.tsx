import React, { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import "./TextField.css";

type TextFieldProps = {
  inputName: string;
  fieldName: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  error: boolean | string;
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
  type,
}: TextFieldProps) => {
  return (
    <label className={disabled ? "disabled-input" : ""}>
      {fieldName}
      <input
        required={true}
        className={"form-control shadow-none"}
        disabled={disabled}
        name={inputName}
        autoComplete="off"
        type={type}
        value={name}
        onChange={onChange}
      />
      {{ error } && (
        <div style={{ color: "darkred", whiteSpace: "pre" }}>{error}</div>
      )}
    </label>
  );
};

export default TextField;

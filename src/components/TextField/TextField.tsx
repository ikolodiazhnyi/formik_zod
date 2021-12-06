import { ChangeEventHandler } from "react";
import "./TextField.css";

type TextFieldProps = {
  inputName: string;
  fieldName: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  error: boolean | string;
  disabled: boolean;
  type: string;
};

const TextField = ({
  disabled,
  inputName,
  fieldName,
  value,
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
        value={value}
        onChange={onChange}
      />
      {{ error } && (
        <div style={{ color: "darkred", whiteSpace: "pre" }}>{error}</div>
      )}
    </label>
  );
};

export default TextField;

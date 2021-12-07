import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { validate } from "../Validator";
import TextField from "../TextField/TextField";

export const SignUp: React.FC = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    confirm: "",
    password: "",
    select: [] as string[],
    checkboxes: [] as string[],
    nameError: "",
    emailError: "",
    selectError: "",
    confirmError: "",
    passwordError: "",
    checkboxesError: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (targetName === "confirm") {
      const checkPasswords = validate
        .pick({ password: true, confirm: true })
        .refine((data) => data.password === data.confirm, {
          message: "Passwords don't match",
          path: ["confirm"],
        });
      if (
        !checkPasswords.safeParse({
          password: values.password,
          confirm: targetValue,
        }).success
      ) {
        setValues({
          ...values,
          [targetName]: targetValue,
          confirmError: (
            checkPasswords.safeParse({
              password: values.password,
              confirm: targetValue,
            }) as any
          ).error.issues
            .map((item: any) => item.message)
            .join(", "),
        });
      } else {
        setValues({
          ...values,
          [targetName]: targetValue,
          confirmError: "",
        });
      }
    } else if (
      !(validate.shape as any)[targetName].safeParse(targetValue).success
    ) {
      setValues({
        ...values,
        [targetName]: targetValue,
        [`${targetName}Error`]: (validate.shape as any)[targetName]
          .safeParse(targetValue)
          .error.issues.map((item: any) => item.message)
          .join(", "),
      });
    } else {
      setValues({
        ...values,
        [targetName]: targetValue,
        [`${targetName}Error`]: false,
      });
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const targetName: string = e.target.name;
    if ((values as any)[targetName] === "") {
      setValues({
        ...values,
        [`${targetName}Error`]: "Required",
      });
    }
  };

  const onResetHandler = () => {
    setValues({
      ...values,
      name: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked = e.target.checked;
    let value = e.target.value;
    if (checked) {
      setValues({
        ...values,
        checkboxes: [...values.checkboxes, value],
      });
    } else if (!e.target.checked) {
      const index = values.checkboxes.indexOf(e.target.value);
      const localCheckboxes = values.checkboxes;
      localCheckboxes.splice(index, 1);
      setValues({
        ...values,
        checkboxes: [...localCheckboxes],
      });
    }
  };

  useEffect(() => {
    if (!values.checkboxes.length) {
      setValues({
        ...values,
        checkboxesError: "Minimum 1 checkbox must be marked",
      });
    } else if (values.checkboxes.length) {
      setValues({
        ...values,
        checkboxesError: "",
      });
    }
  }, [values.checkboxes]);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setValues({
      ...values,
      select: selected,
    });
  };
  useEffect(() => {
    if (values.select.length < 2) {
      setValues({
        ...values,
        selectError: "Minimum 2 options must be marked",
      });
    } else if (values.select.length) {
      setValues({
        ...values,
        selectError: "",
      });
    }
  }, [values.select]);
  return (
    <div className="form-wrapper">
      <form onReset={onResetHandler}>
        <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
        <TextField
          inputName="name"
          type="text"
          fieldName="Nickname:"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          error={values.nameError}
          disabled={false}
        />
        <TextField
          inputName="email"
          type="email"
          fieldName="Email:"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          error={values.emailError}
          disabled={false}
        />
        <TextField
          inputName="password"
          type="password"
          fieldName="Password:"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          error={values.passwordError}
          disabled={false}
        />
        <TextField
          inputName="confirm"
          type="password"
          fieldName="Confirm Password:"
          value={values.confirm}
          onChange={onChange}
          onBlur={onBlur}
          error={values.confirmError}
          disabled={
            values.passwordError || !values.password.length ? true : false
          }
        />
        <h4>How are you doing?</h4>
        <div>
          <label htmlFor="first">Sick</label>
          <input
            type="checkbox"
            name="first"
            onChange={onCheckboxChange}
            value="sick"
          />
          <label htmlFor="second">Fine</label>
          <input
            type="checkbox"
            name="second"
            onChange={onCheckboxChange}
            value="fine"
          />
          <label htmlFor="third">Awesome</label>
          <input
            type="checkbox"
            name="third"
            onChange={onCheckboxChange}
            value="awesome"
          />
          {values.checkboxesError && (
            <div style={{ color: "darkred", whiteSpace: "pre" }}>
              {values.checkboxesError}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="color">Choose colors:</label>
          <select name="color" multiple={true} onChange={onSelectChange}>
            <option value="white">White</option>
            <option value="dark">Dark</option>
            <option value="red">Red</option>
          </select>
          {values.selectError && (
            <div style={{ color: "darkred", whiteSpace: "pre" }}>
              {values.selectError}
            </div>
          )}
        </div>

        <button
          disabled={
            values.checkboxesError ||
            values.selectError ||
            !values.checkboxes.length
              ? true
              : false
          }
          className={
            values.checkboxesError || !values.checkboxes.length
              ? "btn btn-dark mt-3 disabled-input"
              : "btn btn-dark mt-3"
          }
          type={"submit"}
        >
          Register
        </button>
        <button className="btn btn-danger mt-3 ms-3" type={"reset"}>
          Reset
        </button>
      </form>
    </div>
  );
};

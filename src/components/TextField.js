import React from "react";
import { useField, ErrorMessage } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <input className="form-control shadow-none" autoComplete="off" {...field} {...props} />
      <p><ErrorMessage name={field.name}/></p>
    </div>
  );
};

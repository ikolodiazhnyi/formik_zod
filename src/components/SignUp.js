import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter"

export const SignUp = () => {
  const validate = z
    .object({
      firstName: z.string().max(10, "Max length is 10 characters long"),
      lastName: z.string().max(20, "Max length is 20 characters long"),
      email: z.string().email("Email is invalid"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    });
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }} 
      validationSchema={toFormikValidationSchema(validate)}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
          {console.log(formik.values)}
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button className="btn btn-dark mt-3" type="sumbit">
              Register
            </button>
            <button className="btn btn-danger mt-3 ms-3" type="reset">
              Reset
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

import * as z from "zod";

export const validate = z.object({
  name: z.string().max(10, "Max length is 10 characters long").nonempty(),
  email: z.string().email("Email is invalid").nonempty(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Required"),
  confirm: z.string().nonempty(),
  checkboxes: z.object({
    first: z.boolean(),
    second: z.boolean(),
    third: z.boolean(),
  }),
});

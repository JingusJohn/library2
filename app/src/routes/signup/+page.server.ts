import { client } from "$lib/trpc";
import { fail, type Actions } from "@sveltejs/kit";
import { z, ZodError } from "zod";

const signupSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be valid" }).min(1).trim(),
  password: z.string({ required_error: "Password is required" }).trim().min(1, { message: "Password cannot be empty" }),
  confirmPassword: z.string({ required_error: "Must confirm password" }).trim().min(1, { message: "Password cannot be empty" })
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      path: ['confirmPassword'],
      code: "custom",
      message: "Your passwords do not match"
    });
  }
});

export const actions: Actions = {
  signup: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      signupSchema.parse(body);
    } catch(err) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors } = err.flatten();
        console.log(errors);
        const { password, confirmPassword, ...rest } = body;
        // return inputs ignoring password
        return {
          data: rest,
          errors
        };
      } else {
        return fail(500, {
          message: "Something went wrong. Try again later or contact support."
        })
      }
    }

    // inputs are valid, so create the account
    const parsedBody = signupSchema.parse(body);
    const { message, error: err } = await client.auth.signup.mutate(parsedBody);
    console.log("message: ", message);
    if (err) {
      // handle errors
      console.log(err)
      let { password, confirmPassword, ...rest } = parsedBody
      return {
        data: rest,
        accountError: err.message
      }
    }

  }
};

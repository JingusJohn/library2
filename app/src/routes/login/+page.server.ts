import { client } from "$lib/trpc";
import { fail, type Actions } from "@sveltejs/kit";
import { z, ZodError } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be valid" }).min(1).trim(),
  password: z.string({ required_error: "Password is required" }).trim().min(8, { message: "Password must contain at least 8 characters" }),
  rememberMe: z.boolean().default(false)
});

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    console.log(request.headers.get("user-agent"));

    try {
      loginSchema.parse(body);
    } catch(err) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors } = err.flatten();
        console.log(errors);
        const { password, ...rest } = body;
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
    const parsedBody = loginSchema.parse(body);
    const session = await client.auth.login.mutate(parsedBody);
    console.log("message: ", session);
    if (session.message !== "SUCCESS") {
      // handle errors
      console.log(session.message)
      let { password, ...rest } = parsedBody
      let accountErr: string;
      switch (session.message) {
        case "INVALID": {
          accountErr = "Invalid credentials"
          break;
        }
        case "UNVERIFIED": {
          accountErr = "Email is not verified. Check email for verification"
          break;
        }
        case "INTERNAL": {
          accountErr = "Unknown internal server error occured. Please try again or contact support."
        }
      }
      return {
        data: rest,
        accountError: accountErr
      };
    } else {
      // do something with the session
    }
  }
};

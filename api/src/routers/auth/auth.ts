import { t } from "../../trpc";
import  { z } from "zod";

export const authRouter = t.router({
  // need to decide whether or not these passwords are hashed before sent to the api or not
  login: t.procedure.input(z.object({
    email: z.string().email(),
    password: z.string()
  })).mutation(({ input }) => {
    // define some logic for logging in a user
  }),

  signup: t.procedure.input(z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
  })).mutation(({ input }) => {
    // define some logic for signing up a user
  }),

  deleteUser: t.procedure.input(z.object({
    username: z.string(),
    password: z.string()
  })).mutation(({ input }) => {
    // define some logic for signing up a user
  }),

})

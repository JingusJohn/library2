import { t } from "../../trpc";
import  { z } from "zod";
import * as argon from "argon2";
import { db } from "../..";

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
  })).mutation(async ({ input }) => {
    // define some logic for signing up a user
    const hash: string = await argon.hash(input.password);
    const newUser = await db.user.create({
      data: {
        email: input.email,
        hash: hash,
      }
    });
    // User will not have a profile until they create one
  }),

  deleteUser: t.procedure.input(z.object({
    username: z.string(),
    password: z.string()
  })).mutation(({ input }) => {
    // define some logic for signing up a user
  }),

  // change password
})

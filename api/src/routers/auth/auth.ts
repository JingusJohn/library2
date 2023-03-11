import { t } from "../../trpc";
import  { z } from "zod";
import * as argon from "argon2";
import { db } from "../..";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { errorMap } from "../../utils/prismaUtils";

export const authRouter = t.router({
  // need to decide whether or not these passwords are hashed before sent to the api or not
  login: t.procedure.input(z.object({
    email: z.string().email(),
    password: z.string()
  })).mutation(({ input }) => {
    // define some logic for logging in a user
  }),

  signup: t.procedure.input(z.object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
  })).output(z.object({
    message: z.string(),
    error: z.object({
      isPrismaError: z.boolean(),
      message: z.string()
    }).optional()
  })).mutation(async ({ input }) => {
    // define some logic for signing up a user
    const hash: string = await argon.hash(input.password);
    try {
      const newUser = await db.user.create({
        data: {
          email: input.email,
          hash: hash,
        }
      });

      return {
        message: "user created"
      }

    } catch (err) {
      // output it to console for inspecting logs
      console.log("ERROR: ", err);

      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return {
            message: "failed",
            error: {
              isPrismaError: true,
              message: "A user with this email already exists."
            }
          }
        } else {
          return {
            message: "failed",
            error: {
              isPrismaError: true,
              message: "Something went wrong. Contact Support."
            }
          }
        }
      } else {
        return {
          message: "failed",
          error: {
            isPrismaError: false,
            message: "Something went wrong. Contact Support"
          }
        };
      }
    }
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

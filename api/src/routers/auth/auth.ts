import { t } from "../../trpc";
import { z } from "zod";
import * as argon from "argon2";
import { db } from "../..";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { errorMap } from "../../utils/prismaUtils";
import { User } from "@prisma/client";
import { generateSessionId, generateSessionExpiry } from "../../utils/authUtils";

export const authRouter = t.router({
  getUsers: t.procedure.query(async (req) => {
    console.log(req);
    return await db.user.findMany();
  }),

  login: t.procedure.input(z.object({
    email: z.string().email(),
    password: z.string(),
    rememberMe: z.boolean().default(false),
    userAgent: z.string().default("unknown"),
  })).output(z.object({
    session: z.object({
      id: z.string(),
      validUntil: z.date(),
    }).optional(),
    message: z.enum(["SUCCESS", "UNVERIFIED", "INVALID", "INTERNAL"])
  })).mutation(async ({ input }) => {
    // define some logic for logging in a user
    try {
      const user = await db.user.findUnique({
        where: {
          email: input.email
        }
      });

      if (user) {
        // if the user is found (email is valid)
        if (await argon.verify(user.hash, input.password)) {
          // if the password is correct
          // create a new auth session
          const session = await db.session.create({
            data: {
              id: generateSessionId(),
              userId: user.id,
              validUntil: generateSessionExpiry(input.rememberMe), // add to utils
              userAgent: input.userAgent
            }
          })
          return {
            session,
            message: "SUCCESS"
          };
        } else {
          return {
            message: "INVALID"
          }
        }
      } else {
        return {
          message: "INVALID"
        };
      }

    } catch (err) {
      return {
        message: "INTERNAL"
      };
    }
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
  })).mutation(async ({ input, ctx }) => {
    console.log(ctx);
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

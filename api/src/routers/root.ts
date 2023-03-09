import { t } from "../trpc";
import { authRouter } from "./auth/auth";

export const appRouter = t.router({
  helloWorld: t.procedure.query(() => {
    return "Hello from tRPC!";
  }),
  auth: authRouter
});


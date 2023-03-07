import { t } from "../trpc";

export const appRouter = t.router({
  helloWorld: t.procedure.query(() => {
    return "Hello, World";
  }),
});


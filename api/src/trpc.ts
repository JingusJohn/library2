import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createContext = ({
  req,
  res
}: CreateExpressContextOptions) => {
  return {
    req,
    res
  }
};
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();


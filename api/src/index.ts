import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { environmentSchema, Environment } from "./models/utilities";
import { appRouter } from "./routers/root";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();
// load any environment variables from .env

// validate .env configuration using zod
let env: Environment = environmentSchema.parse(process.env);

export const db = new PrismaClient();

const app: Express = express();

app.use(cors({ origin: "localhost:5173" }));
app.use("/trpc", createExpressMiddleware({ router: appRouter }));
// likely will add a second router here for admin only requests
// app.use("/admin", createExpressMiddleware({ router: adminRouter }));

app.listen(env.PORT, () => {
  console.log(`API Server running at port: ${env.PORT}`);
});

export type AppRouter = typeof appRouter;


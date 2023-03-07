import { z } from "zod";

export const environmentSchema = z.object({
  MODE: z.enum(["dev", "prod"], { required_error: "You must provide a valid mode: (dev, prod)"}),
  DATABASE_URL: z.string({ required_error: "You must provide a database URL for Prisma" }),
  //PORT: z.number({ required_error: "You must provide a port" }),
  PORT: z.string({ required_error: "You must provide a port" }).regex(/^\d+$/).transform(Number)
});

export type Environment = z.TypeOf<typeof environmentSchema>;


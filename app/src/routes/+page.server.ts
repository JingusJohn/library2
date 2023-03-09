import { client } from "../lib/trpc";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    message: await client.helloWorld.query(),
  }
}

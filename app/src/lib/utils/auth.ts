import { client } from "$lib/trpc";
import type { RequestEvent } from "../../routes/$types";

// unused currently (WIP)
export const getUserInfo = async (event: RequestEvent) => {
  const sessionId = event.cookies.get("sessionid");
  if (sessionId) {
    return await client.auth.getUserAuth.query(sessionId);
  }
};

import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {

  console.log(event.cookies.get("sessionid"))
  let session = event.cookies.get("sessionid");

  if (event.url.pathname.startsWith("/login")) {
    console.log("This is login")
    // don't let the user access login, if they're already logged in
    if (session) {
      throw redirect(303, "/");
    }
  }

  return resolve(event);
}) satisfies Handle;

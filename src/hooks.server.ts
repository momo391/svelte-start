import type { Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "$lib/server/auth";
import { sequence } from "@sveltejs/kit/hooks";

const authHandler: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

const handle: Handle = sequence(authHandler);

export { handle };

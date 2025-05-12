import { paraglideMiddleware } from "$lib/paraglide/server";
import { auth } from "$lib/server/auth";
import { addMongoLogger, logger } from "$lib/server/logger";
import { connectMongo, uri } from "$lib/server/mongo";
import { tryCatch } from "$lib/try-catch";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";

let isDbReady: boolean = false;
const startServer: Handle = async function ({ event, resolve }) {
  if (!isDbReady) {
    const { error } = await tryCatch(connectMongo());
    if (error) logger.error("MongoDB connection error", error);
    await addMongoLogger(uri);
    logger.info("Server initialized and MongoDB logging active.");
    isDbReady = true;
  }
  return resolve(event);
};

const authHandler: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

const paraglideHandler: Handle = ({ event, resolve }) =>
  paraglideMiddleware(
    event.request,
    ({ request: localizedRequest, locale }) => {
      event.request = localizedRequest;
      return resolve(event, {
        transformPageChunk: ({ html }) => {
          return html.replace("%lang%", locale);
        },
      });
    }
  );

export const handle: Handle = sequence(
  startServer,
  paraglideHandler,
  authHandler
);

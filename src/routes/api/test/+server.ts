import { logger } from "$lib/server/logger";
import type { RequestHandler } from "@sveltejs/kit";

const GET: RequestHandler = async ({ url }) => {
  logger.info("GET /api/test", {
    url: url.pathname,
  });

  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json" },
  });
};

export { GET };

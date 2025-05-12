import winston from "winston";
import "winston-mongodb";
import { dev } from "$app/environment";
import { uri } from "$lib/server/mongo";
import { env } from "$env/dynamic/private";

const logger = winston.createLogger({
  transports: [
    new winston.transports.MongoDB({
      db: uri,
      dbName: env.MONGO_INITDB_DATABASE,
      collection: "logs",
      level: "info",
    }),
  ],
});

if (dev) {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

export { logger };

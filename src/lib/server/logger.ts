import winston from "winston";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

const logger = winston.createLogger({
  transports: [],
});

if (dev) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

async function addMongoLogger(uri: string) {
  const instance = await import("winston-mongodb");
  logger.add(
    new instance.MongoDB({
      db: uri,
      dbName: env.MONGO_INITDB_DATABASE,
      collection: "logs",
      level: "info",
    })
  );
}

export { logger, addMongoLogger };

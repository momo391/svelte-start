import { env } from "$env/dynamic/private";
import { MongoClient, type MongoClientOptions } from "mongodb";
import { logger } from "./logger";

const uri = `mongodb://${env.MONGO_INITDB_ROOT_USERNAME}:${env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${env.MONGO_INITDB_PORT}`;

const client = new MongoClient(uri, {
  monitorCommands: true,
} as MongoClientOptions);

let db: ReturnType<typeof client.db>;

client.on("commandStarted", (event) => {
  logger.info("MongoDB Command Started", event);
});

client.on("commandFailed", (event) => {
  logger.error("MongoDB Command Failed", event);
});

client.on("commandSucceeded", (event) => {
  logger.info("MongoDB Command Succeeded", event);
});

client.on("error", (error) => {
  logger.error("MongoDB connection error", error);
});

client.on("close", () => {
  logger.info("MongoDB connection closed");
});

async function connectMongo() {
  if (!db) {
    await client.connect();
    db = client.db(env.MONGO_INITDB_DATABASE);
  }
  return db;
}

export { connectMongo, uri };

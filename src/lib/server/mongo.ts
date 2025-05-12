import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

const uri = `mongodb://${env.MONGO_INITDB_ROOT_USERNAME}:${env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${env.MONGO_INITDB_PORT}`;

const client = new MongoClient(uri);
let db: ReturnType<typeof client.db>;

export async function connectMongo() {
  if (!db) {
    await client.connect();
    db = client.db(env.MONGO_INITDB_DATABASE);
  }
  return db;
}

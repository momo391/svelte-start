import { env } from "$env/dynamic/private";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectMongo } from "$lib/server/mongo";

const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  database: mongodbAdapter(await connectMongo()),
});

export { auth };

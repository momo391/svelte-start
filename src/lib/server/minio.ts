import { env } from "$env/dynamic/private";
import * as Minio from "minio";

const client = new Minio.Client({
  endPoint: "127.0.0.1",
  port: Number(env.MINIO_PORT),
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
});

export { client };

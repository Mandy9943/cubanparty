import { S3Client } from "@aws-sdk/client-s3";

export function getR2Client() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing Cloudflare R2 environment variables");
  }

  const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export function getR2Bucket() {
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  if (!bucket) throw new Error("Missing CLOUDFLARE_R2_BUCKET env var");
  return bucket;
}

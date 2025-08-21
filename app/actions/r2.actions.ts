"use server";

import { createSessionClient } from "@/lib/server/appwrite";
import { getR2Bucket, getR2Client } from "@/lib/server/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export async function createSignedUploadUrl(params: {
  prefix?: string;
  contentType: string;
  extension?: string;
}) {
  // Ensure the caller is an authenticated user (session cookie present)
  await createSessionClient();

  const client = getR2Client();
  const bucket = getR2Bucket();
  const prefix = params.prefix || "files";
  const ext = (params.extension || "").replace(/[^a-zA-Z0-9.]/g, "");
  const key = `${prefix}/${randomUUID()}${ext ? `.${ext}` : ""}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: params.contentType,
  });

  const url = await getSignedUrl(client, command, {
    expiresIn: 60 * 60 * 24 * 7,
  }); // 7 days
  // Build a public object URL so the client can display it without any API endpoint
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID!;
  const configuredBase = (
    process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL || ""
  ).trim();
  const publicUrl = configuredBase
    ? // If a custom domain is configured for the bucket (e.g., https://storage.cubanparty.uy), it points to the bucket root
      `${configuredBase.replace(/\/$/, "")}/${key}`
    : // Otherwise use the account endpoint with path-style bucket
      `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${key}`;
  return { url, key, publicUrl };
}

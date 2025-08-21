export const runtime = "edge";
export const dynamic = "force-dynamic";

async function sha256Hex(data: ArrayBuffer | string) {
  const enc =
    typeof data === "string"
      ? new TextEncoder().encode(data)
      : new Uint8Array(data);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toArrayBuffer(input: ArrayBuffer | Uint8Array): ArrayBuffer {
  if (input instanceof Uint8Array) {
    const ab = new ArrayBuffer(input.byteLength);
    new Uint8Array(ab).set(input);
    return ab;
  }
  // ensure a copy (detached), typed as ArrayBuffer
  const src = input as ArrayBuffer;
  return src.slice(0);
}

async function hmac(key: ArrayBuffer | Uint8Array, data: string) {
  const raw = toArrayBuffer(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    raw,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new TextEncoder().encode(data)
  );
  return new Uint8Array(sig);
}

async function getSignatureKey(
  secret: string,
  date: string,
  region: string,
  service: string
) {
  const kDate = await hmac(new TextEncoder().encode("AWS4" + secret), date);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, "aws4_request");
  return kSigning;
}

export async function GET(req: Request, { params }: any) {
  try {
    const key = (params.key as string[]).join("/");
    const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID!;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!;
    const bucket = process.env.CLOUDFLARE_R2_BUCKET!;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
      return new Response("Missing R2 configuration", { status: 500 });
    }

    const region = "auto";
    const host = `${accountId}.r2.cloudflarestorage.com`;
    const path = `/${bucket}/${key}`;
    const url = `https://${host}${path}`;

    const now = new Date();
    const amzDate =
      now.toISOString().replace(/[-:]/g, "").replace(/\..+/, "") + "Z"; // YYYYMMDDTHHMMSSZ
    const dateStamp = amzDate.slice(0, 8); // YYYYMMDD

    const payloadHash = "UNSIGNED-PAYLOAD"; // allowed for GET
    const canonicalHeaders =
      `host:${host}\n` +
      `x-amz-content-sha256:${payloadHash}\n` +
      `x-amz-date:${amzDate}\n`;
    const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
    const canonicalRequest = [
      "GET",
      path,
      "",
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join("\n");

    const algorithm = "AWS4-HMAC-SHA256";
    const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      await sha256Hex(canonicalRequest),
    ].join("\n");

    const signingKey = await getSignatureKey(
      secretAccessKey,
      dateStamp,
      region,
      "s3"
    );
    const signatureBytes = await hmac(signingKey, stringToSign);
    const signature = [...signatureBytes]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const authorization = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const r = await fetch(url, {
      method: "GET",
      headers: {
        host,
        "x-amz-date": amzDate,
        "x-amz-content-sha256": payloadHash,
        authorization,
      },
    });

    if (!r.ok) return new Response("Not found", { status: 404 });

    const headers = new Headers();
    const ct = r.headers.get("content-type");
    if (ct) headers.set("content-type", ct);
    headers.set("cache-control", "public, max-age=31536000, immutable");

    return new Response(r.body, { status: 200, headers });
  } catch (err) {
    console.error("R2 fetch error", err);
    return new Response("Not found", { status: 404 });
  }
}

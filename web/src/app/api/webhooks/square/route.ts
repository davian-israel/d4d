import { WebhooksHelper } from "square";
import { prisma } from "@/lib/prisma";
import { logStructured } from "@/lib/logger";

export async function POST(req: Request) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_URL;
  const body = await req.text();
  const sig = req.headers.get("x-square-hmacsha256-signature") ?? "";

  if (!signatureKey || !notificationUrl) {
    return new Response("Webhook not configured", { status: 501 });
  }

  const valid = await WebhooksHelper.verifySignature({
    requestBody: body,
    signatureHeader: sig,
    signatureKey,
    notificationUrl,
  });

  if (!valid) {
    logStructured("warn", "square.webhook.invalid_signature", {});
    return new Response("Invalid signature", { status: 401 });
  }

  let parsed: { id?: string; type?: string } & Record<string, unknown>;
  try {
    parsed = JSON.parse(body) as { id?: string; type?: string } & Record<string, unknown>;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const externalId = parsed.id ?? crypto.randomUUID();

  try {
    await prisma.webhookEvent.create({
      data: {
        externalId,
        source: "square",
        eventType: parsed.type ?? "unknown",
        payload: parsed as object,
      },
    });
  } catch {
    // duplicate externalId — idempotent success
  }

  logStructured("info", "square.webhook.received", { type: parsed.type });
  return new Response(null, { status: 200 });
}

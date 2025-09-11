import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        throw new Error("Please add webhook secret in env")
    }

    const headerPayload = headers();
    headerPayload.get("svix-id")
}

// "svix-id": "msg_p5jXN8AQM9LWM0D4loKWxJek",
//   "svix-timestamp": "1614265330",
//   "svix-signature": "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",

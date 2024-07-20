import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  await client.user.create({
    data: {
      email: "asd",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};

"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  amount: number,
  provider: string,
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!userId) {
    return { message: "user not logged in" };
  }
  await prisma.onRampTransaction.create({
    data: {
      amount,
      provider,
      userId: parseInt(userId),
      status: "Processing",
      token: Math.random().toString(),
      startTime: new Date(),
    },
  });
  return { message: "on ramp transaction added" };
}

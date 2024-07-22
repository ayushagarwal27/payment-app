import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/bankWebhook", async (req, res) => {
  const { token, amount, user_identifier } = req.body;
  const paymentInfo = { token, amount, userId: user_identifier };
  await db.balance.update({
    where: { userId: paymentInfo.userId },
    data: { amount: { increment: amount } },
  });
  await db.onRampTransaction.update({
    where: { token },
    data: { status: "Success" },
  });
  res.json({ msg: "captured" });
});

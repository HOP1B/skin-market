import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "userId is not present!" });
  }
  const userWallet = await prisma.wallet.findFirst({
    where: {
      userId: userId as string,
    },
  });
  console.log({ userWallet });
  if (userWallet) return NextResponse.json(userWallet);

  const newWallet = await prisma.wallet.create({
    data: {
      userId: userId as string,
      balance: 1_000,
    },
  });
  return NextResponse.json(newWallet);
};

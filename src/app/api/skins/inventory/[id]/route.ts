import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const userSkin = await prisma.userSkin.findMany({
    where: { userId: id },
    include: {
      skin: true,
    },
  });
  return NextResponse.json(userSkin);
};

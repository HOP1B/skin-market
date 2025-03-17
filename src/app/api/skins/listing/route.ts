import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const skins = await prisma.skinListing.findMany({});
  return NextResponse.json(skins);
};

export const POST = async (req: NextRequest) => {
  const {
    skinId,
    price,
    status,
    userId,
  }: { skinId: string; price: string; status: string; userId: string } =
    await req.json();

  const newSkinList = await prisma.skinListing.create({
    data: {
      skin: {
        connect: {
          id: skinId,
        },
      },
      userId: userId,
      price: Number(price),
      status: status as Status,
    },
    include: {
      skin: true,
    },
  });
  return NextResponse.json(newSkinList);
};

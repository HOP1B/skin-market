import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const skins = await prisma.skinListing.findMany({
    include: {
      skin: true,
    },
  });

  return NextResponse.json(skins);
};

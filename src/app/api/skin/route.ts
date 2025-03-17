import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const skins = await prisma.skin.findMany();

  return NextResponse.json(skins);
};

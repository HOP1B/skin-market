import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { listingId, userId }: { listingId: string; userId: string } =
    await req.json();

  // 1. ogogdson listingId tai zar baigaa esehiig shalgah
  const listing = await prisma.skinListing.findUnique({
    where: { id: listingId },
  });
  // 1.1 tiim zar baihgui bol 404 gesen aldaa butsaaana
  if (!listing) {
    return NextResponse.json({ message: "Zar oldsongui" }, { status: 404 });
  }
  // 1.2 tiim zar baival tsaash urgeljilne

  // 2. ogogdson userId tai hereglegchiin dansnii uldegleliig avah
  const wallet = await prisma.wallet.findFirst({
    where: { userId: userId },
  });
  // 2.1 hereglegchiin dansnii uldegdel hurj baina uu shalgah

  // 2.1.1 uldegdel hurehgui bol 400 aldaa butsaah
  if (!wallet || wallet.balance < listing.price) {
    return NextResponse.json(
      { message: "Үлдэгдэл хүрэлцэхгүй байна" },
      { status: 400 }
    );
  }

  // 3. hereglegchid tuhain skiniig shiljuulne.
  const userSkin = await prisma.userSkin.create({
    data: {
      userId: userId,
      status: listing.status,
      skin: {
        connect: {
          id: listing.skinId,
        },
      },
    },
  });
  // 3.1 zarj baigaa skiniig alga bolgov
  await prisma.skinListing.delete({
    where: { id: listingId },
  });
  // 3.2 dansnaas mongo hasagdah
  const newBalance = wallet.balance - listing.price;

 await prisma.wallet.update({
    where: { id: wallet.id },
    data: {
      balance: newBalance,
    },
  });
 

  // 3.3. skiniig zarj bui hunii dansruu mongo ni oroh
  let sellerWallet = await prisma.wallet.findFirst({
    where: { userId: listing.userId },
  });

  if (!sellerWallet) {
    sellerWallet = await prisma.wallet.create({
      data: {
        userId: listing.userId,
        balance: listing.price,
      },
    });

    return NextResponse.json(wallet, { status: 201 });
  }

  sellerWallet = await prisma.wallet.update({
    where: { id: sellerWallet.id },
    data: {
      balance: {
        increment: listing.price,
      },
    },
  });


  return NextResponse.json(userSkin, { status: 200 });
};

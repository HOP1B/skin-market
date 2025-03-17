import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming JSON body
    const { userId, amount } = await req.json();

    if (!userId || amount === undefined || amount <= 0) {
      return NextResponse.json(
        {
          error:
            "Invalid input. userId and amount are required and amount must be greater than 0.",
        },
        { status: 400 }
      );
    }

    let wallet = await prisma.wallet.findFirst({
      where: { userId },
    });

    // If the user doesn't have a wallet, create one
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId, // Use the provided userId
          balance: amount, // Set the initial balance to the provided amount
        },
      });

      return NextResponse.json(wallet, { status: 201 }); // Wallet created, return wallet data
    }

    // If the user already has a wallet, charge money to it (increment balance)
    wallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // Return the updated wallet
    return NextResponse.json(wallet, { status: 200 });
  } catch (error) {
    console.error("Error processing wallet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

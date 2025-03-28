"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddSkinDialog } from "../components/AddSkinDialog";
import { BalanceDialog } from "../components/BalanceDialog";
import { SignedIn, SignOutButton, useSession } from "@clerk/nextjs";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const { session } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className="h-[60px] bg-[#1d1f20] pr-4 border-b-2 border-[#303030] mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-[60px] h-[60px] flex items-center justify-center border-r-2 border-[#303030]">
            <Link href={"/"}>
              <Image
                src={"/cs2-logo.webp"}
                alt="cs2-logo"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <nav className="flex items-center">
            <div className="h-[60px] px-2 flex items-center justify-center">
              <p
                onClick={() => {
                  router.push("/");
                }}
                className={`uppercase text-sm cursor-pointer flex items-center gap-2 hover:text-[#4fd25c] transition-all ${
                  pathName === "/" ? "text-[#4fd25c]" : "text-white"
                }`}
              >
                <ShoppingCart />
                Market
              </p>
            </div>
            <div className="h-[60px] px-2 flex items-center justify-center">
              <p
                onClick={() => {
                  router.push("/inventory");
                }}
                className={`uppercase text-sm cursor-pointer flex items-center gap-2 hover:text-[#4fd25c] transition-all ${
                  pathName === "/inventory" ? "text-[#4fd25c]" : "text-white"
                }`}
              >
                <Box />
                My inventory
              </p>
            </div>
          </nav>
        </div>
        <div className="flex gap-2">
          <AddSkinDialog />
          <BalanceDialog />

          <Avatar>
            <AvatarImage
              src={session?.user.imageUrl}
              className="rounded"
              width={35}
              height={24}
            />
          </Avatar>

          <SignedIn>
            <SignOutButton>
              <Button>
                <LogOut />
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

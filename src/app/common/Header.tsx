import Image from "next/image";
import Link from "next/link";
import { Box, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BalanceDialog } from "../components/BalanceDialog";
import { AddSkinDialog } from "../components/AddSkinDialog";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="h-[60px] bg-[#1d1f20] pr-4 border-b-2 border-[#303030]">
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
              <button className="uppercase text-[#e5e6e5] text-sm flex items-center gap-2 hover:text-[#e92a61] transition-all">
                <ShoppingCart />
                Market
              </button>
            </div>
            <div className="h-[60px] px-2 flex items-center justify-center">
              <Link
                href={"/inventory"}
                className="uppercase text-[#e5e6e5] text-sm flex items-center gap-2 hover:text-[#e92a61] transition-all"
              >
                <Box />
                My inventory
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex gap-2">
          <AddSkinDialog />
          <BalanceDialog />
          <SignedIn>
            <SignOutButton>
              <Button>
                <LogOut />
              </Button>
            </SignOutButton>
          </SignedIn>
          <Button className="py-1 px-2 bg-[#303030]">
            <Image src={"/profile.png"} alt="profile" width={20} height={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play } from "next/font/google";

const play = Play({
  weight: ["400", "700"],
  fallback: ["Roboto", "Roboto Condensed"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" className={play.className}>
        <body className="h-[calc(60vh)] bg-gray-800">
          <SignedOut>
            <div className="min-h-screen w-full flex justify-center items-center relative">
              <Image
                src={"/BG.jpg"}
                alt="background"
                fill
                className="absolute w-full h-full object-cover"
              />
              <div className="px-20 py-10 relative bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-70 border border-gray-100">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 drop-shadow-lg mb-6">
                  Тавтай морил
                </h1>

                <SignInButton>
                  <Button className="w-[150px] px-10 py-6 text-lg font-semibold text-white transition duration-300 ease-in-out transform bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
                    Нэвтрэх
                  </Button>
                </SignInButton>
              </div>
            </div>
          </SignedOut>
          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}

// __Play_976028", "__Play_Fallback_976028

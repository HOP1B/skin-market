"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

const item = {
  name: "Butterfly Knife | Marble Fade (Factory New)",
  price: 2335,
  referencePrice: 1713.53,
  tradeLock: "6d",
  location: "Mythical SAGA Blockchain",
  pattern: 47,
  float: 0.0144338,
  img: "https://via.placeholder.com/200",
  similarItems: [
    { price: 1799.9, discount: "-4%", float: "0.0652399" },
    { price: 3449.0, discount: "-10%", float: "0.0201962" },
    { price: 3298.89, discount: "-9%", float: "0.0084397" },
  ],
};

const getFloatColor = (value: number) => {
  if (value < 7) return "bg-blue-500";
  if (value < 15) return "bg-purple-500";
  if (value < 38) return "bg-yellow-500";
  if (value < 45) return "bg-orange-500";
  return "bg-red-500";
};

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const colorClass = getFloatColor(progress);

  return <Progress value={progress} className={`w-[60%] ${colorClass}`} />;
}

export default function ItemDetails() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-50 p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
            View Item
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg bg-gray-800 border-gray-700 text-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{item.name}</DialogTitle>
          </DialogHeader>
          <Card className="bg-[#1e2229] border border-gray-600 rounded-lg p-4">
            <Image
              src={"/butterfly-marble-fade.png"}
              width={200}
              height={200}
              alt="Knife"
              className="w-[600px] h-[300px] object-cover rounded-lg"
            />
            <CardContent className="mt-4 space-y-2">
              <p className="text-lg font-bold text-green-500">
                ${item.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-300">
                Reference Price: ${item.referencePrice}
              </p>
              <p className="text-sm text-gray-400">
                Item type: Knife
              </p>
              <p className="text-sm text-gray-400">Location: {item.location}</p>
              <p className="text-sm text-gray-400">Pattern: {item.pattern}</p>
              <p className="text-sm text-gray-400">Float: {item.float}</p>
              <Progress value={60}  className="h-2 bg-gray-600" />
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="ghost">
                <Heart className="w-5 h-5 text-gray-300" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
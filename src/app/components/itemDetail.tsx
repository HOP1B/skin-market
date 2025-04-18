"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

type ItemDetailsProps = {
  image: string;
  price: number;
  name: string;
  onClose: () => void;
  onBuy: () => void;
};

export default function ItemDetails({
  image,
  price,
  name,
  onClose,
  onBuy,
}: ItemDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-800 border-gray-700 text-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{name}</DialogTitle>
        </DialogHeader>
        <Card className="bg-[#1e2229] border border-gray-600 rounded-lg p-4">
          <Image
            src={image}
            width={600}
            height={300}
            alt={name}
            className="w-full h-[300px] object-fill rounded-lg"
          />
          <CardContent className="mt-4 space-y-2">
            <p className="text-lg font-bold text-green-500">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price)}
            </p>
            <Progress className="h-2 bg-gray-600" />
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <Button variant="ghost">
              <Heart className="w-5 h-5 text-gray-300" />
            </Button>
            <Button
              onClick={onBuy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

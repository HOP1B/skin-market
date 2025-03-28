"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const AddSkinDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#303030]">Add Skin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white rounded-lg">
        <DialogHeader>
          <DialogTitle>Add a New Skin</DialogTitle>
          <DialogDescription>
            Add a new skin to your inventory.
          </DialogDescription>
        </DialogHeader>
        {/* Add form elements here */}
      </DialogContent>
    </Dialog>
  );
};

"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const AddSkinDialog = () => {
  const [open, setOpen] = useState(false);
  const [skinName, setSkinName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle adding skin logic here
    console.log(`Adding skin: ${skinName}`);
    setOpen(false);
    setSkinName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#303030] border-none hover:bg-[#404040] text-white"
        >
          Add Skin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-[#1d1f20] border-[#303030] text-white rounded-lg p-6">
        <DialogHeader className="pb-4">
          <DialogTitle>Add a New Skin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Skin Name"
            className="bg-[#303030] border-[#404040] text-white placeholder:text-gray-500"
            value={skinName}
            onChange={(e) => setSkinName(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-[#4fd25c] hover:bg-[#3fb24a] text-black"
          >
            Add Skin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

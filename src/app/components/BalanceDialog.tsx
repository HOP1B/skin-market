"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus,  QrCode} from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";
import { useSession } from "@clerk/nextjs";

export const BalanceDialog = () => {
  const [money, setMoney] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const inputRef = useRef<HTMLInputElement>(null);

  // Format the currency display
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format number as currency without the currency symbol
  const formatNumberAsCurrency = (value: string): string => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = numericValue.split(".");
    const formattedNumeric =
      parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join("")}`
        : numericValue;

    if (!formattedNumeric) return "";

    // Parse the numeric value
    const numberValue = Number.parseFloat(formattedNumeric);
    if (isNaN(numberValue)) return formattedNumeric;

    // Format as currency
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits:
        parts.length > 1 ? (parts[1].length > 2 ? 2 : parts[1].length) : 0,
    }).format(numberValue);

    return formatted;
  };

  // Handle input change with currency formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value
    const value = e.target.value;

    // Remove currency symbols and commas to get the numeric value
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = numericValue.split(".");
    const formattedNumeric =
      parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join("")}`
        : numericValue;

    // Store the raw numeric value
    setInputValue(formattedNumeric);

    // Format and display as currency
    if (formattedNumeric) {
      const formatted = formatNumberAsCurrency(formattedNumeric);
      e.target.value = formatted;
    } else {
      e.target.value = "";
    }
  };

  const handleSubmit = () => {
    const amount = Number.parseFloat(inputValue);
    if (!isNaN(amount) && amount > 0) {
      setMoney(amount);
      setShowQRCode(true);
    } else {
      console.error("Invalid amount");
    }
  };

  const handleBack = () => {
    setShowQRCode(false);
  };

  const handleBankLogoClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/wallet/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.session?.user.id || "anonymous",
          amount: money,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMoney(data.balance);
      } else {
        console.error("Failed to charge wallet");
      }
    } catch (error) {
      console.error("Error charging wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="text-[#8dd294] justify-end" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-gray-800 border-gray-700 text-white rounded-lg">
        <DialogHeader className="relative flex items-center justify-center">
          {showQRCode && (
            <ArrowLeft
              onClick={handleBack}
              className="text-white cursor-pointer absolute left-4 top-4"
            />
          )}
          <DialogTitle className="sr-only">Your Balance Dialog</DialogTitle>
          <h2 className="text-xl text-center flex-1">
            Your Balance: {formatCurrency(money)}
          </h2>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          {!showQRCode ? (
            <>
              <Input
                ref={inputRef}
                defaultValue=""
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="mb-4 placeholder:text-gray-500"
              />

              <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              {/* QR Code */}
              <div className="my-4 justify-center">
                <div className="w-64 h-64 flex items-center justify-center">
                  <QrCode width={256} height={256} />
                </div>
              </div>

              {/* Bank Logos */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <Image
                  alt="KhanBank"
                  src={"/khan-bank-logo.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="TDB"
                  src={"/tdb-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="DiGi-pay"
                  src={"/digi-pay.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="golomt-bank"
                  src={"/golomt-digital.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="state-bank"
                  src={"/state-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="monpay"
                  src={"/monpay.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="xac-bank"
                  src={"/xac-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
                <Image
                  alt="bogd-bank"
                  src={"/bogd-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                />
              </div>
            </>
          )}
        </div>
        {/* Loading Screen */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
            <Skeleton className="h-8 w-8 animate-spin bg-white" />
          </div>
        )}
        <DialogFooter className="gap-2 flex flex-wrap"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

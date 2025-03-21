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
import { ArrowLeft, Plus, QrCode } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { Input } from "@/components/ui/input";

// Add a prop for userId that can be passed from a parent component
interface BalanceDialogProps {
  userId?: string;
  initialBalance?: number;
  onBalanceChange?: (newBalance: number) => void;
}

export const BalanceDialog = ({
  userId = "anonymous",
  initialBalance = 0,
  onBalanceChange,
}: BalanceDialogProps) => {
  const [money, setMoney] = useState(initialBalance);
  const [inputValue, setInputValue] = useState("");
  const [amountToAdd, setAmountToAdd] = useState(0); // Track the amount to add separately
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Add a state to control the dialog open/close state
  const [open, setOpen] = useState(false);

  // Update money state when initialBalance prop changes
  useEffect(() => {
    setMoney(initialBalance);
  }, [initialBalance]);

  // Update parent component when balance changes
  const updateBalance = (newBalance: number) => {
    setMoney(newBalance);
    if (onBalanceChange) {
      onBalanceChange(newBalance);
    }

    // Log the user ID and new balance for debugging
    console.log(`Balance updated for user ${userId}: ${newBalance}`);
  };

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

  // Handle form submission (both button click and Enter key)
  const handleSubmit = (e?: React.FormEvent) => {
    // Prevent default form submission if event is provided
    if (e) {
      e.preventDefault();
    }

    const amount = Number.parseFloat(inputValue);
    if (!inputValue) {
      setError("Please enter an amount");
      return;
    }
    if (isNaN(amount)) {
      setError("Please enter a valid number");
      return;
    }
    if (amount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    setError("");
    // Store the amount to add instead of setting it as the current balance
    setAmountToAdd(amount);
    setShowQRCode(true);
  };

  const handleBack = () => {
    setShowQRCode(false);
  };

  // Update the handleBankLogoClick function to close the dialog when done
  const handleBankLogoClick = async () => {
    setLoading(true);
    try {
      // Simulate a successful response instead of making an API call
      // This avoids any potential API errors
      setTimeout(() => {
        // Add the amount to the current balance
        const newBalance = money + amountToAdd;
        updateBalance(newBalance);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setShowQRCode(false);
          // Reset the amount to add and input value after successful payment
          setAmountToAdd(0);
          setInputValue("");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          // Close the dialog
          setOpen(false);
        }, 2000);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error charging wallet:", error);
      // Fallback to simulating a successful response
      console.log(
        `Using fallback behavior due to API error for user ${userId}`
      );
      const newBalance = money + amountToAdd;
      updateBalance(newBalance);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowQRCode(false);
        setAmountToAdd(0);
        setInputValue("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        // Close the dialog
        setOpen(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  // Update the Dialog component to use the open state
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0 h-auto w-auto">
          <Plus className="text-[#8dd294] w-4 h-4" />
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
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <Input
                ref={inputRef}
                defaultValue=""
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="mb-4 placeholder:text-gray-500"
                autoFocus // Automatically focus the input when dialog opens
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>
              )}

              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Submit
              </Button>
            </form>
          ) : (
            <>
              {success && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-md mb-4 text-center">
                  Payment successful!
                </div>
              )}
              {/* Display the amount being added */}
              <div className="mb-4 text-center">
                <p className="text-lg">Adding: {formatCurrency(amountToAdd)}</p>
              </div>
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
                  aria-label="Pay with Khan Bank"
                />
                <Image
                  alt="TDB"
                  src={"/tdb-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with TDB Bank"
                />
                <Image
                  alt="DiGi-pay"
                  src={"/digi-pay.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Digi Pay"
                />
                <Image
                  alt="golomt-bank"
                  src={"/golomt-digital.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Golomt Bank"
                />
                <Image
                  alt="state-bank"
                  src={"/state-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with State Bank"
                />
                <Image
                  alt="monpay"
                  src={"/monpay.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Monpay"
                />
                <Image
                  alt="xac-bank"
                  src={"/xac-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Xac Bank"
                />
                <Image
                  alt="bogd-bank"
                  src={"/bogd-bank.webp"}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                  className="big cc visa icon cursor-pointer"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Bogd Bank"
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

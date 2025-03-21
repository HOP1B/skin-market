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
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const BalanceDialog = () => {
  const [money, setMoney] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddMoney = () => {
    setMoney(money + 1000);
  };

  const handleSubmit = () => {
    setShowQRCode(true);
  };

  const handleBack = () => {
    setShowQRCode(false);
  };

  const handleBankLogoClick = () => {
    setLoading(true);
    setTimeout(() => {
      setMoney(money + 5000);
      setLoading(false);
    }, 2000);
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
          <h2 className="text-xl text-center flex-1">Your Balance: ${money}</h2>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          {!showQRCode ? (
            <>
              <Button
                onClick={handleAddMoney}
                className="mb-4 bg-green-500 hover:bg-green-600"
              >
                Add $1000 to Balance
              </Button>

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
                <QrCode values={`Your Balance: ₮${money}`} size={256} />
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

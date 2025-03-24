"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Plus, QrCode, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface BalanceDialogProps {
  userId?: string
  initialBalance?: number
  onBalanceChange?: (newBalance: number) => void
}

export const BalanceDialog = ({ userId = "anonymous", initialBalance = 0, onBalanceChange }: BalanceDialogProps) => {
  const [money, setMoney] = useState(initialBalance)
  const [inputValue, setInputValue] = useState("")
  const [amountToAdd, setAmountToAdd] = useState(0)
  const [showQRCode, setShowQRCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)

  // Add CSS for shimmer animation
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Predefined deposit amounts
  const depositAmounts = [10, 25, 50, 100, 250, 500]

  useEffect(() => {
    setMoney(initialBalance)
  }, [initialBalance])

  const updateBalance = (newBalance: number) => {
    setMoney(newBalance)
    if (onBalanceChange) {
      onBalanceChange(newBalance)
    }
    console.log(`Balance updated for user ${userId}: ${newBalance}`)
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^0-9.]/g, "")

    // Ensure only one decimal point
    const parts = numericValue.split(".")
    const formattedNumeric = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : numericValue

    setInputValue(formattedNumeric)
  }

  const handleAmountSelect = (amount: number) => {
    setInputValue(amount.toString())
    if (inputRef.current) {
      inputRef.current.value = amount.toString()
    }
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    const amount = Number.parseFloat(inputValue)
    if (!inputValue) {
      setError("Please enter an amount")
      return
    }
    if (isNaN(amount)) {
      setError("Please enter a valid number")
      return
    }
    if (amount <= 0) {
      setError("Amount must be greater than zero")
      return
    }

    setError("")
    setAmountToAdd(amount)
    setShowQRCode(true)
  }

  const handleBack = () => {
    setShowQRCode(false)
  }

  const handleBankLogoClick = async () => {
    setLoading(true)
    try {
      // Simulate payment processing
      setTimeout(() => {
        const newBalance = money + amountToAdd
        updateBalance(newBalance)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          setShowQRCode(false)
          setAmountToAdd(0)
          setInputValue("")
          if (inputRef.current) {
            inputRef.current.value = ""
          }
          setOpen(false)
        }, 2000)
        setLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error charging wallet:", error)
      // Fallback behavior
      const newBalance = money + amountToAdd
      updateBalance(newBalance)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setShowQRCode(false)
        setAmountToAdd(0)
        setInputValue("")
        if (inputRef.current) {
          inputRef.current.value = ""
        }
        setOpen(false)
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-[#303030] to-[#404040] border-[#505050] hover:border-[#4fd25c] text-white font-medium flex items-center gap-2 transition-all duration-200 hover:shadow-[0_0_10px_rgba(79,210,92,0.2)]"
          >
            <span className="text-[#4fd25c]">$</span>
            {formatCurrency(money).replace("$", "")}
          </Button>
          <Button variant="ghost" size="icon" className="p-0 h-auto w-auto hover:bg-[#303030] rounded-full">
            <Plus className="text-[#4fd25c] w-4 h-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-[#1d1f20] border-[#303030] text-white rounded-lg p-0">
        <DialogHeader className="relative flex items-center justify-center p-4 border-b border-[#303030]">
          {showQRCode && <ArrowLeft onClick={handleBack} className="text-white cursor-pointer absolute left-4 top-4" />}
          <DialogTitle className="text-xl text-center flex-1">Your Balance: {formatCurrency(money)}</DialogTitle>
        </DialogHeader>

        {!showQRCode ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-[#4fd25c]" />
                Add Funds
              </h3>
              <div className="text-sm text-gray-400">CS2 Market</div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {depositAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    onClick={() => handleAmountSelect(amount)}
                    className={`relative overflow-hidden border-[#404040] hover:border-[#4fd25c] transition-all duration-200 ${
                      inputValue === amount.toString()
                        ? "bg-gradient-to-br from-[#4fd25c] to-[#3fb24a] text-black border-[#4fd25c] shadow-[0_0_15px_rgba(79,210,92,0.3)]"
                        : "bg-[#303030] hover:bg-[#404040]"
                    }`}
                  >
                    {inputValue === amount.toString() && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}
                    <span className="font-bold">{formatCurrency(amount)}</span>
                  </Button>
                ))}
              </div>

              <div className="mt-6 relative">
                <label htmlFor="custom-amount" className="text-sm text-gray-300 mb-1 block font-medium">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4fd25c] font-bold">$</span>
                  <Input
                    id="custom-amount"
                    ref={inputRef}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="bg-[#303030] border-[#404040] text-white pl-8 placeholder:text-gray-500 focus:border-[#4fd25c] focus:ring-1 focus:ring-[#4fd25c]"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <Button
                type="submit"
                className="mt-6 bg-gradient-to-r from-[#4fd25c] to-[#3fb24a] hover:from-[#3fb24a] hover:to-[#4fd25c] text-black font-bold py-6 text-lg shadow-[0_4px_20px_rgba(79,210,92,0.3)] transition-all duration-300"
              >
                Continue to Payment
              </Button>
            </form>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center">
            {success && (
              <div className="bg-gradient-to-r from-[#4fd25c] to-[#3fb24a] text-black px-4 py-3 rounded-md mb-4 text-center w-full font-bold shadow-[0_4px_12px_rgba(79,210,92,0.3)]">
                Payment successful!
              </div>
            )}

            <div className="mb-6 text-center">
              <p className="text-xl font-bold">
                Adding: <span className="text-[#4fd25c]">{formatCurrency(amountToAdd)}</span>
              </p>
            </div>

            <div className="my-4 justify-center bg-white p-6 rounded-lg border-4 border-[#4fd25c] shadow-[0_0_30px_rgba(79,210,92,0.2)]">
              <div className="w-64 h-64 flex items-center justify-center">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>

            <p className="text-gray-300 mb-6 text-center">
              Scan with your banking app or select a payment method below
            </p>

            <div className="grid grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <Image
                  alt="KhanBank"
                  src={"/khan-bank-logo.webp"}
                  height={80}
                  width={80}
                  className="rounded-full cursor-pointer hover:ring-4 hover:ring-[#4fd25c] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(79,210,92,0.4)]"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Khan Bank"
                />
                <span className="text-xs text-gray-400 mt-2">Khan Bank</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  alt="TDB"
                  src={"/tdb-bank.webp"}
                  height={80}
                  width={80}
                  className="rounded-full cursor-pointer hover:ring-4 hover:ring-[#4fd25c] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(79,210,92,0.4)]"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with TDB Bank"
                />
                <span className="text-xs text-gray-400 mt-2">TDB Bank</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  alt="DiGi-pay"
                  src={"/digi-pay.webp"}
                  height={80}
                  width={80}
                  className="rounded-full cursor-pointer hover:ring-4 hover:ring-[#4fd25c] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(79,210,92,0.4)]"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Digi Pay"
                />
                <span className="text-xs text-gray-400 mt-2">DiGi Pay</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  alt="golomt-bank"
                  src={"/golomt-digital.webp"}
                  height={80}
                  width={80}
                  className="rounded-full cursor-pointer hover:ring-4 hover:ring-[#4fd25c] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(79,210,92,0.4)]"
                  onClick={handleBankLogoClick}
                  aria-label="Pay with Golomt Bank"
                />
                <span className="text-xs text-gray-400 mt-2">Golomt Bank</span>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full animate-spin bg-[#4fd25c]" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}



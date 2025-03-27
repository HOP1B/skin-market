"use client";

import { useState, useCallback, useEffect } from "react";

interface UseWalletProps {
  userId: string;
  initialBalance?: number;
}

interface WalletData {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export function useWallet({ userId, initialBalance = 0 }: UseWalletProps) {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from API after component has mounted
  useEffect(() => {
    if (typeof window !== "undefined") {
      refreshBalance();
      setIsInitialized(true);
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(isInitialized);

  // Refresh balance from backend API
  const refreshBalance = useCallback(async () => {
    // Skip if we're server-side
    if (typeof window === "undefined") return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/wallet?userId=${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
          // Wallet not found, might need to create one
          console.log("Wallet not found for user", userId);
          // For now, we'll just use initialBalance
          setBalance(initialBalance);
          return;
        }
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }

      const walletData: WalletData = await response.json();
      setBalance(walletData.balance);

      console.log(
        `Refreshed balance for user ${userId}: ${walletData.balance}`
      );
    } catch (err) {
      console.error("Error fetching wallet balance:", err);
      setError("Failed to load balance. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId, initialBalance]);

  // Add funds to wallet
  const addFunds = useCallback(
    async (amount: number) => {
      // Skip if we're server-side
      if (typeof window === "undefined") return false;

      setLoading(true);
      setError("");

      try {
        // Call the API to add funds
        const response = await fetch("/api/wallet/add-funds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, amount }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add funds: ${response.statusText}`);
        }

        const data = await response.json();
        setBalance(data.balance);

        console.log(
          `Added ${amount} to wallet for user ${userId}. New balance: ${data.balance}`
        );
        return true;
      } catch (err) {
        console.error("Error adding funds:", err);
        setError("Failed to add funds. Please try again.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  // Reset balance (for testing)
  const resetBalance = useCallback(async () => {
    // Skip if we're server-side
    if (typeof window === "undefined") return false;

    setLoading(true);

    try {
      // Call the API to reset balance
      const response = await fetch("/api/wallet/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reset balance: ${response.statusText}`);
      }

      const data = await response.json();
      setBalance(data.balance);

      console.log(`Reset balance for user ${userId} to ${data.balance}`);
      return true;
    } catch (err) {
      console.error("Error resetting balance:", err);
      setError("Failed to reset balance.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    balance,
    loading,
    error,
    addFunds,
    refreshBalance,
    resetBalance,
  };
}

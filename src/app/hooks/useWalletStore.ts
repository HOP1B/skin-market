import { create } from "zustand";

type WalletStore = {
  balance: number;
  setBalance: (value: number) => void;
  add: (value: number) => void;
  minus: (value: number) => void;
};

export const useWalletStore = create<WalletStore>((set) => ({
  balance: 0,
  setBalance: (value) => set({ balance: value }),
  add: (value: number) =>
    set({ balance: useWalletStore.getState().balance + value }),
  minus: (value: number) =>
    set({ balance: useWalletStore.getState().balance - value }),
}));

import { WalletData } from "@coinbase/coinbase-sdk";
import { depositCollateral } from "./compound.js";

export const makeInvestment = async (
  walletData: WalletData,
  amount: number
) => {
  const hash = await depositCollateral(walletData, amount);
  console.log("Deposit Hash", hash);
  return hash;
};

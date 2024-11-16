import { createPublicClient, getContract, http, parseAbi } from "viem";
import {
  baseCCIPContractAddress,
  chainsByNetwork,
  COMPOUND_ADDRESSES,
  COMPOUND_COMET_ABI,
  Network,
  USDC_ABI,
  USDC_ADDRESSES,
} from "../constant.js";
import { Wallet, WalletData } from "@coinbase/coinbase-sdk";

const NETWORK = Network.BASE;
const COMPOUND_CONTRACT = COMPOUND_ADDRESSES[NETWORK] as `0x${string}`;
const COLLATERAL_USDC = USDC_ADDRESSES[NETWORK] as `0x${string}`;

const publicClient = createPublicClient({
  chain: chainsByNetwork[NETWORK],
  transport: http(),
});

const cometContract = getContract({
  address: COMPOUND_CONTRACT,
  abi: COMPOUND_COMET_ABI,
  client: publicClient,
});

export async function calculateAPR() {
  // getting the supply and borrow APR
  const secondsPerYear = 60 * 60 * 24 * 365;
  let utilization = await cometContract.read.getUtilization();
  const supplyRate = await cometContract.read.getSupplyRate([utilization]);
  const supplyApr = (+supplyRate!.toString() / 1e18) * secondsPerYear * 100;
  console.log("\tJS - Supply APR", supplyApr, "%");
  const borrowRate = await cometContract.read.getBorrowRate([utilization]);
  const borrowApr = (+borrowRate!.toString() / 1e18) * secondsPerYear * 100;
  console.log("\tJS - Borrow APR", borrowApr, "%");
}

export async function depositCollateral(
  walletData: WalletData,
  amount: number
) {
  const walletClient = await Wallet.import(walletData);

  const usdcAbi = parseAbi([
    "function approve(address spender, uint256 amount) external returns (bool)",
  ]);

  const approveUSDC = await walletClient.invokeContract({
    contractAddress: COLLATERAL_USDC,
    abi: usdcAbi,
    method: "approve",
    args: {
      spender: COMPOUND_CONTRACT,
      amount: amount.toString(),
    },
  });

  await approveUSDC.wait();

  const depositTxn = await walletClient.invokeContract({
    contractAddress: COMPOUND_CONTRACT,
    abi: COMPOUND_COMET_ABI,
    method: "supply",
    args: {
      asset: COLLATERAL_USDC,
      amount: amount.toString(),
    },
  });

  await depositTxn.wait();

  return depositTxn.getTransactionHash();
}

export async function withdrawCollateral(
  walletData: WalletData,
  amount: number
) {
  // withdraw

  const walletClient = await Wallet.import(walletData);

  const withdrawTxn = await walletClient.invokeContract({
    contractAddress: COMPOUND_CONTRACT,
    abi: COMPOUND_COMET_ABI,
    method: "withdraw",
    args: {
      asset: COLLATERAL_USDC,
      amount: amount.toString(),
    },
  });

  await withdrawTxn.wait();

  return withdrawTxn.getTransactionHash();
}

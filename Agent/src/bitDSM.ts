"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from "wagmi";
import {
  bitcoinPODABI,
  BitcoinPodManagerABI,
  BitcoinPodManagerAddress,
  podAddress,
} from "./constant";
import { ethers } from "ethers";

// Fetch Hex from Bech32
async function createBitDSMAddress(address: string) {
  try {
    const response = await fetch(
      "http://167.71.128.202:8080/eigen/bech32_to_hex",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error converting Bech32 to Hex:", error);
    throw error;
  }
}

// Fetch Hex Address from Public Key
async function gethexAddress(pubKey: string) {
  try {
    const response = await fetch(
      "http://167.71.128.202:8080/eigen/get_address",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pubkey: pubKey }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Hex Address:", error);
    throw error;
  }
}

// Create the Pod
export function useCreatePod(operatorAddress: string, btcAddress: string) {
  const { data } = useSimulateContract({
    address: BitcoinPodManagerAddress,
    abi: BitcoinPodManagerABI,
    functionName: "createPod",
    args: [operatorAddress, btcAddress],
  });

  const { data: hash, writeContract } = useWriteContract();

  const result = useWaitForTransactionReceipt({
    hash: hash,
  });

  return result;
}

// Get apps for the delegation
async function getApps() {
  try {
    const response = await fetch(
      "https://bitdsm-app-indexer-production.up.railway.app/apps"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching apps:", error);
  }
}

// Custom hook for deposit verification
export function useDepositVerification(
  podAddress: string,
  btcTxId: string,
  amount: string
) {
  const params = {
    pod: podAddress,
    transactionId: ethers.encodeBytes32String(btcTxId),
    amount: ethers.getBigInt(amount),
  };
  const { data: preparedData, isLoading: isPreparing } = useSimulateContract({
    address: BitcoinPodManagerAddress,
    abi: BitcoinPodManagerABI,
    functionName: "prepareDepositVerification",
    args: [params.pod, params.transactionId, params.amount],
  });

  const { data: hash, writeContract } = useWriteContract();

  const result = useWaitForTransactionReceipt({
    hash: hash,
  });

  return result;
}

// prepare Withdrawal
export function usePrepareWithdrawal(podAddress: string, btcAddress: string) {
  const withdrawAddress = ethers.hexlify(btcAddress);

  const { data } = useSimulateContract({
    address: BitcoinPodManagerAddress,
    abi: BitcoinPodManagerABI,
    functionName: "withdrawBitcoinPSBTRequest",
    args: [podAddress, withdrawAddress],
  });

  const { data: hash, writeContract } = useWriteContract();

  const result = useWaitForTransactionReceipt({
    hash: hash,
  });

  return result;
}

const fetchBalance = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(
      "https://ethereum-holesky.publicnode.com"
    );

    const contract = new ethers.Contract(podAddress, bitcoinPODABI, provider);

    const balance = await contract.getBitcoinBalance();
    const operatorAddress = await contract.getOperator();
    console.log(operatorAddress);
    console.log(balance);

    const formattedBalance = ethers.formatUnits(balance, 0);

    return { balance, operatorAddress };

    // Redirect to the Blockscout explorer with the pod address
    //  `https://eth-holesky.blockscout.com/address/${podAddress}`;
  } catch (err) {
    console.error(err);
  }
};

export { createBitDSMAddress, gethexAddress, getApps, fetchBalance };

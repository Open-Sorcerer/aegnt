import type { WalletData } from "@coinbase/coinbase-sdk";
import { Wallet } from "@coinbase/coinbase-sdk";
import { baseCCIPContractAddress, ccipABI } from "../constant.js";
import { parseAbi, parseUnits } from "viem";

export const bridgeToPolygon = async (
  walletData: WalletData,
  amount: string
) => {
  // Add return type
  const walletClient = await Wallet.import(walletData);

  const defaultAddress = await walletClient.getDefaultAddress();

  const usdcAbi = parseAbi([
    "function approve(address spender, uint256 amount) external returns (bool)",
  ]);

  // First approve USDC
  const approveUSDC = await walletClient.invokeContract({
    contractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    abi: usdcAbi,
    method: "approve",
    args: {
      spender: baseCCIPContractAddress,
      amount: amount.toString(),
    },
  });

  await approveUSDC.wait();

  const bridgeTxn = await walletClient.invokeContract({
    contractAddress: baseCCIPContractAddress,
    abi: ccipABI,
    method: "sendMessagePayLINK",
    args: {
      _destinationChainSelector: "4051577828743386545",
      _receiver: defaultAddress.getId(),
      _text: "hey",
      _token: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
      _amount: amount.toString(),
    },
  });

  await bridgeTxn.wait();

  return bridgeTxn.getTransactionHash();
};

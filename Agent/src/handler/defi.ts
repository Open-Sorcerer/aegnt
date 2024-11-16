import { HandlerContext, SkillResponse } from "@xmtp/message-kit";
import { parseEther } from "viem";
import { Coinbase, Wallet, WalletData } from "@coinbase/coinbase-sdk";
import { Redis } from "@upstash/redis";
import { createTBA, mintNFT } from "../strategies/handleTBA.js";

const coinbase = Coinbase.configureFromJson({
  filePath: "./cdp_api_key-agent.json",
});

console.log("coinbase", coinbase);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

export async function handleDefi(
  context: HandlerContext
): Promise<SkillResponse> {
  const {
    message: {
      sender,
      content: { skill },
    },
  } = context;

  switch (skill) {
    case "create": {
      // Generate new wallet
      const wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseSepolia,
      });

      const exportedWallet = wallet.export();

      redis.set(sender.address, exportedWallet);

      return {
        code: 200,
        message: `✅ New wallet created!\n\nAddress: ${wallet.getId()}\n\nUse /fund to see where to send funds to this wallet.`,
      };
    }

    case "agent": {
      const wallet = await redis.get(sender.address);

      await mintNFT(wallet as WalletData, sender.address);

      await new Promise((resolve) => setTimeout(resolve, 10000));
      const tba = await createTBA(wallet as WalletData, 8, 0);

      return {
        code: 200,
        message: `✅ New AI Agent Created 🎉`,
        // message: `✅ New AI Agent Created 🎉\n\nTBA Address: ${tba?.tbaAddress}\n\nTBA Creation Tx: ${tba?.hash}`,
      };
    }

    case "fund": {
      const wallet = await redis.get(sender.address);
      if (!wallet) {
        return {
          code: 400,
          message: "❌ No wallet found. Please create one first using /create",
        };
      }

      const walletImported = await Wallet.import(wallet as WalletData);

      const defaultAddress = await walletImported.getDefaultAddress();

      return {
        code: 200,
        message: `💰 Send funds to this address:\n\n${defaultAddress.getId()}`,
      };
    }

    case "send": {
      const {
        message: {
          content: { params },
        },
      } = context;

      // Check if amount parameter exists
      if (!params?.amount) {
        return {
          code: 400,
          message:
            "❌ Amount parameter is required. Usage: /send [amount] [token]",
        };
      }

      const amount = params.amount.toString();
      const wallet = await redis.get(sender.address);

      const walletImported = await Wallet.import(wallet as WalletData);

      if (!walletImported) {
        return {
          code: 400,
          message: "❌ No wallet found. Please create one first using /create",
        };
      }

      const tx = await walletImported.createTransfer({
        amount: parseEther(amount),
        destination: sender.address as `0x${string}`,
        assetId: "0x0000000000000000000000000000000000000000",
      });

      return {
        code: 200,
        message: `✅ Transaction sent!\n\nTransaction hash: ${tx}`,
      };
    }

    case "show": {
      const wallet = await redis.get(sender.address);

      const walletImported = await Wallet.import(wallet as WalletData);

      if (!walletImported) {
        return {
          code: 400,
          message: "❌ No wallet found. Please create one first using /create",
        };
      }

      return {
        code: 200,
        message: `💰 Your wallet address is: ${walletImported.getId()}`,
      };
    }
    default:
      return {
        code: 400,
        message: "Invalid command",
      };
  }
}

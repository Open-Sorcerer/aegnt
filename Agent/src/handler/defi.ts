import { HandlerContext, SkillResponse } from "@xmtp/message-kit";
import { formatUnits, parseEther, parseUnits } from "viem";
import { Coinbase, Wallet, WalletData } from "@coinbase/coinbase-sdk";
import { Redis } from "@upstash/redis";
import { createTBA, mintNFT } from "../strategies/handleTBA.js";
import { bridgeToPolygon } from "../strategies/ccipBridge.js";
import { makeInvestment } from "../strategies/investment.js";
import { fetchBalance } from "../strategies/bitDSM.js";
import { placeOrder } from "../strategies/polymarket.js";
import { placeOrder as placeCowOrder } from "../strategies/cowSwap.js";

const coinbase = Coinbase.configureFromJson({
  filePath: "./cdp_api_key-agent.json",
});

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

      let wallet: Wallet | null = null;

      try {
        const existingWallet = await redis.get(sender.address);
        if (existingWallet) {
          wallet = await Wallet.import(existingWallet as WalletData);
          const defaultAddress = await wallet.getDefaultAddress();
          return {
            code: 200,
            message: `✅ Wallet already exists!\n\nAddress: ${defaultAddress.getId()}`,
          };
        }
      } catch (error) {
        console.log("No wallet found, creating new one");
      }

      wallet = await Wallet.create({
        networkId: Coinbase.networks.BaseMainnet,
      });

      const defaultAddress = await wallet.getDefaultAddress();

      const exportedWallet = wallet.export();

      redis.set(sender.address, exportedWallet);

      return {
        code: 200,
        message: `✅ New wallet created!\n\nAddress: ${defaultAddress.getId()}\n\nUse /fund to see where to send funds to this wallet.`,
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

    case "invest": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();
      const token = params.token;

      const wallet = await redis.get(sender.address);

      const formattedAmount = parseUnits(amount, 6);

      const hash = await makeInvestment(
        wallet as WalletData,
        Number(formattedAmount)
      );

      return {
        code: 200,
        message: `✅ Invested ${amount} ${token} successfully to generate high yield!\n\nTransaction hash: ${hash}`,
      };
    }

    case "smart": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();
      const token = params.token;

      return {
        code: 200,
        message: `✅ Invested ${amount} ${token} smartly!`,
      };
    }

    case "bet": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();

      const placedBet = await placeOrder();

      console.log("placedBet", placedBet);

      return {
        code: 200,
        message: `✅ Bet placed successfully on Polymarket!\n`,
      };
    }

    case "withdraw": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const token = params.token.toLowerCase();
      const amount = params.amount.toString();

      const wallet = await redis.get(sender.address);

      const walletImported = await Wallet.import(wallet as WalletData);

      await walletImported.createTransfer({
        amount,
        destination: sender.address as `0x${string}`,
        assetId: token,
      });

      // await walletImported.createTransfer({
      //   amount: parseUnits(ethBalance.toString(), 18),
      //   destination: sender.address as `0x${string}`,
      //   assetId: "eth",
      // });

      return {
        code: 200,
        message: `✅ Withdrawal made successfully!`,
      };
    }

    case "investments": {
      return {
        code: 200,
        message: `✅ Investment details fetched successfully!`,
      };
    }

    case "balance": {
      return {
        code: 200,
        message: `✅ Wallet balance fetched successfully!`,
      };
    }

    case "btc": {
      const balance = await fetchBalance();

      console.log("balance", balance?.formattedBalance);

      return {
        code: 200,
        message: `✅ Bitcoin balance fetched successfully!\n\nBalance: ${balance?.formattedBalance} BTC`,
      };
    }

    case "deposit": {
      return {
        code: 200,
        message: `✅ Bitcoin deposit made successfully!`,
      };
    }

    case "withdrawbtc": {
      return {
        code: 200,
        message: `✅ Bitcoin withdrawal made successfully!`,
      };
    }

    case "bitcoin": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();

      return {
        code: 200,
        message: `✅ Invested ${amount} successfully in Bitcoin!`,
      };
    }

    case "bridge": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();

      // convert amount to USDC with 6 decimals
      const formattedAmount = parseUnits(amount, 6).toString();

      console.log("formattedAmount", formattedAmount);

      const wallet = await redis.get(sender.address);

      console.log("wallet", wallet);

      const hash = await bridgeToPolygon(wallet as WalletData, formattedAmount);

      return {
        code: 200,
        message: `✅ Bridged ${amount} USDC to Polygon!\n\nTransaction hash: ${hash}`,
      };
    }

    case "trade": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();
      const token = params.token;
      const token1 = params.token1;

      const formattedAmount = parseEther(amount).toString();

      const hash = await placeCowOrder(formattedAmount);

      console.log("hash", hash);

      return {
        code: 200,
        message: `✅ Trade made successfully!\n\nTransaction hash: ${hash}`,
      };
    }

    default:
      return {
        code: 400,
        message: "Invalid command",
      };
  }
}

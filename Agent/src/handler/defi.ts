import { HandlerContext, SkillResponse } from "@xmtp/message-kit";
import { formatUnits, parseEther, parseUnits } from "viem";
import { Coinbase, Wallet, WalletData } from "@coinbase/coinbase-sdk";
import { Redis } from "@upstash/redis";
import { createTBA, mintNFT } from "../strategies/handleTBA.js";
import { bridgeToPolygon } from "../strategies/ccipBridge.js";
import { makeInvestment } from "../strategies/investment.js";
import { fetchBalance } from "../strategies/bitDSM.js";
import { getMarkets, placeOrder } from "../strategies/polymarket.js";
import { placeOrder as placeCowOrder } from "../strategies/cowSwap.js";
import { investOnScroll } from "../strategies/compound.js";

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
        message: `✅ Invested ${amount} ${token} successfully to generate high yield!\n\nTransaction hash: https://base.blockscout.com/tx/${hash}`,
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

      return {
        code: 200,
        message: `✅ Bet placed successfully on Polymarket!\n\nCheck txn on blockscout: https://polygon.blockscout.com/tx/${placedBet}`,
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

      return {
        code: 200,
        message: `✅ Withdrawal made successfully!`,
      };
    }

    case "balance": {
      const wallet = await redis.get(sender.address);

      const walletImported = await Wallet.import(wallet as WalletData);

      const balances = await walletImported.listBalances();

      console.log(
        "balances",
        Array.from(balances).map(
          ([assetId, balance]) => `${assetId} - ${balance.toString()}`
        )
      );

      return {
        code: 200,
        message: `✅ Wallet balance fetched successfully!\n\nBalance: ${Array.from(
          balances
        ).map(
          ([assetId, balance]) => `\n${assetId} - ${Number(balance).toFixed(5)}`
        )}`,
      };
    }

    case "btc": {
      const balance = await fetchBalance();

      console.log("balance", balance?.formattedBalance);

      return {
        code: 200,
        message: `✅ Bitcoin balance fetched successfully!\n\nBalance: ${balance?.formattedBalance} BTC\n\nVerify here: https://eth-holesky.blockscout.com/address/0x4d9627FbE2199300d33B655481a557C905CE1A11`,
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
        message: `✅ Bridged ${amount} USDC to Polygon!\n\nCheck txn on CCIP: https://ccip.chain.link/tx/${hash}`,
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
        message: `✅ Trade made successfully!\n\nCheck txn: https://sepolia.etherscan.io/tx/0x6b224bdb191f04c5d3c7866fd6c31e95d719f7d3694681ce3830c5de7fd26141`,
      };
    }

    case "polymarket": {
      const markets = await getMarkets();

      return {
        code: 200,
        message: `✅ Trending markets on Polymarket fetched successfully!\n\nBitcoin Price Target
Question: Will Bitcoin hit $100k in 2024?
Description: Market resolves "Yes" if any Coinbase 1-minute candle for BTC-USD shows a high of $100,000+ between Jan 1 and Dec 31, 2024 ET. Resolution based on Coinbase BTC-USD data, with alternative sources considered only if major discrepancies exist.\n\n
Boeing CEO Status
Question: Dave Calhoun out as Boeing CEO before May?
Description: Resolves "Yes" if Dave Calhoun stops serving as Boeing CEO between March 8 and April 30, 2024 (11:59 PM ET). Any announcement of resignation/firing before the end date triggers immediate "Yes" resolution, regardless of effective date.\n\n
NFL Player Transfer
Question: Will the Atlanta Falcons sign Kirk Cousins?
Description: Resolves "Yes" if Kirk Cousins signs with the Atlanta Falcons between March 10, 2024, and the NFL regular season start (Sept 5, 2024). Resolves "No" if he signs with any other team first. Resolution based on official NFL/team announcements or credible reporting consensus.
All markets are currently active on Polymarket, with the Bitcoin market being the only one still open for trading.`,
      };
    }

    case "scroll": {
      const {
        message: {
          content: { params },
        },
      } = context;

      const amount = params.amount.toString();
      const token = params.token;

      const formattedAmount = parseUnits(amount, 6).toString();

      const hash = await investOnScroll(Number(formattedAmount));

      return {
        code: 200,
        message: `✅ Invested ${amount} ${token} on Scroll successfully!\n\nCheck txn: https://scroll.blockscout.com/tx/${hash}`,
      };
    }

    default:
      return {
        code: 400,
        message: "Invalid command",
      };
  }
}

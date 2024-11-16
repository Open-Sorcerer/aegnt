import { handleDefi } from "./handler/defi.js";
import type { SkillGroup } from "@xmtp/message-kit";

export const skills: SkillGroup[] = [
  {
    name: "DeFi Agent",
    tag: "@defi",
    description: "Manage your DeFi operations",
    skills: [
      {
        skill: "/create",
        handler: handleDefi,
        description: "Create a new EOA wallet",
        examples: ["/create"],
        params: {},
      },
      {
        skill: "/fund",
        handler: handleDefi,
        description: "Show address to fund the newly created EOA",
        examples: ["/fund"],
        params: {},
      },
      {
        skill: "/agent",
        handler: handleDefi,
        description: "Create a new AI Agent",
        examples: ["/agent"],
        params: {},
      },
      {
        skill: "/send [amount] [token]",
        handler: handleDefi,
        description: "Send funds from newly created EOA to user's address",
        examples: ["/send 0.1 ETH"],
        params: {
          amount: {
            type: "number",
          },
          token: {
            type: "string",
          },
        },
      },
      {
        skill: "/invest [amount] [token]",
        handler: handleDefi,
        description: "Make high yield investments",
        examples: ["/invest 1 USDC"],
        params: {
          amount: {
            type: "number",
          },
          token: {
            type: "string",
          },
        },
      },
      {
        skill: "/smart [amount]",
        handler: handleDefi,
        description: "Make smart investments",
        examples: ["/smart 1 USDC"],
        params: {
          amount: {
            type: "number",
          },
          token: {
            type: "string",
          },
        },
      },
      {
        skill: "/bet [amount]",
        handler: handleDefi,
        description: "Place a bet on polymarket",
        examples: ["/bet 0.1"],
        params: {
          amount: {
            type: "number",
          },
        },
      },
      {
        skill: "/withdraw",
        handler: handleDefi,
        description: "Withdraw from wallet",
        examples: ["/withdraw 0.1 USDC"],
        params: {
          amount: {
            type: "number",
          },
          token: {
            type: "string",
          },
        },
      },
      {
        skill: "/investments",
        handler: handleDefi,
        description: "Check investment details",
        examples: ["/investments"],
        params: {},
      },
      {
        skill: "/balance",
        handler: handleDefi,
        description: "Check wallet balance",
        examples: ["/balance"],
        params: {},
      },
      {
        skill: "/deposit",
        handler: handleDefi,
        description: "Make Bitcoin deposits",
        examples: ["/deposit"],
        params: {},
      },
      {
        skill: "/withdrawbtc",
        handler: handleDefi,
        description: "Make Bitcoin withdrawals",
        examples: ["/withdrawbtc"],
        params: {},
      },
      {
        skill: "/bitcoin [amount]",
        handler: handleDefi,
        description: "Invest Bitcoin",
        examples: ["/bitcoin 0.1"],
        params: {
          amount: {
            type: "number",
          },
        },
      },
      {
        skill: "/btc",
        handler: handleDefi,
        description: "Check Bitcoin balance",
        examples: ["/btc"],
        params: {},
      },
      {
        skill: "/bridge [amount]",
        handler: handleDefi,
        description: "Bridge funds to Polygon",
        examples: ["/bridge 100 USDC"],
        params: {
          amount: {
            type: "number",
          },
          token: {
            type: "string",
          },
        },
      },
      {
        skill: "/trade [amount] [token] to [token1]",
        handler: handleDefi,
        description: "Trade tokens",
        examples: ["/trade 0.07 WETH to COW"],
        params: {
          amount: {
            type: "number",
          },
          token: {
            type: "string",
          },
          token1: {
            type: "string",
          },
        },
      },
    ],
  },
];

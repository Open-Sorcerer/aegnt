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
    ],
  },
];

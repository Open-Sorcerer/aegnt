import { retrieveSecret } from "./nillion.js";
import { skills } from "./skills.js";
import { defaultPromptTemplate } from "@xmtp/message-kit";
import dotenv from "dotenv";
dotenv.config();

export async function agent_prompt(senderAddress: string) {
  const strategyPrompt = await retrieveSecret(
    process.env.USER_SEED ?? "",
    process.env.STORE_ID ?? ""
  );

  return defaultPromptTemplate(strategyPrompt, senderAddress, skills, "@defi");
}

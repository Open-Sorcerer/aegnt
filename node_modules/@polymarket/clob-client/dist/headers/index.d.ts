import { JsonRpcSigner } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { ApiKeyCreds, Chain, L1PolyHeader, L2HeaderArgs, L2PolyHeader } from "../types";
export declare const createL1Headers: (signer: Wallet | JsonRpcSigner, chainId: Chain, nonce?: number, timestamp?: number) => Promise<L1PolyHeader>;
export declare const createL2Headers: (signer: Wallet | JsonRpcSigner, creds: ApiKeyCreds, l2HeaderArgs: L2HeaderArgs, timestamp?: number) => Promise<L2PolyHeader>;

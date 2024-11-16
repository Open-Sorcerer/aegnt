import { Wallet } from "@ethersproject/wallet";
import { JsonRpcSigner } from "@ethersproject/providers";
import { SignedOrder, SignatureType } from "@polymarket/order-utils";
import { Chain, CreateOrderOptions, UserMarketOrder, UserOrder } from "../types";
export declare class OrderBuilder {
    readonly signer: Wallet | JsonRpcSigner;
    readonly chainId: Chain;
    readonly signatureType: SignatureType;
    readonly funderAddress?: string;
    constructor(signer: Wallet | JsonRpcSigner, chainId: Chain, signatureType?: SignatureType, funderAddress?: string);
    /**
     * Generate and sign a order
     */
    buildOrder(userOrder: UserOrder, options: CreateOrderOptions): Promise<SignedOrder>;
    /**
     * Generate and sign a market order
     */
    buildMarketOrder(userMarketOrder: UserMarketOrder, options: CreateOrderOptions): Promise<SignedOrder>;
}

import {
  OrderBookApi,
  OrderQuoteRequest,
  OrderSigningUtils,
  SigningScheme,
  SupportedChainId,
} from "@cowprotocol/cow-sdk";
import { ethers } from "ethers";
import { privateKeyToAddress } from "viem/accounts";

async function placeOrder(amount: string) {
  const privateKey = process.env.KEY!;

  const account = privateKeyToAddress(privateKey as `0x${string}`);
  const chainId = 11155111;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/"
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const quoteRequest = {
    sellToken: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
    buyToken: "0x0625afb445c3b6b7b929342a04a22599fd5dbb59",
    from: account,
    receiver: account,
    partiallyFillable: false,
    priceQuality: "optimal",
    validFor: 1800,
    signingScheme: "eip1271",
    onchainOrder: true,
    verificationGasLimit: 0,
    kind: "sell",
    sellAmountBeforeFee: "2000000000000000",
  };
  const orderBookApi = new OrderBookApi({
    chainId: SupportedChainId.SEPOLIA,
  });

  // Get quote
  const { quote } = await orderBookApi.getQuote(
    quoteRequest as OrderQuoteRequest
  );

  console.log("Quote: ", quote);

  quote.feeAmount = "0";

  // Sign order
  const orderSigningResult = await OrderSigningUtils.signOrder(
    { ...quote, receiver: account },
    chainId,
    wallet as any
  );

  console.log("Order signing result: ", orderSigningResult);

  //   // Send order to the order-book
  const orderUid = await orderBookApi.sendOrder({
    ...quote,
    signature: orderSigningResult.signature,
    signingScheme: orderSigningResult.signingScheme as string as SigningScheme,
  });

  console.log("Order UID: ", orderUid);

  //   Get order data
  const order = await orderBookApi.getOrder(orderUid);

  console.log("Order: ", order);

  //   // Get order trades
  const trades = await orderBookApi.getTrades({ orderUid });

  console.log("Results: ", {
    orderUid,
    order,
    trades,
  });
}

async function history() {
  const privateKey = process.env.KEY!;
  const account = privateKeyToAddress(privateKey as `0x${string}`);
  const orderBookApi = new OrderBookApi({
    chainId: SupportedChainId.SEPOLIA,
  });

  const history = await orderBookApi.getOrders({
    owner: account,
  });

  console.log("History: ", history);
}

export { placeOrder, history };

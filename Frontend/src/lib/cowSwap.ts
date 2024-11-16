import {
  OrderBookApi,
  OrderQuoteSideKindSell,
  OrderSigningUtils,
  SigningScheme,
  SupportedChainId,
} from "@cowprotocol/cow-sdk";
import { Web3Provider } from "@ethersproject/providers";

const account = "YOUR_WALLET_ADDRESS";
const chainId = 100; // Gnosis chain

const provider = new Web3Provider(window.ethereum);
const signer = provider.getSigner();

const quoteRequest = {
  sellToken: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1", // WETH gnosis chain
  buyToken: "0x9c58bacc331c9aa871afd802db6379a98e80cedb", // GNO gnosis chain
  from: account,
  receiver: account as string,
  sellAmountBeforeFee: (0.4 * 10 ** 18).toString(), // 0.4 WETH
  kind: OrderQuoteSideKindSell.SELL,
};

const orderBookApi = new OrderBookApi({
  chainId: SupportedChainId.GNOSIS_CHAIN,
});

async function main() {
  // Get quote
  const { quote } = await orderBookApi.getQuote(quoteRequest);

  // Sign order
  const orderSigningResult = await OrderSigningUtils.signOrder(
    { ...quote, receiver: account },
    chainId,
    signer
  );

  // Send order to the order-book
  const orderUid = await orderBookApi.sendOrder({
    ...quote,
    signature: orderSigningResult.signature,
    signingScheme: orderSigningResult.signingScheme as string as SigningScheme,
  });

  // Get order data
  const order = await orderBookApi.getOrder(orderUid);

  // Get order trades
  const trades = await orderBookApi.getTrades({ orderUid });

  // Sign order cancellation
  const orderCancellationSigningResult =
    await OrderSigningUtils.signOrderCancellations([orderUid], chainId, signer);

  // Send order cancellation
  const cancellationResult = await orderBookApi.sendSignedOrderCancellations({
    ...orderCancellationSigningResult,
    orderUids: [orderUid],
  });

  console.log("Results: ", {
    orderUid,
    order,
    trades,
    orderCancellationSigningResult,
    cancellationResult,
  });
}

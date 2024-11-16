import {
  OrderBookApi,
  OrderQuoteSideKindSell,
  OrderSigningUtils,
  SigningScheme,
  SupportedChainId,
} from "@cowprotocol/cow-sdk";
import { Web3Provider } from "@ethersproject/providers";
import { JsonRpcProvider } from "ethers";

async function getQuote() {
  try {
    const response = await fetch(
      "https://barn.api.cow.fi/mainnet/api/v1/quote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appData:
            '{"appCode":"CoW Swap","environment":"development","metadata":{"orderClass":{"orderClass":"market"},"quote":{"slippageBips":173,"smartSlippage":true}},"version":"1.3.0"}',
          appDataHash:
            "0xce338c01fb47fa99f456edf27e72b0e733197876f96463c816b52943f269205b",
          buyToken: "0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab",
          from: "0x22C6bCa436D14B0930906cdFbFA52cBdb414b8F3",
          kind: "sell",
          partiallyFillable: false,
          priceQuality: "fast",
          receiver: "0x22C6bCa436D14B0930906cdFbFA52cBdb414b8F3",
          sellAmountBeforeFee: "2000000000000000000",
          sellToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          validFor: 1800,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

const account = "";
const chainId = 100; // Gnosis chain

const provider = new JsonRpcProvider(process.env.RPC_URL);
const signer = await provider.getSigner();

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

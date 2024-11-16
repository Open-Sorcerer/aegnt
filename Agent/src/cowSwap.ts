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

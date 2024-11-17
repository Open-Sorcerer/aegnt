// @ts-nocheck
import { Wallet } from "@ethersproject/wallet";
import {
  AssetType,
  ClobClient,
  OrderType,
  Side,
} from "@polymarket/clob-client";

const wallet = new Wallet(process.env.PK!);

const cred = {
  key: process.env.POLYMARKET_KEY!,
  secret: process.env.POLYMARKET_SECRET!,
  passphrase: process.env.POLYMARKET_PASSPHRASE!,
};

const clobClient = new ClobClient(
  "https://clob.polymarket.com/",
  137,
  wallet,
  cred,
  0,
  wallet.address
);

async function placeBUYOrder(
  clobClient: ClobClient,
  tokenID: string,
  price: number,
  size: number
) {
  const balanceAllowance = await clobClient.getBalanceAllowance({
    asset_type: AssetType.COLLATERAL,
  });

  console.log("balance allowance  ", balanceAllowance);

  const order = await clobClient.createOrder({
    tokenID,
    price,
    side: Side.BUY,
    size,
  });

  const resp = await clobClient.postOrder(order, OrderType.FOK);
  console.log("response : ", resp);
  return resp;
}

async function getMarkets() {
  const orders = await clobClient.getMarkets();
  console.log("orders : ", orders);

  // return top 5 markets which are under data
  return orders.data.slice(0, 5);
}

async function getMarket(marketId: string) {
  const order = await clobClient.getMarket(marketId);
  console.log("order : ", order);
  return order;
}

async function placeOrder() {
  const o = await clobClient.getMarket(
    "0x9c66114d2dfe2139325cc7a408a5cd5d2e73b55d919e2141b3a0ed83fc15895d"
  );

  console.log("Market", o.tokens[0].price);

  const resp = await placeBUYOrder(
    clobClient,
    o.tokens[0].token_id,
    o.tokens[0].price,
    1
  );

  return resp.transactionsHashes[0];
}

export { placeOrder, getMarkets, getMarket };

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
  return orders;
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

  console.log("Market", o);

  const resp = await placeBUYOrder(
    clobClient,
    "64903093311385616430821497488306433314807585397286521531639186532059591846310",
    0.61,
    1
  );

  return resp;
}

export { placeOrder, getMarkets, getMarket };

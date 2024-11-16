import { Wallet } from "@ethersproject/wallet";
import {
  AssetType,
  ClobClient,
  OrderType,
  Side,
} from "@polymarket/clob-client";

const wallet = new Wallet(process.env.pk as string);

const cred = {
  key: process.env.polymarketKey as string,
  secret: process.env.polymarketSecret as string,
  passphrase: process.env.polymarketPassphrase as string,
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
    0.595,
    1
  );

  console.log("response : ", resp);
}

export { placeOrder, getMarkets, getMarket };

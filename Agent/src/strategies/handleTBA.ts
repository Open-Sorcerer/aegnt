import { Wallet, type WalletData } from "@coinbase/coinbase-sdk";
import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

// Contract addresses from your deployment
const ERC721_ADDRESS = "0xD4b658aE5A6dE9a5D6773df96Ca1375EcfEDF058";
const REGISTRY_ADDRESS = "0x02101dfB77FDE026414827Fdc604ddAF224F0921";
const IMPLEMENTATION_ADDRESS = "0x2d25602551487c3f3354dd80d76d54383a243358";

// ABIs extracted from artifacts
const REGISTRY_ABI = parseAbi([
  "event AccountCreated(address account, address indexed implementation, uint256 chainId, address indexed tokenContract, uint256 indexed tokenId, uint256 salt)",
  "function createAccount(address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt, bytes initData) external returns (address)",
  "function account(address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt) external view returns (address)",
]);

const ERC721_ABI = parseAbi([
  "function safeMint(address to) public",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
]);

const TBA_ABI = parseAbi([
  "function execute(address to, uint256 value, bytes data, uint256 operation) external payable returns (bytes)",
  "function token() external view returns (uint256 chainId, address tokenContract, uint256 tokenId)",
  "function owner() external view returns (address)",
  "function isValidSigner(address signer, bytes calldata) external view returns (bytes4)",
]);

// Initialize Viem clients
export const getPublicClient = () => {
  return createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
};

export const mintNFT = async (walletData: WalletData, to: string) => {
  const walletClient = await Wallet.import(walletData);

  const hash = await walletClient.invokeContract({
    contractAddress: ERC721_ADDRESS,
    abi: ERC721_ABI,
    method: "safeMint",
    args: {
      to: to,
    },
  });

  console.log("NFT Mint tx:", hash);
  return hash;
};

export const createTBA = async (
  walletData: WalletData,
  tokenId: number = 6,
  salt: number = 0
) => {
  const client = getPublicClient();
  const chainId = await client.getChainId();

  const walletClient = await Wallet.import(walletData);

  const hash = await walletClient.invokeContract({
    contractAddress: REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    method: "createAccount",
    args: {
      implementation: IMPLEMENTATION_ADDRESS,
      chainId: client.getChainId().toString(), // Convert to BigInt and then to string
      tokenContract: ERC721_ADDRESS,
      tokenId: tokenId.toString(),
      salt: salt.toString(),
      initData: "0x",
    },
  });

  console.log("TBA Creation tx:", hash);

  // Get TBA address
  const tbaAddress = await client.readContract({
    address: REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "account",
    args: [
      IMPLEMENTATION_ADDRESS,
      chainId as any,
      ERC721_ADDRESS,
      BigInt(6),
      BigInt(0),
    ],
  });

  console.log("Token Bound Account:", tbaAddress);
  return { hash, tbaAddress };
};

// Example usage:
// const walletClient = getWalletClient("your-private-key");
// await mintNFT(walletClient, "recipient-address");
// await createTBA(walletClient, 1n, 0n);

export const BitcoinPodManagerAddress =
  "0x96eae70bc21925dde05602c87c4483579205b1f6";

export const podAddress = "0xC9e2e77cc73C5De29fFB4d952121695C86d24362";

export const BitcoinPodManagerABI = [
  {
    type: "function",
    name: "appRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAppRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "bitDSMRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IBitDSMRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "confirmBitcoinDeposit",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
      {
        name: "transactionId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createPod",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "btcAddress",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegatePod",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
      {
        name: "appContract",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBitcoinDepositRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IBitcoinPodManager.BitcoinDepositRequest",
        components: [
          {
            name: "transactionId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "amount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isPending",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBitcoinWithdrawalAddress",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_appRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_bitDSMRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "bitDSMServiceManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "lockPod",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "podToApp",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "podToBitcoinDepositRequest",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "transactionId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isPending",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "podToWithdrawalAddress",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "undelegatePod",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlockPod",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userToPod",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifyBitcoinDepositRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
      {
        name: "transactionId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawBitcoinAsTokens",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawBitcoinCompleteTxRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
      {
        name: "preSignedWithdrawTransaction",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "withdrawAddress",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawBitcoinPSBTRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        internalType: "address",
      },
      {
        name: "withdrawAddress",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BitcoinBurned",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BitcoinDepositConfirmed",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BitcoinMinted",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BitcoinWithdrawalCompleteTxRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "preSignedBitcoinTx",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BitcoinWithdrawalPSBTRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "withdrawAddress",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BitcoinWithdrawnFromPod",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "withdrawAddress",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PodCreated",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PodDelegated",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "appContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PodUndelegated",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VerifyBitcoinDepositRequest",
    inputs: [
      {
        name: "pod",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "bitcoinDepositRequest",
        type: "tuple",
        indexed: false,
        internalType: "struct IBitcoinPodManager.BitcoinDepositRequest",
        components: [
          {
            name: "transactionId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "amount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "isPending",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    anonymous: false,
  },
];

export const operators = [
  {
    id: "chorus",
    name: "Chorus",
    address: "0x60b3b41240Fb9d353acE1E37B0CE79054154eA40",
    tvl: "15 BTC",
    link: "http://142.93.159.73:8080",
  },
  {
    id: "exterio",
    name: "Exterio",
    address: "0x2Ac91055c7905727f8D6939c178195Ea185756bC",
    tvl: "10 BTC",
    link: "http://167.71.128.202:8080",
  },
  {
    id: "theta",
    name: "Theta",
    address: "0x1bbe3979fC24De62024Bd21FB0da2f27D07F47AD",
    tvl: "10 BTC",
    link: "http://138.197.145.239:8080",
  },
];

export const delegationApps = [
  {
    id: "0x864C21dfA0687d699dD81ECE775B7EA9478e9e7f",
    name: "bodNode",
    description: "Testnet Operator for EigenLayer",
    url: "https://www.example.com",
    block: 2731223,
    txHash:
      "0x3136c2592c251344bb9423579735847e9a6fadd74936f24c462954de32488268",
    logo: "https://i.ibb.co/W6cVJF1/bod-logo.png",
  },
  {
    id: "0xCF6FEBE8cD23e59Fc2259C09ea3db0ba9bf6FFe3",
    name: "bodNode",
    description: "Testnet Operator for EigenLayer",
    url: "https://www.example.com",
    block: 2731320,
    txHash:
      "0xb1ef8844a9ef0dddf492da5e5f7460240ed7c829eec0c294b65d685d56a8bc43",
    logo: "https://i.ibb.co/W6cVJF1/bod-logo.png",
  },
  {
    id: "0x9adD9D3c849a59169C2213e06619747327d61BE5",
    name: "bodNode",
    description: "Testnet Operator for EigenLayer",
    url: "https://www.example.com",
    block: 2738976,
    txHash:
      "0x49e1cb278dd4128051674d129d74faa706a2c6d081d1d2d50736d12d8a480dc2",
    logo: "https://i.ibb.co/W6cVJF1/bod-logo.png",
  },
  {
    id: "0x58C3a95F687B9C707C4d36a57EF680D765D28d45",
    name: "Cdp_v1",
    description: "Testnet App for BitDSM",
    url: "https://www.cdpexamples.com",
    block: 2740743,
    txHash:
      "0xc83406919cbc03074b67da69c573b72dfc78cd2f18d61aa63eb0946735e3e363",
    logo: null,
  },
  {
    id: "0xd312E1E8B7c19513A536FA06718542C2843988Dc",
    name: "Cdp_v1",
    description: "Testnet App for BitDSM",
    url: "https://www.cdpexamples.com",
    block: 2743992,
    txHash:
      "0xe51094c96e716cf55375d24e997212feb27224988bb9d0bea1ebda616b720d34",
    logo: null,
  },
  {
    id: "0x87f0bF2972ef695d5d9336093E8DE5463906f19e",
    name: "TimeLock ",
    description: "Testnet Operator for EigenLayer",
    url: "https://www.timelock.xyz",
    block: 2745691,
    txHash:
      "0x11251fac7cd49b8d389427ab4a27b71b82d2a5b745fc52bbf2a10c3e7b9d19aa",
    logo: null,
  },
];

export const bitcoinPODABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "_operatorBtcPubKey",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_btcAddress",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_manager",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "bitcoinAddress",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "bitcoinBalance",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "_operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBitcoinAddress",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBitcoinBalance",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOperator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOperatorBtcPubKey",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSignedBitcoinWithdrawTransaction",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isLocked",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lock",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "locked",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "manager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "_operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "operator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "operatorBtcPubKey",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSignedBitcoinWithdrawTransaction",
    inputs: [
      {
        name: "_signedBitcoinWithdrawTransaction",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signedBitcoinWithdrawTransaction",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlock",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
];

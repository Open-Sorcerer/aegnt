# AgentFi 🤖

> Your personal AI-powered DeFi agent that lives as an NFT, managing complex DeFi strategies through natural language while securing assets in its own Token Bound Account.

## Overview

AgentFi transforms DeFi accessibility by introducing AI-powered financial agents that live as NFTs. Each agent is a unique digital entity with its own secure wallet (powered by Token Bound Accounts/ERC-6551) and investment personality. Through natural language interactions, users can delegate complex DeFi operations - from yield farming to cross-chain bridging - to their personalized agent, making DeFi as simple as having a conversation with your digital financial assistant.

### Key Features

- **AI-Powered Natural Language Interface**: Interact with DeFi protocols through simple text commands
- **Token Bound Accounts**: Each NFT has its own secure wallet to hold and manage assets
- **Multi-Chain Support**: Deployed on Base and Polygon, with cross-chain capabilities via CCIP
- **DeFi Protocol Integrations**:
  - Compound Finance for lending/borrowing
  - Polymarket for prediction markets
  - CoW Protocol for efficient trading
  - Bitcoin deposits via BitDSM
  - Cross-chain bridging

## How it's Made

AgentFi leverages several technologies and protocols:

### 1. Token Bound Accounts (ERC-6551)

- Deployed on Base and Polygon
- Each NFT gets its own wallet address
- Secure asset management through smart contract architecture

### 2. AI Integration

- Natural language processing using MessageKit
- Contextual understanding of DeFi commands
- Automated strategy execution
- Error handling and user-friendly responses

### 3. Protocol Integrations

- **Compound Finance**: Yield generation through lending
- **CoW Protocol**: MEV-protected trading
- **Polymarket**: Prediction market interactions
- **CCIP**: Cross-chain asset transfers
- **BitDSM**: Bitcoin integration

### 4. Security & Privacy

- Nillion for secure data storage
- Private key management
- Transaction signing security
- Rate limiting and validation

### Tech Stack

- **Frontend**: MessageKit for natural language processing
- **Smart Contracts**: Solidity, [ERC-721](https://eips.ethereum.org/EIPS/eip-721), [ERC-6551](https://eips.ethereum.org/EIPS/eip-6551)
- **Cross-chain**: [Chainlink CCIP](https://docs.chain.link/ccip)
- **Development**: TypeScript, Viem, Ethers.js
- **Infrastructure**: Base, Polygon

## Contract Deployments

### Token Based Accounts

#### Polygon

TBA_FACTORY_CONTRACT = [0x325c488563E68e956DA16925fD062EA4692C59eC](https://polygon.blockscout.com/address/0x325c488563E68e956DA16925fD062EA4692C59eC?tab=contract)

#### Base

TBA_FACTORY_CONTRACT = [0x956d53cA7074338022939D582a30e97c7981aBc2](https://base.blockscout.com/address/0x956d53cA7074338022939D582a30e97c7981aBc2?tab=contract)

#### Scroll

TBA_FACTORY_CONTRACT = [0x956d53cA7074338022939D582a30e97c7981aBc2](https://scroll.blockscout.com/address/0x65040Bdc5B720103EB3088371ba82DA4EbA8C802)

CCIP Contracts

### CCIP Gateway

[BlockScout](https://base.blockscout.com/address/0x4583dDF3d25087a9e5D0f0De61674555b414C827?tab=contract)

[CCIP Explorer](https://ccip.chain.link/address/0x4583ddf3d25087a9e5d0f0de61674555b414c827)

### Aave Gateway

#### Base

[CapitalFi - BlockScout](https://base.blockscout.com/address/0x9139cC0e42e49290a82A7389b559e735Fa77c438)

[CapitalFiGateway - BlockScout](https://base.blockscout.com/address/0x58E3d7cdfeD23413279c0AE8Ef772F73e4492253)

#### OP

[CapitalFi - BlockScout](https://optimism.blockscout.com/address/0x65040Bdc5B720103EB3088371ba82DA4EbA8C802)

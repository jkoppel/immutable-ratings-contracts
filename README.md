# Immutable Ratings Smart Contracts

This repository contains the smart contracts for the Immutable Ratings platform, a decentralized rating system that allows users to submit positive (up) and negative (down) ratings for any URL on the web.

## Overview

Immutable Ratings is a blockchain-based rating system that creates immutable records of ratings for websites and online content. The system uses two ERC20 tokens to represent ratings:

- **Thumbs Up (TUP)**: Represents positive ratings
- **Thumbs Down (TDN)**: Represents negative ratings

Each URL has its own unique "market" address derived deterministically from the URL itself, ensuring consistency and preventing duplicates. When users rate a URL, tokens are minted to the corresponding market address, with the balance of tokens representing the cumulative rating score.

## Contract Architecture

The system consists of the following smart contracts:

### ImmutableRatings.sol

The core controller contract that manages the creation of markets and the submission of ratings. Key features include:

- Creation of deterministic market addresses for URLs
- Minting of TUP and TDN tokens to market addresses based on user ratings
- Fee collection for rating submissions
- Tracking of user rating counts

### TUP.sol

An ERC20 token representing positive ratings ("Thumbs Up"). Only the ImmutableRatings contract can mint these tokens.

### TDN.sol

An ERC20 token representing negative ratings ("Thumbs Down"). Only the ImmutableRatings contract can mint these tokens.

## Security Features

- **Immutable Design**: The contracts are designed to be immutable and non-upgradeable. Future versions will be deployed separately.
- **Reentrancy Protection**: The ImmutableRatings contract uses OpenZeppelin's ReentrancyGuard to prevent reentrancy attacks.
- **Access Control**: Both token contracts use OpenZeppelin's AccessControl to restrict minting capabilities.
- **Ownership**: The ImmutableRatings contract uses OpenZeppelin's Ownable for ownership management.

## Contract Details

### ImmutableRatings

- **Version**: 1.0.0
- **Minimum Rating Amount**: 1000 tokens (with 18 decimals)
- **Rating Price**: 0.00000007 ETH per token

### Functions

#### Market Management
- `createMarket(string calldata url)`: Creates a new market for a URL
- `getMarketAddress(string calldata url)`: Returns the deterministic market address for a URL

#### Rating Creation
- `createUpRating(MarketRating calldata rating)`: Creates a positive rating for a URL
- `createDownRating(MarketRating calldata rating)`: Creates a negative rating for a URL
- `createRatings(MarketRating[] calldata upRatings, MarketRating[] calldata downRatings)`: Creates multiple ratings in a single transaction

#### User Information
- `getUserRatings(address user)`: Returns the total number of ratings submitted by a user

#### Payment Management
- `previewPayment(uint256 amount)`: Returns the payment required for a rating of the specified amount

#### Admin Functions
- `setReceiver(address _receiver)`: Sets the address that receives rating payments (owner only)

### TUP and TDN Tokens

- Standard ERC20 tokens with 18 decimals
- Implement AccessControl for restricted minting
- Only the ImmutableRatings contract has the MINTER_ROLE

## Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm

### Installation

1. Clone the repository
   ```bash
   git clone <url>
   cd immutable-ratings-contracts
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Compile the contracts
   ```bash
   pnpm run compile
   ```

4. Run tests
   ```bash
   pnpm run test
   ```

### Deployment

The repository includes deployment scripts for:
1. TUP token (`deploy/001-tup.ts`)
2. TDN token (`deploy/002-tdn.ts`)
3. ImmutableRatings contract (`deploy/003-immutable-ratings.ts`)

To deploy the contracts:

```bash
pnpm run deploy:contracts
```

## For Auditors

### Security Considerations

1. **Deterministic Market Addresses**: Market addresses are deterministically generated from URLs using a constant seed. This ensures consistency but also means market addresses are predictable.

2. **Token Minting**: Both TUP and TDN tokens are minted when ratings are created. There is no cap on the total supply of these tokens.

3. **Payment Handling**: Users must pay a fee (in ETH) to submit ratings. This fee is transferred to a designated receiver address.

4. **URL Validation**: The contract does not validate or normalize URLs. It's assumed that the frontend application handles URL normalization to prevent duplicate markets for the same content with different URL formats.

5. **Rating Amounts**: Ratings must be in multiples of 1 ether (10^18) and must meet the minimum rating amount requirement.

### Key Contract Invariants

1. Each unique URL can only have one market address.
2. Market addresses are deterministic and cannot be changed.
3. Only the ImmutableRatings contract can mint TUP and TDN tokens.
4. Users must pay a fee to submit ratings.
5. Rating amounts must be multiples of 1 ether and meet the minimum requirement.

### Testing

The repository includes a comprehensive test suite in `test/immutable-ratings.test.ts` that covers:
- Contract deployment
- Market creation
- Rating submission
- Fee collection
- Error handling

Run the tests with:
```bash
pnpm run test
```

# Unlimited Approval Diff Tracker

A production-grade cross-chain approval observability system for Ethereum and Arbitrum. Track unlimited ERC20 approvals, create snapshots, and diff changes over time.

## Architecture

```
┌────────────────────┐
│   Web Frontend     │
│  (Next.js/React)   │
└──────────┬─────────┘
           │
    REST API
           │
┌──────────┴──────────┐
│    Backend API      │
│  (Node.js/Express)  │
└───────┬─────────────┘
        │
  PostgreSQL
        │
┌───────┴─────────────┐
│  Ethereum/Arbitrum │
│      RPC Nodes     │
└─────────────────────┘
```

## Features

- **Multi-chain support**: Ethereum mainnet + Arbitrum L2
- **Approval scanning**: On-demand indexing of ERC20 Approval events
- **Snapshot system**: Immutable snapshots of approval state at specific blocks
- **Diff engine**: Compare snapshots to detect new unlimited approvals, revocations, and changes
- **Risk scoring**: Configurable risk scoring based on unlimited status, verification, dormancy, and TVL
- **REST API**: Full API for wallet registration, approval queries, snapshot management
- **CLI tool**: Command-line interface for snapshot creation and diffing
- **Web dashboard**: Modern React UI with approval tables, timeline, and risk metrics

## Tech Stack

- **Backend**: Node.js, TypeScript, Express, Prisma, PostgreSQL, viem
- **CLI**: Node.js, TypeScript, commander
- **Web**: Next.js 14, React 18, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL database
- RPC endpoints (Alchemy, Infura, or self-hosted nodes)

### Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd unlimited-approval-tracker
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `ETHEREUM_RPC_URL`: Ethereum RPC endpoint
- `ARBITRUM_RPC_URL`: Arbitrum RPC endpoint
- `PORT`: Backend server port (default: 4000)

4. Set up the database:

```bash
cd backend
pnpm prisma:migrate
pnpm prisma:generate
```

5. Start the backend:

```bash
pnpm dev:backend
```

The API will be available at `http://localhost:4000`

6. Start the web frontend (in another terminal):

```bash
pnpm dev:web
```

The web app will be available at `http://localhost:3000`

## Usage

### CLI

The CLI provides commands for snapshot creation, listing approvals, and diffing snapshots.

#### Create a snapshot:

```bash
pnpm dev:cli -- snapshot --wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb --chain ethereum
```

#### List current approvals:

```bash
pnpm dev:cli -- list --wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb --chain ethereum
```

#### Diff two snapshots:

```bash
pnpm dev:cli -- diff --from <snapshotIdA> --to <snapshotIdB>
```

### API

#### Register a wallet:

```bash
POST /wallet
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

#### Create a snapshot:

```bash
POST /snapshots/wallet/:address/snapshot
Content-Type: application/json

{
  "chain": "ethereum"
}
```

#### Get current approvals:

```bash
GET /approvals/wallet/:address?chain=ethereum
```

#### List snapshots:

```bash
GET /snapshots/wallet/:address/snapshots?chain=ethereum
```

#### Diff snapshots:

```bash
GET /snapshots/:fromId/diff/:toId
```

### Web Dashboard

1. Open `http://localhost:3000`
2. Enter a wallet address
3. Select a chain (Ethereum or Arbitrum)
4. Click "Scan & Snapshot" to create a snapshot
5. View approvals table and snapshot timeline
6. Compare snapshots to see changes over time

## Database Schema

- **Wallet**: Registered wallet addresses
- **WalletChainState**: Last scanned block per wallet/chain
- **Approval**: Current approval state (wallet, token, spender, chain)
- **Snapshot**: Immutable snapshot of approvals at a block
- **SnapshotItem**: Individual approval entries in a snapshot
- **SnapshotDiff**: Precomputed diffs between snapshots

## Development

### Project Structure

```
unlimited-approval-tracker/
├── backend/          # Express API + Prisma + services
├── cli/              # CLI tool
├── web/              # Next.js frontend
└── package.json      # Root workspace config
```

### Running in Development

```bash
# Backend only
pnpm dev:backend

# Web only
pnpm dev:web

# Both concurrently
pnpm dev
```

### Building for Production

```bash
pnpm build
```

## Architecture Decisions

- **On-demand indexing**: Scans Approval events when snapshots are requested, not continuously
- **Snapshot immutability**: Snapshots are never modified, enabling reliable historical diffing
- **Multi-chain abstraction**: Chain adapters allow easy extension to new chains
- **Risk scoring**: Configurable scoring system for identifying high-risk approvals
- **REST API**: Simple, stateless API design for easy integration

## Future Enhancements

- Continuous indexing service (background worker)
- Browser extension integration
- Email alerts for new unlimited approvals
- GraphQL API option
- Additional L2 chains (Base, Optimism, Polygon)
- Verified contract detection via Etherscan/Sourcify
- TVL data integration for risk scoring
- Prometheus metrics and observability
- Rate limiting per API key

## License

MIT

# Quick Start Guide

## Prerequisites Check

1. **Node.js**: `node --version` (should be >= 20.0.0)
2. **pnpm**: `pnpm --version` (should be >= 9.0.0)
3. **PostgreSQL**: Running and accessible

## Setup Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set:
- `DATABASE_URL`: Your PostgreSQL connection string
- `ETHEREUM_RPC_URL`: Ethereum RPC endpoint (e.g., Alchemy, Infura)
- `ARBITRUM_RPC_URL`: Arbitrum RPC endpoint

### 3. Initialize Database

```bash
cd backend
pnpm prisma:migrate
pnpm prisma:generate
cd ..
```

### 4. Start Backend

```bash
pnpm dev:backend
```

Backend will run on `http://localhost:4000`

### 5. Start Web Frontend (new terminal)

```bash
pnpm dev:web
```

Web app will run on `http://localhost:3000`

## First Test

1. Open `http://localhost:3000`
2. Enter a wallet address (e.g., `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`)
3. Select "Ethereum"
4. Click "Scan & Snapshot"
5. Wait for the scan to complete
6. View approvals in the table

## CLI Usage

```bash
# Create snapshot
pnpm dev:cli -- snapshot --wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb --chain ethereum

# List approvals
pnpm dev:cli -- list --wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Diff snapshots
pnpm dev:cli -- diff --from <snapshotId1> --to <snapshotId2>
```

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running: `pg_isready`
- Check `DATABASE_URL` format: `postgresql://user:password@host:5432/dbname`
- Ensure database exists: `createdb unlimited_approval_tracker`

### RPC Connection Issues

- Verify RPC URLs are correct and accessible
- Check API keys are valid (for Alchemy/Infura)
- Test RPC endpoint: `curl -X POST $ETHEREUM_RPC_URL -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'`

### Port Already in Use

- Backend default: 4000 (change `PORT` in `.env`)
- Web default: 3000 (change in `web/package.json` scripts)

### Prisma Issues

- Run `pnpm prisma:generate` in backend directory
- Ensure migrations are applied: `pnpm prisma:migrate`

import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT ?? 4000),
  dbUrl: process.env.DATABASE_URL ?? '',
  rpc: {
    ethereum: process.env.ETHEREUM_RPC_URL ?? '',
    arbitrum: process.env.ARBITRUM_RPC_URL ?? ''
  },
  rateLimit: {
    windowMs: Number(process.env.API_RATE_LIMIT_WINDOW_MS ?? 60_000),
    max: Number(process.env.API_RATE_LIMIT_MAX ?? 60)
  }
};


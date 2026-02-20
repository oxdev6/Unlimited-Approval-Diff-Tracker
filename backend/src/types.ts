export type ChainId = 'ethereum' | 'arbitrum';

export interface ApprovalEvent {
  chain: ChainId;
  tokenAddress: `0x${string}`;
  owner: `0x${string}`;
  spender: `0x${string}`;
  value: bigint;
  blockNumber: bigint;
  logIndex: number;
}

export interface RiskScoreInput {
  chain: ChainId;
  tokenAddress: string;
  spenderAddress: string;
  isUnlimited: boolean;
  allowance: bigint;
  lastUpdatedAt: Date;
  spenderVerified: boolean;
  contractTvlUsd?: number;
  dormantDays?: number;
}


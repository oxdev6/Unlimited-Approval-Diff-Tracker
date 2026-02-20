export interface Approval {
  id: string;
  walletId: string;
  chain: 'ethereum' | 'arbitrum';
  tokenAddress: string;
  spenderAddress: string;
  allowance: string;
  isUnlimited: boolean;
  lastUpdatedBlock: string;
  lastUpdatedAt: string;
}

export interface Snapshot {
  id: string;
  walletId: string;
  chain: 'ethereum' | 'arbitrum';
  createdAt: string;
  blockNumber: string;
}

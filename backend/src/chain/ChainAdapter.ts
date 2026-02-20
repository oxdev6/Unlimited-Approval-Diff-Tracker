import { ApprovalEvent } from '../types';

export interface ChainAdapter {
  chain: 'ethereum' | 'arbitrum';
  getApprovalLogs(params: {
    wallet: `0x${string}`;
    fromBlock: bigint;
  }): Promise<ApprovalEvent[]>;
}


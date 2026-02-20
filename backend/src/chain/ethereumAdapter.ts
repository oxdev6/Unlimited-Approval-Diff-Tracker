import { createPublicClient, http, parseAbiItem } from 'viem';
import { mainnet } from 'viem/chains';
import { ChainAdapter } from './ChainAdapter';
import { ApprovalEvent } from '../types';
import { config } from '../config';

const approvalEvent = parseAbiItem(
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
);

const client = createPublicClient({
  chain: mainnet,
  transport: http(config.rpc.ethereum)
});

export const ethereumAdapter: ChainAdapter = {
  chain: 'ethereum',
  async getApprovalLogs({ wallet, fromBlock }): Promise<ApprovalEvent[]> {
    const logs = await client.getLogs({
      address: undefined,
      event: approvalEvent,
      fromBlock,
      toBlock: 'latest',
      args: { owner: wallet }
    });

    return logs.map((log, idx) => ({
      chain: 'ethereum',
      tokenAddress: log.address as `0x${string}`,
      owner: (log.args.owner ?? wallet) as `0x${string}`,
      spender: log.args.spender as `0x${string}`,
      value: log.args.value as bigint,
      blockNumber: log.blockNumber!,
      logIndex: Number(log.logIndex ?? idx)
    }));
  }
};


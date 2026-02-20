import { WalletService } from './walletService';
import { ApprovalService } from './approvalService';
import { SnapshotService } from './snapshotService';
import { getAdapter } from '../chain';
import { ChainId } from '../types';
import { logger } from '../logger';
import { createPublicClient, http } from 'viem';
import { mainnet, arbitrum } from 'viem/chains';
import { config } from '../config';

export class IndexerService {
  constructor(
    private walletService = new WalletService(),
    private approvalService = new ApprovalService(),
    private snapshotService = new SnapshotService()
  ) {}

  async scanAndSnapshot(walletAddress: `0x${string}`, chain: ChainId) {
    const wallet = await this.walletService.registerWallet(walletAddress);
    const chainState = await this.walletService.getOrCreateChainState(wallet.id, chain);

    const adapter = getAdapter(chain);
    const fromBlock = chainState.lastScannedBlock;

    logger.info(
      { wallet: wallet.address, chain, fromBlock: fromBlock.toString() },
      'Scanning approvals'
    );

    const events = await adapter.getApprovalLogs({
      wallet: walletAddress,
      fromBlock
    });

    let latestBlock = fromBlock;
    if (events.length) {
      await this.approvalService.applyEvents(wallet.id, events);

      latestBlock = events.reduce(
        (acc, e) => (e.blockNumber > acc ? e.blockNumber : acc),
        fromBlock
      );
      await this.walletService.updateLastScannedBlock(wallet.id, chain, latestBlock);
    } else {
      // If no events, fetch current block for snapshot
      const rpcClient = createPublicClient({
        chain: chain === 'ethereum' ? mainnet : arbitrum,
        transport: http(chain === 'ethereum' ? config.rpc.ethereum : config.rpc.arbitrum)
      });
      const currentBlock = await rpcClient.getBlockNumber();
      latestBlock = currentBlock;
    }

    const snapshot = await this.snapshotService.createSnapshot({
      walletId: wallet.id,
      chain,
      blockNumber: latestBlock
    });

    return snapshot;
  }
}

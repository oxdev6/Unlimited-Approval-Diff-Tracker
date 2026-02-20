import { prisma } from '../db';
import { ApprovalEvent, ChainId } from '../types';

const UNLIMITED_THRESHOLD = 1n << 255n;

export class ApprovalService {
  async applyEvents(walletId: string, events: ApprovalEvent[]) {
    if (!events.length) return;

    for (const ev of events) {
      const isUnlimited = ev.value >= UNLIMITED_THRESHOLD;

      await prisma.approval.upsert({
        where: {
          walletId_chain_tokenAddress_spenderAddress: {
            walletId,
            chain: ev.chain,
            tokenAddress: ev.tokenAddress.toLowerCase(),
            spenderAddress: ev.spender.toLowerCase()
          }
        },
        update: {
          allowance: ev.value.toString(),
          isUnlimited,
          lastUpdatedBlock: ev.blockNumber,
          lastUpdatedAt: new Date()
        },
        create: {
          walletId,
          chain: ev.chain,
          tokenAddress: ev.tokenAddress.toLowerCase(),
          spenderAddress: ev.spender.toLowerCase(),
          allowance: ev.value.toString(),
          isUnlimited,
          lastUpdatedBlock: ev.blockNumber
        }
      });
    }
  }

  async getCurrentApprovals(walletId: string, chain?: ChainId) {
    return prisma.approval.findMany({
      where: {
        walletId,
        ...(chain ? { chain } : {})
      },
      orderBy: { lastUpdatedAt: 'desc' }
    });
  }
}


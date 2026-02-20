import { prisma } from '../db';
import { ChainId } from '../types';

export class SnapshotService {
  async createSnapshot(params: {
    walletId: string;
    chain: ChainId;
    blockNumber: bigint;
  }) {
    const { walletId, chain, blockNumber } = params;

    const approvals = await prisma.approval.findMany({
      where: { walletId, chain }
    });

    const snapshot = await prisma.snapshot.create({
      data: {
        walletId,
        chain,
        blockNumber,
        items: {
          createMany: {
            data: approvals.map((a) => ({
              tokenAddress: a.tokenAddress,
              spenderAddress: a.spenderAddress,
              allowance: a.allowance,
              isUnlimited: a.isUnlimited
            }))
          }
        }
      }
    });

    return snapshot;
  }

  async listSnapshots(walletId: string, chain?: ChainId) {
    return prisma.snapshot.findMany({
      where: { walletId, ...(chain ? { chain } : {}) },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getSnapshotWithItems(id: string) {
    return prisma.snapshot.findUnique({
      where: { id },
      include: { items: true }
    });
  }
}


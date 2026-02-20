import { prisma } from '../db';
import { ChainId } from '../types';

export class WalletService {
  async registerWallet(address: string) {
    const normalized = address.toLowerCase();
    return prisma.wallet.upsert({
      where: { address: normalized },
      update: {},
      create: { address: normalized }
    });
  }

  async getWalletByAddress(address: string) {
    return prisma.wallet.findUnique({
      where: { address: address.toLowerCase() }
    });
  }

  async getOrCreateChainState(walletId: string, chain: ChainId) {
    return prisma.walletChainState.upsert({
      where: {
        walletId_chain: {
          walletId,
          chain
        }
      },
      update: {},
      create: {
        walletId,
        chain,
        lastScannedBlock: BigInt(0)
      }
    });
  }

  async updateLastScannedBlock(walletId: string, chain: ChainId, block: bigint) {
    return prisma.walletChainState.update({
      where: { walletId_chain: { walletId, chain } },
      data: { lastScannedBlock: block }
    });
  }

  async listWatchedWallets() {
    return prisma.wallet.findMany({ orderBy: { createdAt: 'desc' } });
  }
}


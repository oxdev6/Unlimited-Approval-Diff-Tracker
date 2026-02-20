import { Command } from 'commander';
import { api } from '../services/apiClient';

export function snapshotCommand() {
  const cmd = new Command('snapshot');

  cmd
    .description('Create a new approval snapshot for a wallet')
    .requiredOption('-w, --wallet <address>', 'Wallet address')
    .option('-c, --chain <chain>', 'Chain (ethereum|arbitrum)', 'ethereum')
    .action(async (opts) => {
      const { wallet, chain } = opts;

      const res = await api.post(`/snapshots/wallet/${wallet}/snapshot`, { chain });
      console.log('Snapshot created:', res.data);
    });

  return cmd;
}

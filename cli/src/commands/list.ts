import { Command } from 'commander';
import { api } from '../services/apiClient';
import { printApprovals } from '../formatters/approvalsFormatter';

export function listCommand() {
  const cmd = new Command('list');

  cmd
    .description('List current approvals for a wallet')
    .requiredOption('-w, --wallet <address>', 'Wallet address')
    .option('-c, --chain <chain>', 'Chain (ethereum|arbitrum)')
    .action(async (opts) => {
      const { wallet, chain } = opts;

      const approvalsRes = await api.get('/approvals/wallet/' + wallet, {
        params: chain ? { chain } : {}
      });
      printApprovals(approvalsRes.data);
    });

  return cmd;
}

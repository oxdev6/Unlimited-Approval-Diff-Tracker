import { Command } from 'commander';
import { api } from '../services/apiClient';
import { printDiff } from '../formatters/diffFormatter';

export function diffCommand() {
  const cmd = new Command('diff');

  cmd
    .description('Diff two snapshots')
    .requiredOption('--from <id>', 'From snapshot ID')
    .requiredOption('--to <id>', 'To snapshot ID')
    .action(async (opts) => {
      const { from, to } = opts;
      const res = await api.get(`/snapshots/${from}/diff/${to}`);
      printDiff(res.data);
    });

  return cmd;
}

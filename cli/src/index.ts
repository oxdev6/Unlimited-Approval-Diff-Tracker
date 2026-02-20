#!/usr/bin/env node
import { Command } from 'commander';
import 'dotenv/config';
import { snapshotCommand } from './commands/snapshot';
import { diffCommand } from './commands/diff';
import { listCommand } from './commands/list';

const program = new Command();

program
  .name('approval')
  .description('Unlimited approval diff tracker CLI')
  .version('0.1.0');

program.addCommand(snapshotCommand());
program.addCommand(diffCommand());
program.addCommand(listCommand());

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});

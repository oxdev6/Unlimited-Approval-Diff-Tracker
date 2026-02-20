import { Router } from 'express';
import { z } from 'zod';
import { IndexerService } from '../services/indexerService';
import { SnapshotService } from '../services/snapshotService';
import { DiffService } from '../services/diffService';
import { WalletService } from '../services/walletService';

const router = Router();
const indexerService = new IndexerService();
const snapshotService = new SnapshotService();
const diffService = new DiffService();
const walletService = new WalletService();

const chainSchema = z.enum(['ethereum', 'arbitrum']);

router.post('/wallet/:address/snapshot', async (req, res, next) => {
  try {
    const chain = chainSchema.parse(req.body.chain ?? 'ethereum');
    const wallet = req.params.address as `0x${string}`;

    const snapshot = await indexerService.scanAndSnapshot(wallet, chain);
    res.json(snapshot);
  } catch (err) {
    next(err);
  }
});

router.get('/wallet/:address/snapshots', async (req, res, next) => {
  try {
    const chain = req.query.chain ? chainSchema.parse(req.query.chain) : undefined;
    const wallet = await walletService.getWalletByAddress(req.params.address);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

    const snapshots = await snapshotService.listSnapshots(wallet.id, chain as any);
    res.json(snapshots);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const snap = await snapshotService.getSnapshotWithItems(req.params.id);
    if (!snap) return res.status(404).json({ error: 'Snapshot not found' });
    res.json(snap);
  } catch (err) {
    next(err);
  }
});

router.get('/:fromId/diff/:toId', async (req, res, next) => {
  try {
    const diff = await diffService.diffSnapshots(req.params.fromId, req.params.toId);
    res.json(diff);
  } catch (err) {
    next(err);
  }
});

export default router;

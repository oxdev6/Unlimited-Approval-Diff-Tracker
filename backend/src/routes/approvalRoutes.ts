import { Router } from 'express';
import { WalletService } from '../services/walletService';
import { ApprovalService } from '../services/approvalService';
import { z } from 'zod';

const router = Router();
const walletService = new WalletService();
const approvalService = new ApprovalService();

const chainSchema = z.enum(['ethereum', 'arbitrum']);

router.get('/wallet/:address', async (req, res, next) => {
  try {
    const chain = req.query.chain ? chainSchema.parse(req.query.chain) : undefined;
    const wallet = await walletService.getWalletByAddress(req.params.address);
    if (!wallet) return res.status(404).json({ error: 'Wallet not registered' });

    const approvals = await approvalService.getCurrentApprovals(wallet.id, chain as any);
    res.json(approvals);
  } catch (err) {
    next(err);
  }
});

export default router;

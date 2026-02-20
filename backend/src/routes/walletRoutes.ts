import { Router } from 'express';
import { WalletService } from '../services/walletService';

const router = Router();
const walletService = new WalletService();

router.post('/', async (req, res, next) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: 'address is required' });

    const wallet = await walletService.registerWallet(address);
    res.json(wallet);
  } catch (err) {
    next(err);
  }
});

router.get('/:address', async (req, res, next) => {
  try {
    const wallet = await walletService.getWalletByAddress(req.params.address);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const wallets = await walletService.listWatchedWallets();
    res.json(wallets);
  } catch (err) {
    next(err);
  }
});

export default router;

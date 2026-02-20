import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import walletRoutes from './routes/walletRoutes';
import snapshotRoutes from './routes/snapshotRoutes';
import approvalRoutes from './routes/approvalRoutes';
import { errorHandler } from './middleware/errorHandler';
import { rateLimit } from './middleware/rateLimit';

export function createServer() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(rateLimit);

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/wallet', walletRoutes);
  app.use('/approvals', approvalRoutes);
  app.use('/snapshots', snapshotRoutes);

  app.use(errorHandler);

  return app;
}

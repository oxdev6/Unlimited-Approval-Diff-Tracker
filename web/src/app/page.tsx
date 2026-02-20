'use client';

import { useEffect, useState } from 'react';
import { DashboardCards } from '../components/DashboardCards';
import { ApprovalsTable } from '../components/ApprovalsTable';
import { SnapshotTimeline } from '../components/SnapshotTimeline';
import { api } from '../lib/api';
import type { Approval, Snapshot } from '../lib/types';

export default function HomePage() {
  const [wallet, setWallet] = useState('');
  const [chain, setChain] = useState<'ethereum' | 'arbitrum'>('ethereum');
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const [approvalsRes, snapshotsRes] = await Promise.all([
        api.get(`/approvals/wallet/${wallet}`, { params: { chain } }),
        api.get(`/snapshots/wallet/${wallet}/snapshots`, { params: { chain } })
      ]);
      setApprovals(approvalsRes.data);
      setSnapshots(snapshotsRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const createSnapshot = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      await api.post(`/snapshots/wallet/${wallet}/snapshot`, { chain });
      await loadData();
    } catch (err) {
      console.error('Failed to create snapshot:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet) {
      void loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  const unlimitedCount = approvals.filter((a) => a.isUnlimited).length;

  return (
    <main className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <label className="block text-sm text-slate-400">Wallet address</label>
            <input
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-emerald-500"
              placeholder="0x..."
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={chain}
              onChange={(e) => setChain(e.target.value as any)}
            >
              <option value="ethereum">Ethereum</option>
              <option value="arbitrum">Arbitrum</option>
            </select>
            <button
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 disabled:opacity-50"
              onClick={createSnapshot}
              disabled={!wallet || loading}
            >
              {loading ? 'Scanning…' : 'Scan & Snapshot'}
            </button>
          </div>
        </div>
      </section>

      <DashboardCards
        totalApprovals={approvals.length}
        unlimitedApprovals={unlimitedCount}
        chain={chain}
      />

      <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
        <ApprovalsTable approvals={approvals} />
        <SnapshotTimeline snapshots={snapshots} wallet={wallet} />
      </section>
    </main>
  );
}

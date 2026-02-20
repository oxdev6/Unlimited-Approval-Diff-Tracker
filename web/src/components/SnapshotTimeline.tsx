import React from 'react';
import type { Snapshot } from '../lib/types';

interface Props {
  snapshots: Snapshot[];
  wallet: string;
}

export const SnapshotTimeline: React.FC<Props> = ({ snapshots }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-100">Snapshot timeline</h2>
        <span className="text-xs text-slate-500">{snapshots.length} snapshots</span>
      </div>
      <ol className="mt-4 space-y-3 text-xs">
        {snapshots.map((s, idx) => {
          const label = `#${snapshots.length - idx}`;
          return (
            <li key={s.id} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-200">{label}</span>
                  <span className="text-slate-400">
                    {new Date(s.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-slate-500">
                  Block {s.blockNumber.toString()} on {s.chain}
                </div>
              </div>
            </li>
          );
        })}
        {snapshots.length === 0 && (
          <li className="text-slate-500">No snapshots yet.</li>
        )}
      </ol>
    </div>
  );
};

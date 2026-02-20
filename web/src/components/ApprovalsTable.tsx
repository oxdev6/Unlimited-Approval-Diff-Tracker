import React from 'react';
import type { Approval } from '../lib/types';

interface Props {
  approvals: Approval[];
}

export const ApprovalsTable: React.FC<Props> = ({ approvals }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <h2 className="text-sm font-medium text-slate-100">Current approvals</h2>
        <span className="text-xs text-slate-500">
          {approvals.length} entries
        </span>
      </div>
      <div className="max-h-80 overflow-auto text-sm">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-slate-900">
            <tr className="text-xs text-slate-400">
              <th className="px-3 py-2 text-left">Token</th>
              <th className="px-3 py-2 text-left">Spender</th>
              <th className="px-3 py-2 text-left">Allowance</th>
              <th className="px-3 py-2 text-left">Unlimited</th>
              <th className="px-3 py-2 text-left">Last modified</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => (
              <tr key={a.id} className="border-t border-slate-800">
                <td className="px-3 py-2 font-mono text-xs">
                  {a.tokenAddress.slice(0, 8)}…
                </td>
                <td className="px-3 py-2 font-mono text-xs">
                  {a.spenderAddress.slice(0, 8)}…
                </td>
                <td className="px-3 py-2">
                  <span className="font-mono text-xs">
                    {a.isUnlimited ? '∞' : a.allowance}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {a.isUnlimited && (
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                      Unlimited
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-slate-400">
                  {new Date(a.lastUpdatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {approvals.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-xs text-slate-500"
                >
                  No approvals yet. Scan to create a snapshot.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

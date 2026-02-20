import React from 'react';

interface Props {
  totalApprovals: number;
  unlimitedApprovals: number;
  chain: string;
}

export const DashboardCards: React.FC<Props> = ({
  totalApprovals,
  unlimitedApprovals,
  chain
}) => {
  const riskScore = unlimitedApprovals * 5;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <p className="text-xs text-slate-400">Total approvals</p>
        <p className="mt-2 text-2xl font-semibold">{totalApprovals}</p>
        <p className="mt-1 text-xs text-slate-500">Across {chain}</p>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-300">Unlimited approvals</p>
        <p className="mt-2 text-2xl font-semibold text-amber-200">
          {unlimitedApprovals}
        </p>
        <p className="mt-1 text-xs text-amber-400">
          Approvals with effectively infinite allowance
        </p>
      </div>

      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
        <p className="text-xs text-rose-300">Aggregate risk score</p>
        <p className="mt-2 text-2xl font-semibold text-rose-200">
          {riskScore}
        </p>
        <p className="mt-1 text-xs text-rose-400">
          Simple aggregate, per-approval scoring configurable in backend
        </p>
      </div>
    </div>
  );
};

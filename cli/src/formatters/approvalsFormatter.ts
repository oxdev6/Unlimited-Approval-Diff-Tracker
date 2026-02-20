interface ApprovalRow {
  chain: string;
  tokenAddress: string;
  spenderAddress: string;
  allowance: string;
  isUnlimited: boolean;
  lastUpdatedAt: string;
}

export function printApprovals(approvals: ApprovalRow[]) {
  if (!approvals.length) {
    console.log('No approvals found.');
    return;
  }

  for (const a of approvals) {
    const unlimited = a.isUnlimited ? 'UNLIMITED' : a.allowance;
    console.log(
      `Chain: ${a.chain} | Token: ${a.tokenAddress} | Spender: ${a.spenderAddress} | Allowance: ${unlimited} | Updated: ${a.lastUpdatedAt}`
    );
  }
}

interface Item {
  chain?: string;
  tokenAddress: string;
  spenderAddress: string;
  allowance: string;
  isUnlimited: boolean;
}

interface Diff {
  newUnlimited: Item[];
  revoked: Item[];
  increased: { from: Item; to: Item }[];
  decreased: { from: Item; to: Item }[];
}

export function printDiff(diff: Diff) {
  if (diff.newUnlimited.length) {
    console.log('\n⚠ NEW UNLIMITED APPROVALS');
    for (const i of diff.newUnlimited) {
      console.log(
        `Token: ${i.tokenAddress} | Spender: ${i.spenderAddress} | Allowance: ${i.allowance}`
      );
    }
  }

  if (diff.revoked.length) {
    console.log('\n↓ REVOKED UNLIMITED APPROVALS');
    for (const i of diff.revoked) {
      console.log(`Token: ${i.tokenAddress} | Spender: ${i.spenderAddress}`);
    }
  }

  if (diff.increased.length) {
    console.log('\n↑ INCREASED ALLOWANCES');
    for (const { from, to } of diff.increased) {
      console.log(
        `Token: ${from.tokenAddress} | Spender: ${from.spenderAddress} | ${from.allowance} -> ${to.allowance}`
      );
    }
  }

  if (diff.decreased.length) {
    console.log('\n↓ DECREASED ALLOWANCES');
    for (const { from, to } of diff.decreased) {
      console.log(
        `Token: ${from.tokenAddress} | Spender: ${from.spenderAddress} | ${from.allowance} -> ${to.allowance}`
      );
    }
  }
}

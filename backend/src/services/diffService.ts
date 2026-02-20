import { prisma } from '../db';

interface SnapshotItemLike {
  tokenAddress: string;
  spenderAddress: string;
  allowance: any;
  isUnlimited: boolean;
}

export interface SnapshotDiffResult {
  newUnlimited: SnapshotItemLike[];
  revoked: SnapshotItemLike[];
  increased: { from: SnapshotItemLike; to: SnapshotItemLike }[];
  decreased: { from: SnapshotItemLike; to: SnapshotItemLike }[];
}

export class DiffService {
  async diffSnapshots(fromId: string, toId: string): Promise<SnapshotDiffResult> {
    const [from, to] = await Promise.all([
      prisma.snapshot.findUnique({ where: { id: fromId }, include: { items: true } }),
      prisma.snapshot.findUnique({ where: { id: toId }, include: { items: true } })
    ]);

    if (!from || !to) {
      throw new Error('Snapshots not found');
    }

    const key = (i: SnapshotItemLike) =>
      `${i.tokenAddress.toLowerCase()}-${i.spenderAddress.toLowerCase()}`;

    const mapA = new Map<string, SnapshotItemLike>();
    const mapB = new Map<string, SnapshotItemLike>();

    from.items.forEach((i) => mapA.set(key(i), i));
    to.items.forEach((i) => mapB.set(key(i), i));

    const newUnlimited: SnapshotItemLike[] = [];
    const revoked: SnapshotItemLike[] = [];
    const increased: { from: SnapshotItemLike; to: SnapshotItemLike }[] = [];
    const decreased: { from: SnapshotItemLike; to: SnapshotItemLike }[] = [];

    for (const [k, b] of mapB) {
      const a = mapA.get(k);
      if (!a) {
        if (b.isUnlimited) newUnlimited.push(b);
        continue;
      }

      const aVal = BigInt(a.allowance.toString());
      const bVal = BigInt(b.allowance.toString());

      if (bVal > aVal) increased.push({ from: a, to: b });
      else if (bVal < aVal) decreased.push({ from: a, to: b });

      if (!a.isUnlimited && b.isUnlimited) newUnlimited.push(b);
    }

    for (const [k, a] of mapA) {
      if (!mapB.has(k) && a.isUnlimited) {
        revoked.push(a);
      }
    }

    const result: SnapshotDiffResult = {
      newUnlimited,
      revoked,
      increased,
      decreased
    };

    await prisma.snapshotDiff.upsert({
      where: {
        fromSnapshotId_toSnapshotId: {
          fromSnapshotId: fromId,
          toSnapshotId: toId
        }
      } as any,
      update: { diffPayload: result },
      create: {
        fromSnapshotId: fromId,
        toSnapshotId: toId,
        diffPayload: result
      }
    });

    return result;
  }
}


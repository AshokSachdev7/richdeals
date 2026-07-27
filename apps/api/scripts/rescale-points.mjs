// One-off: old ledger was on the 100-points-per-rupee scale. Owner's rule is
// 1 point = ₹1, so every earn event is worth 1 point flat and per-click earning
// is gone. Re-prices the ledger, drops click rows, recomputes user balances.
// Safe to re-run: it sets absolute values, it does not increment.
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
try {
  const dropped = await p.pointEvent.deleteMany({ where: { kind: 'click' } });
  const repriced = await p.pointEvent.updateMany({ where: { points: { not: 1 } }, data: { points: 1 } });

  const sums = await p.pointEvent.groupBy({ by: ['userId'], _sum: { points: true } });
  const byUser = new Map(sums.map((s) => [s.userId, s._sum.points ?? 0]));
  const users = await p.user.findMany({ select: { id: true, points: true } });
  for (const u of users) {
    const want = byUser.get(u.id) ?? 0;
    if (want !== u.points) {
      await p.user.update({ where: { id: u.id }, data: { points: want } });
      console.log(`user ${u.id}: ${u.points} -> ${want}`);
    }
  }
  console.log(`dropped ${dropped.count} click events, repriced ${repriced.count} events, ${users.length} users checked`);
} finally {
  await p.$disconnect();
}

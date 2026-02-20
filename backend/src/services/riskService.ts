import { RiskScoreInput } from '../types';

export interface RiskScoreResult {
  score: number;
  reasons: string[];
}

const cfg = {
  unlimited: 5,
  unverifiedSpender: 2,
  dormant: 2,
  highTvl: 3
};

export class RiskService {
  compute(input: RiskScoreInput): RiskScoreResult {
    let score = 0;
    const reasons: string[] = [];

    if (input.isUnlimited) {
      score += cfg.unlimited;
      reasons.push('Unlimited allowance');
    }

    if (!input.spenderVerified) {
      score += cfg.unverifiedSpender;
      reasons.push('Spender not verified');
    }

    if ((input.dormantDays ?? 0) >= 30) {
      score += cfg.dormant;
      reasons.push('Dormant approval');
    }

    if ((input.contractTvlUsd ?? 0) >= 100_000_000) {
      score += cfg.highTvl;
      reasons.push('High TVL contract');
    }

    return { score, reasons };
  }
}

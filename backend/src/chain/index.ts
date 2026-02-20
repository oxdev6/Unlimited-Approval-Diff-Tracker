import { ChainAdapter } from './ChainAdapter';
import { ethereumAdapter } from './ethereumAdapter';
import { arbitrumAdapter } from './arbitrumAdapter';
import { ChainId } from '../types';

const adapters: Record<ChainId, ChainAdapter> = {
  ethereum: ethereumAdapter,
  arbitrum: arbitrumAdapter
};

export const getAdapter = (chain: ChainId): ChainAdapter => adapters[chain];
export const supportedChains: ChainId[] = ['ethereum', 'arbitrum'];


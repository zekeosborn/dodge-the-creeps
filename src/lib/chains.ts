import { Chain } from 'viem';

const monadRpcUrl = process.env.NEXT_PUBLIC_MONAD_RPC_URL!;

export const monad = {
  id: 20143,
  name: 'Monad',
  nativeCurrency: {
    name: 'DMON',
    symbol: 'DMON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [monadRpcUrl],
    },
  },
} as const satisfies Chain;

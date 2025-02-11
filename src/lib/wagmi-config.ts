import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { monad } from './chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const wagmiConfig = getDefaultConfig({
  appName: 'Dodge The Creeps!',
  projectId,
  chains: [monad],
  ssr: true,
});

export default wagmiConfig;

'use client';

import wagmiConfig from '@/lib/wagmi-config';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cookieToInitialState, WagmiProvider } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';

interface Props {
  children: React.ReactNode;
  cookies: string | null;
}

const queryClient = new QueryClient();

export default function Providers({ children, cookies }: Props) {
  const initialState = cookieToInitialState(wagmiConfig, cookies);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={lightTheme({
            overlayBlur: 'small',
            borderRadius: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

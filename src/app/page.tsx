'use client';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useRef } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import abi from '../contracts/abi';

const contractAddress = '0xC935f3FCcc4BA8841144657f394CAf7Ef61b74bD';

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const godotRef = useRef<GodotIframe>(null);

  useEffect(() => {
    const godotWindow = godotRef.current?.contentWindow;

    if (godotWindow) {
      godotWindow.connectWallet = () => openConnectModal && openConnectModal();
      godotWindow.record = (score) =>
        writeContract({
          address: contractAddress,
          abi,
          functionName: 'createRecord',
          args: [score],
        });
    }

    return () => {
      if (godotWindow) {
        delete godotWindow.connectWallet;
        delete godotWindow.record;
      }
    };
  }, []);

  useEffect(() => {
    const godotWindow = godotRef.current?.contentWindow;

    if (isConnected && godotWindow) {
      if (godotWindow.onConnect) godotWindow.onConnect();
    }
  }, [isConnected]);

  return (
    <iframe
      ref={godotRef}
      src="/dodge-the-creeps/index.html"
      className="h-screen w-full"
    />
  );
}

type GodotWindow = Window & {
  onConnect?: () => void;
  connectWallet?: () => void;
  record?: (score: number) => void;
};

type GodotIframe = HTMLIFrameElement & {
  contentWindow: GodotWindow | null | undefined;
};

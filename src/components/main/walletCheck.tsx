"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { isVeChainWalletAvailable, getWalletType } from '@/utils/vechain';

export function WalletCheck() {
  const [walletType, setWalletType] = useState<string>('None');

  useEffect(() => {
    setWalletType(getWalletType());
  }, []);

  if (walletType !== 'None') {
    return <p>{walletType} wallet detected. You're ready to connect!</p>;
  }

  return (
    <div>
      <p>No compatible VeChain wallet detected. We recommend installing VeWorld.</p>
      <Button onClick={() => window.open('https://www.veworld.net/', '_blank')}>
        Get VeWorld Wallet
      </Button>
      <p className="mt-2">Alternatively, you can use other Connex-compatible wallets like Sync2 or VeChainThor Wallet.</p>
    </div>
  );
}

'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";
import ConnectWallet from "./connectWallet";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "@/lib/utils";
import { ConnectWalletButton } from "../ui/connectWalletButton";

export function Navbar({ userName }: { userName: string | undefined }) {
  const router = useRouter();
  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

  console.log("host", host);


  const sdkOptions = {
    logging: { developerMode: true },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: "http://localhost:3000", // using the host constant defined above
    },
  };

  
  const handleLogout = async () => {
    await logout();
  }

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Criminal Scenes</span>
            </div>
          </div>
          <div className="flex items-center">
            {!userName ? (
              <Button onClick={() => router.push('/auth/register')} className="mr-2">Login</Button>
            ) : (
              <div className="flex gap-2">
                <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
                 <ConnectWalletButton />
                </MetaMaskProvider>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

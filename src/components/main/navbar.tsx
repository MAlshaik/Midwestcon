'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/server/actions/auth";
import ConnectWallet from "./connectWallet";

export function Navbar({ userName }: { userName: string | undefined }) {
  const router = useRouter();

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
              <>
                <ConnectWallet />
                <Button onClick={() => logout()} className="ml-2">Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

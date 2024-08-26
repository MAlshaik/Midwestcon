"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Landing({ userName } : { userName: string }) {
    const router = useRouter();

    return (
      <main className="flex flex-col justify-center items-center">
        <div className="w-screen max-w-[1024px] px-4 py-16">
        <div className="py-28 flex flex-col items-center justify-center">

          {!userName ? (
            <Button onClick={() => router.push('/auth/register')}>Login</Button>
          ) : (
          <>
            <h1 className="text-4xl font-bold">Welcome {userName}</h1>
            <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
          </>
          )}

          </div>
          </div>
      </main>
    );
}

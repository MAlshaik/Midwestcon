import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

const DAppKitProviderWrapper = dynamic(
  () => import('./DAppKitProviderWrapper'),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>
        <DAppKitProviderWrapper>
          {children}
        <Toaster />
        </DAppKitProviderWrapper>
      </body>
    </html>
  );
}

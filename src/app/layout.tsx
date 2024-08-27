import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

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
      <body className={inter.className}>
        <DAppKitProviderWrapper>
          {children}
        </DAppKitProviderWrapper>
      </body>
    </html>
  );
}

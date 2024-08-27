declare global {
  interface Window {
    vechain?: {
      thor?: {
        enable?: () => Promise<string[]>;
        // Add other potential properties here
      };
    };
    connex?: {
      vendor: {
        sign(type: 'cert', payload: any): {
          request: () => Promise<{
            annex: { signer: string }
          }>;
        };
      };
    };
  }
}

export async function connectWallet(): Promise<string | null> {
  if (typeof window.vechain !== 'undefined' && window.vechain.thor && typeof window.vechain.thor.enable === 'function') {
    // VeWorld is available and has the expected structure
    try {
      const accounts = await window.vechain.thor.enable();
      return accounts[0] || null; // Return the first account or null if no accounts
    } catch (error) {
      console.error('Failed to connect VeWorld wallet:', error);
      return null;
    }
  } else if (typeof window.connex !== 'undefined') {
    // Fallback to Connex-compatible wallets
    try {
      const addressInfo = await window.connex.vendor.sign('cert', {
        purpose: 'identification',
        payload: {
          type: 'text',
          content: 'Login to MyApp'
        }
      }).request();
      
      return addressInfo.annex.signer;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return null;
    }
  } else {
    console.error('No compatible VeChain wallet found. Please install VeWorld or another VeChain-compatible wallet.');
    return null;
  }
}

export function isVeChainWalletAvailable(): boolean {
  return typeof window !== 'undefined' && (
    (typeof window.vechain !== 'undefined' && window.vechain.thor && typeof window.vechain.thor.enable === 'function') ||
    typeof window.connex !== 'undefined'
  );
}

export function getWalletType(): string {
  if (typeof window.vechain !== 'undefined' && window.vechain.thor && typeof window.vechain.thor.enable === 'function') {
    return 'VeWorld';
  } else if (typeof window.connex !== 'undefined') {
    return 'Connex-compatible';
  } else {
    return 'None';
  }
}

import { NextResponse } from 'next/server';
import { sendReward } from '@/utils/rewardWallet';

export async function POST(req: Request) {
  try {
    const { recipientAddress } = await req.json();
    if (!recipientAddress) {
      return NextResponse.json({ error: 'Recipient address is required' }, { status: 400 });
    }

    console.log(`from api route Sending reward to ${recipientAddress}`);
    const REWARD_AMOUNT = '0.0001'; // Define reward amount in ETH
    const txHash = await sendReward(recipientAddress, REWARD_AMOUNT);

    return NextResponse.json({ txHash });
  } catch (error) {
    console.error('Error in reward API:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

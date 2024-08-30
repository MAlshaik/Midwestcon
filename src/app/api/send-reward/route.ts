import { NextResponse } from 'next/server';
import { sendRewardTransaction } from '@/server/actions/reward';

export async function POST(req: Request) {
  try {
    const { recipientAddress } = await req.json();
    if (!recipientAddress) {
      return NextResponse.json({ error: 'Recipient address is required' }, { status: 400 });
    }
    const txid = await sendRewardTransaction(recipientAddress);
    return NextResponse.json({ txid });
  } catch (error) {
    console.error('Error in send-reward API route:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to send reward', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to send reward', details: 'Unknown error' }, { status: 500 });
    }
  }
}

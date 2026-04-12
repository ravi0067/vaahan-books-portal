import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { planType, paymentId } = await req.json();

    if (!paymentId || !planType) {
      return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
    }

    // Generate License Key: VB-2026-XXXX-XXXX-XXXX
    const generateSegment = () => crypto.randomBytes(2).toString('hex').toUpperCase();
    const licenseKey = `VB-2026-${generateSegment()}-${generateSegment()}-${generateSegment()}`;

    // Here we would normally save this to Supabase "License" table
    // For demo purposes, we return it directly

    return NextResponse.json({
      success: true,
      licenseKey,
      plan: planType,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      downloadUrl: "https://github.com/ravi0067/vaahan-erp/releases/latest/download/VaahanBooks-Setup.exe"
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to generate license" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

const FEATURE_KEYS = ['simulateurs_visible'];

export async function GET() {
  try {
    const settings = await prisma.globalSetting.findMany({
      where: { key: { in: FEATURE_KEYS } },
    });
    const result = {};
    for (const s of settings) {
      try { result[s.key] = JSON.parse(s.value); } catch { result[s.key] = s.value; }
    }
    // Default to visible if not set
    if (result.simulateurs_visible === undefined) result.simulateurs_visible = true;
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ simulateurs_visible: true });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const settings = await prisma.globalSetting.findMany();
  const obj = {};
  for (const s of settings) {
    try {
      obj[s.key] = JSON.parse(s.value);
    } catch {
      obj[s.key] = s.value;
    }
  }

  return NextResponse.json({ settings: obj });
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const data = await request.json();

  for (const [key, value] of Object.entries(data)) {
    await prisma.globalSetting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
  }

  return NextResponse.json({ success: true });
}

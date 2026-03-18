import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const rows = await prisma.globalSetting.findMany();
    const settings = {};
    for (const row of rows) {
      try { settings[row.key] = JSON.parse(row.value); } catch { settings[row.key] = row.value; }
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la récupération des paramètres' }, { status: 500 });
  }
}

export async function PUT(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const results = [];

    for (const [key, value] of Object.entries(body)) {
      const row = await prisma.globalSetting.upsert({
        where: { key },
        update: { value: JSON.stringify(value) },
        create: { key, value: JSON.stringify(value) },
      });
      results.push(row);
    }

    return NextResponse.json({ success: true, updated: results.length });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}

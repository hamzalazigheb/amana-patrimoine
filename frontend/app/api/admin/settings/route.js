import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

// Allowlist of keys that can be written via the admin settings panel
const ALLOWED_SETTING_KEYS = new Set([
  'site_name', 'site_description',
  'hero_title', 'hero_subtitle', 'hero_cta_text', 'hero_cta_link', 'hero_image',
  'footer_description',
  'contact_phone', 'contact_email', 'contact_address',
  'calendly_url',
  'simulateurs_visible',
]);

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const settings = await prisma.globalSetting.findMany();
    const obj = {};
    for (const s of settings) {
      try { obj[s.key] = JSON.parse(s.value); } catch { obj[s.key] = s.value; }
    }
    return NextResponse.json({ settings: obj });
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la récupération des paramètres' }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const data = await request.json();

    const unknownKeys = Object.keys(data).filter((k) => !ALLOWED_SETTING_KEYS.has(k));
    if (unknownKeys.length > 0) {
      return NextResponse.json(
        { error: `Clés non autorisées : ${unknownKeys.join(', ')}` },
        { status: 400 }
      );
    }

    for (const [key, value] of Object.entries(data)) {
      await prisma.globalSetting.upsert({
        where: { key },
        update: { value: JSON.stringify(value) },
        create: { key, value: JSON.stringify(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour des paramètres' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { rateLimit } from '@/lib/rate-limit';
import { getWhitepapersPage, findPaperById } from '@/lib/whitepapers';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-().]{7,20}$/;

function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.website || body.address_confirm) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(request);
    const rl = rateLimit(`wp:${ip}`, 5, 15 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, errors: { _global: 'Trop de tentatives. Réessayez dans quelques minutes.' } },
        { status: 429 }
      );
    }

    const { firstName, lastName, email, phone, project, paperIds, newsletter, consent } = body;
    const errors = {};

    if (!firstName?.trim() || firstName.trim().length < 2) errors.firstName = 'Prénom invalide.';
    if (!lastName?.trim() || lastName.trim().length < 2) errors.lastName = 'Nom invalide.';
    if (!email?.trim() || !EMAIL_RE.test(email.trim())) errors.email = 'E-mail invalide.';
    if (!phone?.trim() || !PHONE_RE.test(phone.trim())) errors.phone = 'Téléphone invalide.';
    if (!Array.isArray(paperIds) || paperIds.length === 0) errors.paperIds = 'Sélectionnez au moins un livre blanc.';
    if (!consent) errors.consent = 'Consentement requis.';

    const cms = await getWhitepapersPage();
    const wpContent = cms?.whitepapers;
    if (!wpContent?.items?.length) {
      return NextResponse.json(
        { success: false, errors: { _global: 'Configuration indisponible.' } },
        { status: 503 }
      );
    }

    const validIds = paperIds.filter((id) => findPaperById(wpContent, id));
    if (validIds.length === 0) {
      errors.paperIds = 'Sélection invalide.';
    }

    if (Object.keys(errors).length) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    await prisma.whitePaperDownload.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        project: project?.trim() || null,
        paperIds: JSON.stringify(validIds),
        newsletter: !!newsletter,
        expiresAt,
        ip,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Votre demande a bien été enregistrée. Le guide vous sera envoyé par e-mail.',
    });
  } catch (err) {
    console.error('[Whitepapers API]', err);
    return NextResponse.json(
      { success: false, errors: { _global: 'Une erreur est survenue.' } },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\+\-\(\)\.]{7,20}$/;

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

    // ── Honeypot check — bots fill hidden fields, humans don't ──
    if (body.website || body.address_confirm) {
      // Silent success — don't reveal the trap to bots
      return NextResponse.json({ success: true });
    }

    // ── Rate limiting via simple timestamp check (basic) ──
    const { name, email, phone, subject, message } = body;

    // ── Server-side validation ──
    const errors = {};

    if (!name || name.trim().length < 2) {
      errors.name = 'Veuillez indiquer votre prénom et nom (min. 2 caractères).';
    }
    if (name && name.trim().length > 100) {
      errors.name = 'Nom trop long (100 caractères max).';
    }

    if (!email || !EMAIL_RE.test(email.trim())) {
      errors.email = 'Adresse email invalide.';
    }

    if (phone && phone.trim() && !PHONE_RE.test(phone.trim())) {
      errors.phone = 'Numéro de téléphone invalide.';
    }

    if (!message || message.trim().length < 20) {
      errors.message = 'Votre message doit contenir au moins 20 caractères.';
    }
    if (message && message.trim().length > 2000) {
      errors.message = 'Message trop long (2000 caractères max).';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ── Save to DB ──
    await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
        ip: getClientIp(request),
        status: 'new',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API]', err);
    return NextResponse.json(
      { success: false, errors: { _global: 'Une erreur est survenue. Veuillez réessayer.' } },
      { status: 500 }
    );
  }
}

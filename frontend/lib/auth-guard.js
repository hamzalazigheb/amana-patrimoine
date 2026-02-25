import { getSession } from './auth';
import { NextResponse } from 'next/server';

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    return { error: NextResponse.json({ error: 'Non autorisé' }, { status: 401 }), session: null };
  }
  return { error: null, session };
}

import { NextResponse } from 'next/server';

/**
 * Verify a HS256 JWT using the Web Crypto API (Edge-compatible).
 * Returns the decoded payload or null if invalid/expired.
 */
async function verifyJWT(token) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts;

    // Import the secret key for HMAC-SHA256 verification
    const keyData = new TextEncoder().encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Decode the signature from base64url
    const sig = Uint8Array.from(
      atob(sigB64.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0)
    );

    // Verify signature over "header.payload"
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const valid = await crypto.subtle.verify('HMAC', cryptoKey, sig, data);
    if (!valid) return null;

    // Decode payload
    const payload = JSON.parse(
      atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
    );

    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('amana_admin_token')?.value;

    // Redirect immediately if no cookie
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verify the JWT signature and expiry — reject forged/expired tokens
    const payload = await verifyJWT(token);
    if (!payload || payload.role !== 'admin') {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      // Clear the invalid cookie
      response.cookies.set('amana_admin_token', '', { maxAge: 0, path: '/' });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

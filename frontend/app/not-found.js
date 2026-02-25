import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body, Inter, sans-serif)', padding: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-heading, Playfair Display, serif)', fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e2d' }}>
        Page introuvable
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', textAlign: 'center' }}>
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#2c3e2d', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

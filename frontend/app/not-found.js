import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Page introuvable — Amana Patrimoine',
  description: 'Cette page n\'existe pas ou a été déplacée.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>

          <p className="section-label" style={{ marginBottom: '1.5rem' }}>Erreur 404</p>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--color-forest)',
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            Cette page est introuvable
          </h1>

          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-muted)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            lineHeight: 'var(--leading-relaxed)',
          }}>
            La page que vous cherchez a peut-être été déplacée, renommée ou supprimée.
            Retournez à l&apos;accueil ou consultez nos services.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary" style={{ background: 'var(--color-forest)', color: '#fff' }}>
              Retour à l&apos;accueil
            </Link>
            <Link href="/bilan-patrimonial" className="btn btn-secondary">
              Bilan patrimonial gratuit
            </Link>
          </div>

          <div style={{
            marginTop: '4rem',
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { href: '/finance-islamique', label: 'Finance islamique' },
              { href: '/investissement', label: 'Investissement' },
              { href: '/retraite', label: 'Retraite' },
              { href: '/succession', label: 'Succession' },
              { href: '/blog', label: 'Blog' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-brass-dark)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

import ContactForm from '../../components/ContactForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact — Amana Patrimoine | Conseil en Gestion de Patrimoine',
  description: 'Contactez le cabinet Amana Patrimoine. Bilan patrimonial gratuit, conseil en finance islamique, investissement et retraite. Paris et Île-de-France.',
  keywords: 'contact amana patrimoine, cabinet patrimoine paris, rendez-vous bilan patrimonial, conseil finance islamique',
  alternates: { canonical: 'https://amana-patrimoine.fr/contact' },
  openGraph: {
    title: 'Contact — Amana Patrimoine',
    description: 'Prenez contact avec nos experts en gestion de patrimoine et finance islamique.',
    url: 'https://amana-patrimoine.fr/contact',
  },
};

const contactDetails = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.24 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
    label: 'Téléphone',
    value: '+33 (0)1 89 70 00 00',
    href: 'tel:+33189700000',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'contact@amana-patrimoine.fr',
    href: 'mailto:contact@amana-patrimoine.fr',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Adresse',
    value: '60 rue François Ier, 75008 Paris',
    href: 'https://maps.google.com/?q=60+rue+Francois+Ier+75008+Paris',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Horaires',
    value: 'Lun–Ven, 9h–18h',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── Page hero ── */}
        <section style={{
          background: 'var(--color-olive)',
          color: '#fff',
          padding: 'clamp(3rem, 8vw, 5rem) 0 clamp(2rem, 5vw, 3rem)',
          textAlign: 'center',
        }}>
          <div className="container">
            <p className="section-label" style={{ color: 'var(--color-brass-light)', marginBottom: '0.75rem' }}>Contact</p>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#fff',
            }}>
              Parlons de votre patrimoine
            </h1>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              Premier rendez-vous gratuit, sans engagement. Répondez à notre formulaire ou appelez-nous directement.
            </p>
          </div>
        </section>

        {/* ── Content grid ── */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) 0', background: 'var(--color-ivory)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)',
              gap: '2.5rem',
              alignItems: 'start',
            }}
              className="contact-page-grid"
            >
              {/* ── Left: infos ── */}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  color: 'var(--color-forest)',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}>
                  Informations de contact
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2rem' }}>
                  {contactDetails.map(({ icon, label, value, href }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '10px',
                        background: 'var(--color-white)', border: '1px solid var(--color-ivory-dark)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, color: 'var(--color-forest)',
                      }}>
                        {icon}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                          {label}
                        </p>
                        {href ? (
                          <a href={href} style={{ fontSize: '0.92rem', color: 'var(--color-text)', textDecoration: 'none' }}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontSize: '0.92rem', color: 'var(--color-text)', margin: 0 }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calendly CTA */}
                <div style={{
                  background: 'var(--color-olive)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  color: '#fff',
                }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brass-light)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Rendez-vous en ligne
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '1.1rem' }}>
                    Réservez directement un créneau avec un conseiller. Présentiel à Paris ou visioconférence.
                  </p>
                  <a
                    href="https://calendly.com/amana-patrimoine/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ display: 'inline-block', fontSize: '0.875rem' }}
                  >
                    Réserver un créneau →
                  </a>
                </div>
              </div>

              {/* ── Right: form ── */}
              <div>
                <ContactForm
                  title="Envoyez-nous un message"
                  description="Notre équipe vous répond sous 24 heures ouvrées."
                />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

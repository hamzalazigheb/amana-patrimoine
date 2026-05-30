import Link from 'next/link';
import Image from 'next/image';

export default function LandingFooter({ urls }) {
    const columns = [
        {
            h: 'Offres',
            items: [
                { label: 'Amana Essentiel', href: '#offres' },
                { label: 'Amana Patrimoniale', href: '#offres' },
                { label: 'Amana Gestion privée', href: '#offres' },
                { label: 'Comparer', href: '#offres' },
            ],
        },
        {
            h: 'Cabinet',
            items: [
                { label: 'À propos', href: '/qui-sommes-nous' },
                { label: 'Notre méthode', href: '/strategie' },
                { label: 'Finance islamique', href: urls.financeUrl },
                { label: 'Contact', href: urls.contactUrl },
            ],
        },
        {
            h: 'Légal',
            items: [
                { label: 'ORIAS 25009552', href: 'https://www.orias.fr', external: true },
                { label: 'ANACOFI CIF', href: urls.mentionsUrl },
                { label: 'Mentions légales', href: urls.mentionsUrl },
                { label: 'RGPD', href: '/politique-confidentialite' },
            ],
        },
    ];

    const year = new Date().getFullYear();

    return (
        <footer className="lp-footer" role="contentinfo">
            <div className="lp-container">
                <div className="lp-footer__main">
                    <div className="lp-footer__brand">
                        <Link href="/platform" className="lp-footer__logo">
                            <Image
                                src="/1amanap-patrimoine.svg"
                                alt="Amana Patrimoine"
                                width={160}
                                height={48}
                                className="lp-footer__logo-img"
                            />
                        </Link>
                        <p className="lp-footer__desc">
                            Cabinet de conseil en gestion de patrimoine, spécialisé en finance
                            islamique. Sélection des supports en partenariat avec
                            Sakina Consulting. Paris, France.
                        </p>
                        <a href={`mailto:${urls.contactEmail}`} className="lp-footer__email">
                            {urls.contactEmail}
                        </a>
                    </div>

                    <div className="lp-footer__columns">
                        {columns.map((col) => (
                            <div key={col.h} className="lp-footer__col">
                                <h3 className="lp-footer__heading">{col.h}</h3>
                                <ul className="lp-footer__list">
                                    {col.items.map((item) => (
                                        <li key={item.label}>
                                            {item.external ? (
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link href={item.href}>{item.label}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lp-footer__bottom">
                    <p className="lp-footer__copy">
                        © {year} Amana Patrimoine SAS · Tous droits réservés.
                    </p>
                    <p className="lp-footer__badges">
                        <span>ORIAS 25009552</span>
                        <span aria-hidden="true">·</span>
                        <span>CIF · COBSP · IAS</span>
                        <span aria-hidden="true">·</span>
                        <span>Anacofi-Courtage</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

'use client';

const partners = [
    { name: 'Suravenir', logo: 'SRV' },
    { name: 'Vie Plus', logo: '/logo-vieplus.png', isImage: true },
    { name: 'HSBC', logo: 'HSBC' },
    { name: 'Franklin Templeton', logo: 'FT' },
    { name: 'Norma Capital', logo: 'NC' },
    { name: 'SBSC', logo: '/SBSC.avif', isImage: true }
];

export default function PartnersSection() {
    return (
        <section className="partners-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-label">Nos Partenaires</span>
                    <h2 className="section-title">Des partenariats stratégiques</h2>
                    <p className="section-desc">
                        Grâce à nos alliances privilégiées avec des institutions financières de premier plan,
                        bénéficiez d'un accès exclusif aux meilleures opportunités d'investissement.
                    </p>
                </div>

                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-item">
                            <div className="partner-logo">
                                {partner.isImage ? (
                                    <img src={partner.logo} alt={partner.name} className="partner-img" />
                                ) : (
                                    partner.logo
                                )}
                            </div>
                            <span className="partner-name">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

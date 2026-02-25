'use client';

const partners = [
    { name: 'SURAVENIR', logo: '/logo-2025.svg' },
    { name: 'VIE PLUS', logo: '/logo-vieplus.png' },
    { name: 'HSBC', logo: '/hsbc-logo-200x25.svg' },
    { name: 'FRANKLIN TEMPLETON', logo: '/FT_logo_pos_RGB@2x.png' },
    { name: 'COMGEST', logo: '/logo--color.svg' },
    { name: 'NORMA CAPITAL', logo: '/norma.png' },
    { name: 'SBSC', logo: '/SBSC.avif' }
];

export default function PartnersSection() {
    return (
        <section className="partners-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Des partenariats stratégiques avec les acteurs incontournables du secteur</h2>
                    <p className="section-desc">
                        Nous travaillons avec des établissements financiers et patrimoniaux de premier plan : Suravenir, Vie Plus, HSBC, Franklin Templeton, Comgest, Norma Capital, SBSC. Ces partenariats nous permettent de vous proposer des solutions performantes, sans pour autant compromettre notre indépendance de conseil.
                    </p>
                </div>

                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-item">
                            <div className="partner-logo-wrapper">
                                <img src={partner.logo} alt={partner.name} className="partner-img" />
                            </div>
                            <span className="partner-name">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import TrustIndicators from '../../components/TrustIndicators';
import PartnersSection from '../../components/PartnersSection';
import Testimonials from '../../components/Testimonials';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Qui sommes-nous | Amana Patrimoine',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export default function QuiSommesNousPage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Lorem Ipsum"
                    title="Lorem ipsum dolor sit amet consectetur"
                    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
                    image="/hero-nature.png"
                />

                {/* Statistiques clés */}
                <section className="content-section content-section-navy">
                    <div className="container">
                        <div className="section-header text-center" style={{ marginBottom: 'var(--space-24)' }}>
                            <span className="section-label" style={{ color: 'var(--color-brass)' }}>Lorem Ipsum</span>
                            <h2 className="section-title" style={{ color: 'var(--color-white)' }}>Lorem ipsum dolor sit</h2>
                        </div>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(4, 1fr)', 
                            gap: 'var(--space-12)',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-4xl)', 
                                    color: 'var(--color-brass)',
                                    marginBottom: 'var(--space-4)'
                                }}>15+</div>
                                <div style={{ 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>Lorem ipsum</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-4xl)', 
                                    color: 'var(--color-brass)',
                                    marginBottom: 'var(--space-4)'
                                }}>100%</div>
                                <div style={{ 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>Dolor sit</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-4xl)', 
                                    color: 'var(--color-brass)',
                                    marginBottom: 'var(--space-4)'
                                }}>500+</div>
                                <div style={{ 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>Amet consectetur</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-4xl)', 
                                    color: 'var(--color-brass)',
                                    marginBottom: 'var(--space-4)'
                                }}>0</div>
                                <div style={{ 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}>Adipiscing elit</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notre Histoire */}
                <ContentSection
                    label="Lorem Ipsum"
                    title="Lorem ipsum dolor sit amet consectetur"
                    intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
                    image="/hero-bg.png"
                    imageSide="right"
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat.
                    </p>
                    <div className="highlight-box">
                        <p>« Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. »</p>
                    </div>
                </ContentSection>

                {/* Nos Valeurs - Présentation professionnelle */}
                <ContentSection
                    background="beige"
                    label="Lorem Ipsum"
                    title="Lorem ipsum dolor sit amet"
                >
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: 'var(--space-12)',
                        marginTop: 'var(--space-12)'
                    }}>
                        <div style={{ 
                            padding: 'var(--space-8)', 
                            borderLeft: '3px solid var(--color-brass)',
                            backgroundColor: 'var(--color-white)'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--space-4)',
                                marginBottom: 'var(--space-4)'
                            }}>
                                <div style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    backgroundColor: 'var(--color-forest)',
                                    color: 'var(--color-white)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-xl)'
                                }}>01</div>
                                <h3 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-xl)',
                                    color: 'var(--color-forest)',
                                    margin: 0
                                }}>Lorem Ipsum Dolor</h3>
                            </div>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                        </div>

                        <div style={{ 
                            padding: 'var(--space-8)', 
                            borderLeft: '3px solid var(--color-brass)',
                            backgroundColor: 'var(--color-white)'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--space-4)',
                                marginBottom: 'var(--space-4)'
                            }}>
                                <div style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    backgroundColor: 'var(--color-forest)',
                                    color: 'var(--color-white)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-xl)'
                                }}>02</div>
                                <h3 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-xl)',
                                    color: 'var(--color-forest)',
                                    margin: 0
                                }}>Sit Amet Consectetur</h3>
                            </div>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                        </div>

                        <div style={{ 
                            padding: 'var(--space-8)', 
                            borderLeft: '3px solid var(--color-brass)',
                            backgroundColor: 'var(--color-white)'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--space-4)',
                                marginBottom: 'var(--space-4)'
                            }}>
                                <div style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    backgroundColor: 'var(--color-forest)',
                                    color: 'var(--color-white)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-xl)'
                                }}>03</div>
                                <h3 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-xl)',
                                    color: 'var(--color-forest)',
                                    margin: 0
                                }}>Adipiscing Elit Sed</h3>
                            </div>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                        </div>

                        <div style={{ 
                            padding: 'var(--space-8)', 
                            borderLeft: '3px solid var(--color-brass)',
                            backgroundColor: 'var(--color-white)'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--space-4)',
                                marginBottom: 'var(--space-4)'
                            }}>
                                <div style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    backgroundColor: 'var(--color-forest)',
                                    color: 'var(--color-white)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 'var(--radius-sm)',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-xl)'
                                }}>04</div>
                                <h3 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-xl)',
                                    color: 'var(--color-forest)',
                                    margin: 0
                                }}>Eiusmod Tempor</h3>
                            </div>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                        </div>
                    </div>
                </ContentSection>

                {/* Trust Indicators */}
                <TrustIndicators />

                {/* Notre Équipe - Section professionnelle */}
                <ContentSection
                    label="Lorem Ipsum"
                    title="Lorem ipsum dolor sit amet consectetur"
                    intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                >
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: 'var(--space-8)',
                        marginTop: 'var(--space-12)'
                    }}>
                        <div style={{ 
                            padding: 'var(--space-8)', 
                            backgroundColor: 'var(--color-white)',
                            border: '1px solid var(--color-ivory-dark)',
                            textAlign: 'center'
                        }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                backgroundColor: 'var(--color-forest)',
                                borderRadius: '50%',
                                margin: '0 auto var(--space-6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-white)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-2xl)'
                            }}>LI</div>
                            <h4 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                fontSize: 'var(--text-lg)',
                                color: 'var(--color-forest)',
                                marginBottom: 'var(--space-2)'
                            }}>Lorem Ipsum</h4>
                            <p style={{ 
                                fontSize: 'var(--text-xs)', 
                                color: 'var(--color-text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: 'var(--space-4)'
                            }}>Dolor Sit</p>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                            </p>
                        </div>

                        <div style={{ 
                            padding: 'var(--space-8)', 
                            backgroundColor: 'var(--color-white)',
                            border: '1px solid var(--color-ivory-dark)',
                            textAlign: 'center'
                        }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                backgroundColor: 'var(--color-forest)',
                                borderRadius: '50%',
                                margin: '0 auto var(--space-6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-white)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-2xl)'
                            }}>AM</div>
                            <h4 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                fontSize: 'var(--text-lg)',
                                color: 'var(--color-forest)',
                                marginBottom: 'var(--space-2)'
                            }}>Amet Consectetur</h4>
                            <p style={{ 
                                fontSize: 'var(--text-xs)', 
                                color: 'var(--color-text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: 'var(--space-4)'
                            }}>Adipiscing</p>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                            </p>
                        </div>

                        <div style={{ 
                            padding: 'var(--space-8)', 
                            backgroundColor: 'var(--color-white)',
                            border: '1px solid var(--color-ivory-dark)',
                            textAlign: 'center'
                        }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                backgroundColor: 'var(--color-forest)',
                                borderRadius: '50%',
                                margin: '0 auto var(--space-6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-white)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'var(--text-2xl)'
                            }}>EL</div>
                            <h4 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                fontSize: 'var(--text-lg)',
                                color: 'var(--color-forest)',
                                marginBottom: 'var(--space-2)'
                            }}>Elit Sed Do</h4>
                            <p style={{ 
                                fontSize: 'var(--text-xs)', 
                                color: 'var(--color-text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: 'var(--space-4)'
                            }}>Eiusmod</p>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                            </p>
                        </div>
                    </div>
                </ContentSection>

                {/* Partenaires */}
                <PartnersSection />

                {/* Témoignages */}
                <Testimonials />

                {/* Notre Engagement */}
                <ContentSection
                    background="beige"
                    label="Lorem Ipsum"
                    title="Lorem ipsum dolor sit amet"
                >
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: 'var(--space-12)',
                        marginTop: 'var(--space-12)'
                    }}>
                        <div>
                            <h3 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                fontSize: 'var(--text-xl)',
                                color: 'var(--color-forest)',
                                marginBottom: 'var(--space-4)'
                            }}>Lorem Ipsum Dolor</h3>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                marginBottom: 'var(--space-6)'
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ 
                                fontFamily: 'var(--font-heading)', 
                                fontSize: 'var(--text-xl)',
                                color: 'var(--color-forest)',
                                marginBottom: 'var(--space-4)'
                            }}>Sit Amet Consectetur</h3>
                            <p style={{ 
                                fontSize: 'var(--text-sm)', 
                                color: 'var(--color-text-muted)',
                                lineHeight: '1.7',
                                marginBottom: 'var(--space-6)'
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                            </p>
                        </div>
                    </div>
                </ContentSection>

                <CTASection />
            </main>
            <Footer />
        </>
    );
}

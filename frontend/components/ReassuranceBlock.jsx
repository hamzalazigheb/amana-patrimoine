'use client';

export default function ReassuranceBlock() {
    return (
        <section className="reassurance-section">
            <div className="container">
                <div className="reassurance-grid">
                    <div className="reassurance-item">
                        <div className="reassurance-icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M12 8v4" />
                                <path d="M12 16h.01" />
                            </svg>
                        </div>
                        <h3>Indépendance Totale</h3>
                        <p>Absence de lien avec les groupes bancaires pour une objectivité absolue.</p>
                    </div>
                    <div className="reassurance-item">
                        <div className="reassurance-icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 12l2 2 4-4" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </div>
                        <h3>Conformité Shariah</h3>
                        <p>Placements audités par un comité d'experts en finance éthique musulmane.</p>
                    </div>
                    <div className="reassurance-item">
                        <div className="reassurance-icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h3>Secret Bancaire</h3>
                        <p>Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

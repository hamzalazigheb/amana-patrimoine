'use client';

export default function EnfantsSimulator() {
    // Simulation 1: Initial 1000€ + 100€/month, 18 years, 5% return
    const calculateScenario1 = () => {
        const initial = 1000;
        const monthly = 100;
        const years = 18;
        const rate = 0.05;
        
        const monthlyRate = rate / 12;
        const months = years * 12;
        
        // Future value of monthly contributions
        const monthlyContributions = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        
        // Future value of initial investment
        const initialGrowth = initial * Math.pow(1 + monthlyRate, months);
        
        const total = Math.round(initialGrowth + monthlyContributions);
        const totalPaid = initial + (monthly * 12 * years);
        const profit = total - totalPaid;
        
        return { total, totalPaid, profit };
    };

    // Simulation 2: Initial 1000€ + 150€/month, 18 years, 8% return
    const calculateScenario2 = () => {
        const initial = 1000;
        const monthly = 150;
        const years = 18;
        const rate = 0.08;
        
        const monthlyRate = rate / 12;
        const months = years * 12;
        
        // Future value of monthly contributions
        const monthlyContributions = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        
        // Future value of initial investment
        const initialGrowth = initial * Math.pow(1 + monthlyRate, months);
        
        const total = Math.round(initialGrowth + monthlyContributions);
        const totalPaid = initial + (monthly * 12 * years);
        const profit = total - totalPaid;
        
        return { total, totalPaid, profit };
    };

    const scenario1 = calculateScenario1();
    const scenario2 = calculateScenario2();

    return (
        <div className="enfants-simulator">
            <div className="simulator-scenarios-grid">
                {/* Simulation 1 */}
                <div className="scenario-card">
                    <h3 className="scenario-title">Simulation 1</h3>
                    <p className="scenario-subtitle">Investissement peu risqué</p>
                    
                    <div className="scenario-params">
                        <div className="scenario-param">
                            <span className="param-label">Investissement initial</span>
                            <span className="param-value">1&nbsp;000&nbsp;€</span>
                        </div>
                        <div className="scenario-param">
                            <span className="param-label">Épargne mensuelle</span>
                            <span className="param-value">100&nbsp;€</span>
                        </div>
                        <div className="scenario-param">
                            <span className="param-label">Durée d'épargne</span>
                            <span className="param-value">18&nbsp;ans</span>
                        </div>
                        <div className="scenario-param">
                            <span className="param-label">Rendement net</span>
                            <span className="param-value">5%</span>
                        </div>
                    </div>

                    <div className="scenario-results">
                        <div className="scenario-result-item highlight">
                            <span className="result-label">Capital final</span>
                            <span className="result-value">{scenario1.total.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}&nbsp;€</span>
                        </div>
                        <div className="scenario-result-item">
                            <span className="result-label">Dont versements cumulés</span>
                            <span className="result-value">{scenario1.totalPaid.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}&nbsp;€</span>
                        </div>
                        <div className="scenario-result-item success">
                            <span className="result-label">Dont bénéfice lié à l'investissement</span>
                            <span className="result-value">{scenario1.profit.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}&nbsp;€</span>
                        </div>
                    </div>
                </div>

                {/* Simulation 2 */}
                <div className="scenario-card">
                    <h3 className="scenario-title">Simulation 2</h3>
                    <p className="scenario-subtitle">Investissement dynamique</p>
                    
                    <div className="scenario-params">
                        <div className="scenario-param">
                            <span className="param-label">Investissement initial</span>
                            <span className="param-value">1&nbsp;000&nbsp;€</span>
                        </div>
                        <div className="scenario-param">
                            <span className="param-label">Épargne mensuelle</span>
                            <span className="param-value">150&nbsp;€</span>
                        </div>
                        <div className="scenario-param">
                            <span className="param-label">Durée d'épargne</span>
                            <span className="param-value">18&nbsp;ans</span>
                        </div>
                        <div className="scenario-param">
                            <span className="param-label">Rendement net</span>
                            <span className="param-value">8%</span>
                        </div>
                    </div>

                    <div className="scenario-results">
                        <div className="scenario-result-item highlight">
                            <span className="result-label">Capital final</span>
                            <span className="result-value">{scenario2.total.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}&nbsp;€</span>
                        </div>
                        <div className="scenario-result-item">
                            <span className="result-label">Dont versements cumulés</span>
                            <span className="result-value">{scenario2.totalPaid.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}&nbsp;€</span>
                        </div>
                        <div className="scenario-result-item success">
                            <span className="result-label">Dont bénéfice lié à l'investissement</span>
                            <span className="result-value">{scenario2.profit.toLocaleString('fr-FR').replace(/\s/g, '\u00A0')}&nbsp;€</span>
                        </div>
                    </div>
                </div>
            </div>

            <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                marginTop: 'var(--space-8)',
                textAlign: 'center'
            }}>
                * Les performances passées ne préjugent pas des performances futures. Simulations à titre indicatif.
            </p>
        </div>
    );
}






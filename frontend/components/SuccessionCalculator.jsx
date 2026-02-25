'use client';

import { useState } from 'react';

export default function SuccessionCalculator() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        maritalStatus: '',
        hasChildren: null,
        numberOfChildren: 0,
        hasDonations: false,
        assets: {
            realEstate: 0,
            bankAccounts: 0,
            business: 0,
            securities: 0,
            vehicles: 0,
            other: 0
        },
        liabilities: {
            taxes: 0,
            loans: 0,
            otherDebts: 0,
            funeralExpenses: 1500
        }
    });

    const steps = [
        { number: 1, label: 'Le défunt' },
        { number: 2, label: 'La famille' },
        { number: 3, label: 'Le patrimoine' },
        { number: 4, label: 'Résultats' }
    ];

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const updateAssets = (field, value) => {
        setFormData(prev => ({
            ...prev,
            assets: {
                ...prev.assets,
                [field]: parseFloat(value) || 0
            }
        }));
    };

    const updateLiabilities = (field, value) => {
        setFormData(prev => ({
            ...prev,
            liabilities: {
                ...prev.liabilities,
                [field]: parseFloat(value) || 0
            }
        }));
    };

    const calculateTotalAssets = () => {
        return Object.values(formData.assets).reduce((sum, val) => sum + val, 0);
    };

    const calculateTotalLiabilities = () => {
        return Object.values(formData.liabilities).reduce((sum, val) => sum + val, 0);
    };

    const calculateNetEstate = () => {
        return calculateTotalAssets() - calculateTotalLiabilities();
    };

    const calculateSuccessionRights = () => {
        const netEstate = calculateNetEstate();
        
        // Toujours inclure netEstate dans le retour
        const baseResult = {
            netEstate: netEstate,
            taxableAmount: 0,
            total: 0,
            perChild: 0,
            details: []
        };
        
        if (netEstate <= 0) return baseResult;

        const numberOfChildren = formData.numberOfChildren || 0;
        if (numberOfChildren === 0) return baseResult;

        // Abattement par enfant : 100 000 €
        const allowancePerChild = 100000;
        const totalAllowance = numberOfChildren * allowancePerChild;
        const taxableAmount = Math.max(0, netEstate - totalAllowance);

        // Barème des droits de succession (ligne directe)
        let totalRights = 0;
        const details = [];

        if (taxableAmount > 0) {
            let remaining = taxableAmount;
            const brackets = [
                { limit: 8072, rate: 0.05 },
                { limit: 12109, rate: 0.10 },
                { limit: 15932, rate: 0.15 },
                { limit: Infinity, rate: 0.20 }
            ];

            let previousLimit = 0;
            brackets.forEach(bracket => {
                if (remaining > 0) {
                    const bracketAmount = Math.min(remaining, bracket.limit - previousLimit);
                    const bracketTax = bracketAmount * bracket.rate;
                    totalRights += bracketTax;
                    if (bracketAmount > 0) {
                        details.push({
                            amount: bracketAmount,
                            rate: bracket.rate * 100,
                            tax: bracketTax
                        });
                    }
                    remaining -= bracketAmount;
                    previousLimit = bracket.limit;
                }
            });
        }

        const perChild = numberOfChildren > 0 ? totalRights / numberOfChildren : 0;

        return {
            netEstate: netEstate,
            taxableAmount: taxableAmount,
            total: totalRights,
            perChild: perChild,
            details: details
        };
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const resetSimulation = () => {
        setCurrentStep(1);
        setFormData({
            maritalStatus: '',
            hasChildren: null,
            numberOfChildren: 0,
            hasDonations: false,
            assets: {
                realEstate: 0,
                bankAccounts: 0,
                business: 0,
                securities: 0,
                vehicles: 0,
                other: 0
            },
            liabilities: {
                taxes: 0,
                loans: 0,
                otherDebts: 0,
                funeralExpenses: 1500
            }
        });
    };

    const results = calculateSuccessionRights();

    return (
        <section className="content-section calculator-section" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Outil</span>
                    <h2 className="section-title">Simulateur de frais de transmission</h2>
                    <p className="section-desc" style={{ maxWidth: '800px', marginTop: 'var(--space-6)' }}>
                        Cet outil est un simulateur simplifié pour vous permettre d'estimer vos droits de succession. 
                        Seule la consultation d'un notaire vous permettra d'affiner ce calcul selon votre situation spécifique.
                    </p>
                </div>

                <div className="calculator-wrapper">
                    {/* Progress Bar */}
                    <div className="calculator-progress">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className={`calculator-step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                            >
                                <div className="calculator-step-circle">
                                    {currentStep > step.number ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        step.number
                                    )}
                                </div>
                                <span className="calculator-step-label">{step.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="calculator-content">
                        {currentStep === 1 && (
                            <div className="calculator-step-content">
                                <h3 className="calculator-question">
                                    Situation conjugale du défunt
                                    <span className="calculator-info-icon" title="Sélectionnez la situation matrimoniale du défunt">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <path d="M12 17h.01" />
                                        </svg>
                                    </span>
                                </h3>
                                <div className="calculator-radio-group">
                                    <label className="calculator-radio">
                                        <input
                                            type="radio"
                                            name="maritalStatus"
                                            value="single"
                                            checked={formData.maritalStatus === 'single'}
                                            onChange={(e) => updateFormData('maritalStatus', e.target.value)}
                                        />
                                        <span>Célibataire, divorcé, pacsé ou veuf</span>
                                    </label>
                                    <label className="calculator-radio">
                                        <input
                                            type="radio"
                                            name="maritalStatus"
                                            value="community"
                                            checked={formData.maritalStatus === 'community'}
                                            onChange={(e) => updateFormData('maritalStatus', e.target.value)}
                                        />
                                        <span>Marié en communauté de biens</span>
                                    </label>
                                    <label className="calculator-radio">
                                        <input
                                            type="radio"
                                            name="maritalStatus"
                                            value="separation"
                                            checked={formData.maritalStatus === 'separation'}
                                            onChange={(e) => updateFormData('maritalStatus', e.target.value)}
                                        />
                                        <span>Marié en séparation de biens</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="calculator-step-content">
                                <h3 className="calculator-question">
                                    Le défunt avait-il des enfants ?
                                </h3>
                                <div className="calculator-radio-group">
                                    <label className="calculator-radio">
                                        <input
                                            type="radio"
                                            name="hasChildren"
                                            checked={formData.hasChildren === true}
                                            onChange={() => updateFormData('hasChildren', true)}
                                        />
                                        <span>Oui</span>
                                    </label>
                                    <label className="calculator-radio">
                                        <input
                                            type="radio"
                                            name="hasChildren"
                                            checked={formData.hasChildren === false}
                                            onChange={() => updateFormData('hasChildren', false)}
                                        />
                                        <span>Non</span>
                                    </label>
                                </div>
                                {formData.hasChildren === true && (
                                    <div className="calculator-input-group" style={{ marginTop: 'var(--space-8)' }}>
                                        <label className="calculator-label">
                                            Nombre d'enfants
                                        </label>
                                        <select
                                            className="calculator-select"
                                            value={formData.numberOfChildren}
                                            onChange={(e) => updateFormData('numberOfChildren', parseInt(e.target.value))}
                                        >
                                            {[...Array(8)].map((_, i) => (
                                                <option key={i} value={i}>{i}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div className="calculator-input-group" style={{ marginTop: 'var(--space-8)' }}>
                                    <h3 className="calculator-question" style={{ marginBottom: 'var(--space-4)' }}>
                                        Y a-t-il eu des donations à un ou plusieurs enfants ?
                                    </h3>
                                    <div className="calculator-radio-group">
                                        <label className="calculator-radio">
                                            <input
                                                type="radio"
                                                name="hasDonations"
                                                checked={formData.hasDonations === true}
                                                onChange={() => updateFormData('hasDonations', true)}
                                            />
                                            <span>Oui</span>
                                        </label>
                                        <label className="calculator-radio">
                                            <input
                                                type="radio"
                                                name="hasDonations"
                                                checked={formData.hasDonations === false}
                                                onChange={() => updateFormData('hasDonations', false)}
                                            />
                                            <span>Non</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="calculator-step-content">
                                <p style={{ 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'var(--color-text-muted)', 
                                    marginBottom: 'var(--space-8)',
                                    fontStyle: 'italic'
                                }}>
                                    Indiquez la part du défunt. Par exemple : le pourcentage de propriété mentionné dans l'acte d'achat d'un bien immobilier, 
                                    moitié des comptes bancaires si les comptes sont joints...
                                </p>
                                
                                <div className="calculator-assets-section">
                                    <div className="calculator-section-header">
                                        <h4>Actif de la succession</h4>
                                    </div>
                                    <div className="calculator-inputs-grid">
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Biens immobiliers (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.assets.realEstate || ''}
                                                    onChange={(e) => updateAssets('realEstate', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Comptes bancaires (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.assets.bankAccounts || ''}
                                                    onChange={(e) => updateAssets('bankAccounts', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Entreprise ou fonds de commerce (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.assets.business || ''}
                                                    onChange={(e) => updateAssets('business', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Parts sociales et autres valeurs mobilières (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.assets.securities || ''}
                                                    onChange={(e) => updateAssets('securities', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Véhicules (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.assets.vehicles || ''}
                                                    onChange={(e) => updateAssets('vehicles', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Autres biens (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.assets.other || ''}
                                                    onChange={(e) => updateAssets('other', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row calculator-total">
                                            <label className="calculator-label">Total actif</label>
                                            <div className="calculator-total-value">
                                                {calculateTotalAssets().toLocaleString('fr-FR')} €
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="calculator-assets-section" style={{ marginTop: 'var(--space-12)' }}>
                                    <div className="calculator-section-header">
                                        <h4>Passif de la succession</h4>
                                    </div>
                                    <div className="calculator-inputs-grid">
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Solde impôts à payer au jour du décès (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.liabilities.taxes || ''}
                                                    onChange={(e) => updateLiabilities('taxes', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Prêts (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.liabilities.loans || ''}
                                                    onChange={(e) => updateLiabilities('loans', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Autres dettes (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.liabilities.otherDebts || ''}
                                                    onChange={(e) => updateLiabilities('otherDebts', e.target.value)}
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row">
                                            <label className="calculator-label">Frais d'obsèques (€)</label>
                                            <div className="calculator-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="calculator-input"
                                                    value={formData.liabilities.funeralExpenses || ''}
                                                    onChange={(e) => updateLiabilities('funeralExpenses', e.target.value)}
                                                    placeholder="1500"
                                                />
                                            </div>
                                        </div>
                                        <div className="calculator-input-row calculator-total">
                                            <label className="calculator-label">Total passif</label>
                                            <div className="calculator-total-value">
                                                {calculateTotalLiabilities().toLocaleString('fr-FR')} €
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="calculator-step-content">
                                <h3 className="calculator-results-title">
                                    Résultat de l'évaluation
                                </h3>
                                
                                <div className="calculator-results-box">
                                    <div className="calculator-result-item">
                                        <span className="calculator-result-label">Actif net successoral</span>
                                        <span className="calculator-result-value">
                                            {(results.netEstate || 0).toLocaleString('fr-FR')} €
                                        </span>
                                    </div>
                                    {formData.numberOfChildren > 0 && (
                                        <>
                                            <div className="calculator-result-item">
                                                <span className="calculator-result-label">
                                                    Part civile de chacun des enfants
                                                </span>
                                                <span className="calculator-result-value">
                                                    {Math.round((results.netEstate || 0) / formData.numberOfChildren).toLocaleString('fr-FR')} €
                                                </span>
                                            </div>
                                            {[...Array(Math.min(formData.numberOfChildren, 7))].map((_, i) => (
                                                <div key={i} className="calculator-result-item">
                                                    <span className="calculator-result-label">
                                                        Part taxable de l'enfant {i + 1}
                                                    </span>
                                                    <span className="calculator-result-value">
                                                        {Math.max(0, Math.round(((results.netEstate || 0) / formData.numberOfChildren) - 100000)).toLocaleString('fr-FR')} €
                                                    </span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>

                                <div className="calculator-rights-box">
                                    <h4 className="calculator-rights-title">Droits de succession dus</h4>
                                    {formData.numberOfChildren > 0 ? (
                                        <>
                                            {[...Array(Math.min(formData.numberOfChildren, 7))].map((_, i) => (
                                                <div key={i} className="calculator-rights-item">
                                                    <span>Droits de succession dus par l'enfant {i + 1}</span>
                                                    <span className="calculator-rights-amount">
                                                        {Math.round(results.perChild).toLocaleString('fr-FR')} €
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="calculator-rights-total">
                                                <span>Total des droits de succession</span>
                                                <span className="calculator-rights-total-amount">
                                                    {Math.round(results.total).toLocaleString('fr-FR')} €
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                                            Aucun enfant déclaré. Veuillez retourner à l'étape 2 pour compléter les informations.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="calculator-navigation">
                            {currentStep > 1 && (
                                <button className="btn btn-secondary" onClick={prevStep}>
                                    Précédent
                                </button>
                            )}
                            {currentStep < steps.length ? (
                                <button 
                                    className="btn btn-primary" 
                                    onClick={nextStep}
                                    disabled={
                                        (currentStep === 1 && !formData.maritalStatus) ||
                                        (currentStep === 2 && formData.hasChildren === null || formData.hasChildren === undefined)
                                    }
                                    style={{
                                        opacity: ((currentStep === 1 && !formData.maritalStatus) ||
                                        (currentStep === 2 && (formData.hasChildren === null || formData.hasChildren === undefined))) ? 0.5 : 1,
                                        cursor: ((currentStep === 1 && !formData.maritalStatus) ||
                                        (currentStep === 2 && (formData.hasChildren === null || formData.hasChildren === undefined))) ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Suivant
                                </button>
                            ) : (
                                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                    <button className="btn btn-secondary" onClick={resetSimulation}>
                                        Nouvelle simulation
                                    </button>
                                    <button className="btn btn-primary" onClick={() => window.print()}>
                                        Imprimer mes résultats
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


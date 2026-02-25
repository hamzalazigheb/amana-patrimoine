'use client';

import { useState, useEffect } from 'react';

export default function InvestissementSimulator() {
    const [capital, setCapital] = useState(200000);
    const [horizon, setHorizon] = useState(10);
    const [allocation, setAllocation] = useState({
        actions: 0,
        immobilier: 0,
        metaux: 0,
        liquidites: 0
    });

    useEffect(() => {
        // Calcul de l'allocation en fonction de l'horizon
        let actions, immobilier, metaux, liquidites;

        if (horizon <= 3) {
            // Horizon court - profil prudent
            actions = 15;
            immobilier = 30;
            metaux = 15;
            liquidites = 40;
        } else if (horizon <= 7) {
            // Horizon moyen - profil équilibré
            actions = 30;
            immobilier = 40;
            metaux = 15;
            liquidites = 15;
        } else if (horizon <= 12) {
            // Horizon long - profil dynamique
            actions = 40;
            immobilier = 45;
            metaux = 10;
            liquidites = 5;
        } else {
            // Horizon très long - profil offensif
            actions = 50;
            immobilier = 40;
            metaux = 8;
            liquidites = 2;
        }

        setAllocation({
            actions,
            immobilier,
            metaux,
            liquidites
        });
    }, [capital, horizon]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value).replace(/\s/g, '\u00A0');
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value).replace(/\s/g, '\u00A0');
    };

    const getProfileName = () => {
        if (horizon <= 3) return 'Prudent';
        if (horizon <= 7) return 'Équilibré';
        if (horizon <= 12) return 'Dynamique';
        return 'Offensif';
    };

    return (
        <div className="investissement-simulator">
            <div className="simulator-header">
                <h3>Profil Investisseur - {formatCurrency(capital)}</h3>
                <p className="simulator-subtitle">
                    Répartition type pour un horizon de placement de {horizon} {horizon === 1 ? 'an' : 'ans'}
                </p>
                <p className="simulator-profile-badge">
                    Profil {getProfileName()}
                </p>
            </div>

            <div className="simulator-inputs">
                <div className="simulator-input-group">
                    <label htmlFor="capital">Capital à investir</label>
                    <div className="input-with-unit">
                        <input
                            type="number"
                            id="capital"
                            value={capital}
                            onChange={(e) => setCapital(Number(e.target.value))}
                            min="1000"
                            max="10000000"
                            step="10000"
                        />
                        <span className="input-unit">€</span>
                    </div>
                    <input
                        type="range"
                        value={capital}
                        onChange={(e) => setCapital(Number(e.target.value))}
                        min="10000"
                        max="1000000"
                        step="10000"
                        className="range-slider"
                    />
                </div>

                <div className="simulator-input-group">
                    <label htmlFor="horizon">Horizon de placement</label>
                    <div className="input-with-unit">
                        <input
                            type="number"
                            id="horizon"
                            value={horizon}
                            onChange={(e) => setHorizon(Number(e.target.value))}
                            min="1"
                            max="30"
                            step="1"
                        />
                        <span className="input-unit">ans</span>
                    </div>
                    <input
                        type="range"
                        value={horizon}
                        onChange={(e) => setHorizon(Number(e.target.value))}
                        min="1"
                        max="30"
                        step="1"
                        className="range-slider"
                    />
                </div>
            </div>

            <div className="allocation-grid">
                <div className="allocation-item">
                    <div className="allocation-header">
                        <span className="allocation-label">Part Actions</span>
                        <span className="allocation-value">{allocation.actions} %</span>
                    </div>
                    <div className="allocation-bar-wrapper">
                        <div 
                            className="allocation-bar" 
                            style={{ 
                                width: `${allocation.actions}%`,
                                backgroundColor: '#b8935f'
                            }}
                        ></div>
                    </div>
                    <span className="allocation-amount">{formatCurrency(capital * allocation.actions / 100)}</span>
                </div>

                <div className="allocation-item">
                    <div className="allocation-header">
                        <span className="allocation-label">Immobilier (SCPI)</span>
                        <span className="allocation-value">{allocation.immobilier} %</span>
                    </div>
                    <div className="allocation-bar-wrapper">
                        <div 
                            className="allocation-bar" 
                            style={{ 
                                width: `${allocation.immobilier}%`,
                                backgroundColor: '#444b3f'
                            }}
                        ></div>
                    </div>
                    <span className="allocation-amount">{formatCurrency(capital * allocation.immobilier / 100)}</span>
                </div>

                <div className="allocation-item">
                    <div className="allocation-header">
                        <span className="allocation-label">Métaux Précieux / Or</span>
                        <span className="allocation-value">{allocation.metaux} %</span>
                    </div>
                    <div className="allocation-bar-wrapper">
                        <div 
                            className="allocation-bar" 
                            style={{ 
                                width: `${allocation.metaux}%`,
                                backgroundColor: '#d4af37'
                            }}
                        ></div>
                    </div>
                    <span className="allocation-amount">{formatCurrency(capital * allocation.metaux / 100)}</span>
                </div>

                <div className="allocation-item">
                    <div className="allocation-header">
                        <span className="allocation-label">Liquidités Éthiques</span>
                        <span className="allocation-value">{allocation.liquidites} %</span>
                    </div>
                    <div className="allocation-bar-wrapper">
                        <div 
                            className="allocation-bar" 
                            style={{ 
                                width: `${allocation.liquidites}%`,
                                backgroundColor: '#6b7565'
                            }}
                        ></div>
                    </div>
                    <span className="allocation-amount">{formatCurrency(capital * allocation.liquidites / 100)}</span>
                </div>
            </div>

            <div className="simulator-note">
                <p>
                    <strong>Note :</strong> Cette répartition est indicative et doit être ajustée en fonction de votre profil de risque, 
                    de votre situation patrimoniale et de vos objectifs personnels. Un entretien avec un conseiller AMANA Patrimoine 
                    permettra d'affiner cette stratégie d'allocation.
                </p>
            </div>
        </div>
    );
}


'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/* ─── helpers ─────────────────────────────────────────────── */
function fmt(n, lang = 'fr') {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n) + ' €';
}
function fmtShort(n, lang = 'fr') {
  const sep = lang === 'fr' ? ',' : '.';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace('.', sep) + ' M€';
  if (n >= 1_000) return (n / 1_000).toFixed(2).replace('.', sep) + ' k€';
  return fmt(n, lang);
}
function calcCamelZakat(n) {
  if (n < 5) return { val: 0, label: null };
  let heads = 0;
  if (n <= 24) heads = Math.floor(n / 5);
  else if (n <= 35) heads = 1;
  else if (n <= 45) heads = 1;
  else if (n <= 60) heads = 1;
  else if (n <= 75) heads = 1;
  else if (n <= 90) heads = 2;
  else if (n <= 120) heads = 2;
  else heads = Math.floor(n / 40) + Math.floor(n / 50);
  return { val: heads * 1500, label: `${heads} chameau(x)` };
}
function calcCattleZakat(n) {
  if (n < 30) return { val: 0, label: null };
  const heads = Math.floor(n / 30);
  return { val: heads * 400, label: `${heads} bovin(s) jeune(s)` };
}
function calcSheepZakat(n) {
  if (n < 40) return { val: 0, label: null };
  let s = 0;
  if (n <= 120) s = 1;
  else if (n <= 200) s = 2;
  else if (n <= 300) s = 3;
  else s = 3 + Math.floor((n - 300) / 100);
  return { val: s * 150, label: `${s} ovin(s)/caprin(s)` };
}

/* ─── sub-components ──────────────────────────────────────── */
function Section({ id, icon, title, subtitle, total, children, collapsed, onToggle }) {
  return (
    <div className={`zakat-section${collapsed ? ' collapsed' : ''}`}>
      <div className="zakat-section-header" onClick={() => onToggle(id)}>
        <div className="zakat-section-icon">{icon}</div>
        <div className="zakat-section-title-wrap">
          <div className="zakat-section-title">{title}</div>
          <div className="zakat-section-subtitle">{subtitle}</div>
        </div>
        {total !== undefined && (
          <div className="zakat-section-total" style={id === 'debts' ? { color: '#F87171' } : {}}>{total}</div>
        )}
        <span className="zakat-section-chevron">›</span>
      </div>
      <div className="zakat-section-body">{children}</div>
    </div>
  );
}

function Field({ label, tip, children }) {
  return (
    <div className="zakat-field">
      <label>
        {label}
        {tip && <span className="zakat-tooltip" data-tip={tip}>?</span>}
      </label>
      {children}
    </div>
  );
}

function NumInput({ id, value, onChange, suffix, noPrefix }) {
  return (
    <div className="zakat-input-wrap">
      {!noPrefix && <span className="currency">€</span>}
      <input
        type="number"
        className={noPrefix ? 'no-prefix' : ''}
        id={id}
        value={value}
        min="0"
        onChange={e => onChange(id, parseFloat(e.target.value) || 0)}
      />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  );
}

function RadioOption({ selected, onClick, children }) {
  return (
    <div className={`zakat-radio-option${selected ? ' selected' : ''}`} onClick={onClick}>
      {children}
    </div>
  );
}

function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`zakat-faq-item${open ? ' open' : ''}`}>
      <div className="zakat-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        <span className="zakat-faq-icon">+</span>
      </div>
      <div className="zakat-faq-a">{children}</div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────── */
export default function ZakatCalculator() {
  /* prices */
  const [goldPrice, setGoldPrice] = useState(87);
  const [silverPrice, setSilverPrice] = useState(0.95);

  /* nisab method */
  const [nisabMethod, setNisabMethod] = useState('gold');

  /* form values */
  const initFields = {
    cash_hand: 0, cash_checking: 0, cash_savings: 0, cash_other: 0,
    cash_money_market: 0, cash_lent: 0,
    gold_jewelry_worn: 0, gold_jewelry: 0, gold_coins: 0,
    silver_jewelry_worn: 0, silver_jewelry: 0, silver_coins: 0,
    stocks_value: 0, stocks_custom_pct: 30,
    funds_islamic: 0, funds_other: 0,
    crypto_value: 0, retirement_accessible: 0, retirement_pea: 0,
    rental_income: 0, rental_pending: 0, realestate_sale: 0, realestate_scpi: 0,
    biz_inventory: 0, biz_receivables: 0, biz_cash: 0, biz_profits: 0,
    agri_natural: 0, agri_artificial: 0,
    livestock_camels: 0, livestock_cattle: 0, livestock_sheep: 0,
    debt_personal: 0, debt_annual_installments: 0, debt_bills: 0, debt_commercial: 0,
  };
  const [fields, setFields] = useState(initFields);
  const [stocksMethod, setStocksMethod] = useState('0.025');
  const [wornIncluded, setWornIncluded] = useState(true);

  /* collapsed sections */
  const [collapsed, setCollapsed] = useState({});
  const toggleSection = id => setCollapsed(c => ({ ...c, [id]: !c[id] }));

  const setField = (id, val) => setFields(f => ({ ...f, [id]: val }));

  /* modal */
  const [modalOpen, setModalOpen] = useState(false);
  const [synName, setSynName] = useState('');
  const [synHijri, setSynHijri] = useState('1446 AH');
  const [synDate, setSynDate] = useState('');
  const [synMadhab, setSynMadhab] = useState('Hanafi');
  const [synNotes, setSynNotes] = useState('');

  useEffect(() => {
    const d = new Date();
    setSynDate(d.toISOString().split('T')[0]);
  }, []);

  /* ── calc ─── */
  const f = fields;
  const gp = goldPrice, sp = silverPrice;

  const cash = f.cash_hand + f.cash_checking + f.cash_savings + f.cash_other + f.cash_money_market + f.cash_lent;

  const goldGrams = (wornIncluded ? f.gold_jewelry_worn : 0) + f.gold_jewelry + f.gold_coins;
  const silverGrams = f.silver_jewelry_worn + f.silver_jewelry + f.silver_coins;
  const precious = goldGrams * gp + silverGrams * sp;

  const stocksPct = stocksMethod === 'custom' ? f.stocks_custom_pct / 100 : 0.025;
  const stocksZakat = f.stocks_value * stocksPct;
  const stocksBaseEquiv = stocksZakat / 0.025;
  const invest = stocksBaseEquiv + f.funds_islamic + f.funds_other + f.crypto_value + f.retirement_accessible + f.retirement_pea;

  const realestate = f.rental_income + f.rental_pending + f.realestate_sale + f.realestate_scpi;
  const business = f.biz_inventory + f.biz_receivables + f.biz_cash + f.biz_profits;
  const debts = f.debt_personal + f.debt_annual_installments + f.debt_bills + f.debt_commercial;

  const base = Math.max(0, cash + precious + invest + realestate + business - debts);
  const zakatStandard = base * 0.025;

  const agriZakat = f.agri_natural * 0.10 + f.agri_artificial * 0.05;

  const camel = calcCamelZakat(f.livestock_camels);
  const cattle = calcCattleZakat(f.livestock_cattle);
  const sheep = calcSheepZakat(f.livestock_sheep);
  const livestockZakatVal = camel.val + cattle.val + sheep.val;
  const totalZakat = zakatStandard + agriZakat + livestockZakatVal;
  const hasSpecial = agriZakat > 0 || livestockZakatVal > 0;

  const nisabVal = nisabMethod === 'gold' ? 85 * gp : 595 * sp;
  const totalAssets = cash + precious + invest + realestate + business;
  const nisabStatus = totalAssets === 0 ? 'unknown' : totalAssets >= nisabVal ? 'above' : 'below';
  const nisabText = {
    unknown: 'Renseignez vos biens pour vérifier le Nisab',
    above: `Nisab atteint (${Math.round(nisabVal).toLocaleString('fr-FR')} €) — La Zakat est obligatoire`,
    below: `Nisab non atteint (${Math.round(nisabVal).toLocaleString('fr-FR')} €) — La Zakat n'est pas obligatoire`,
  }[nisabStatus];
  const nisabIcon = { unknown: '⚠️', above: '✅', below: '❌' }[nisabStatus];

  /* ── synthesis download ─── */
  function downloadSynthesis() {
    const rows = [
      ['💵 Liquidités & Comptes', fmt(cash)],
      ['🏅 Or & Argent', fmt(precious)],
      ['📈 Investissements', fmt(invest)],
      ['🏠 Immobilier', fmt(realestate)],
      ['💼 Commerce & Entreprise', fmt(business)],
      ['📉 Dettes déduites', '− ' + fmt(debts)],
    ];
    const agriRow = agriZakat > 0 ? `<tr><td>🌾 Zakat agricole (Ushr)</td><td style="text-align:right;font-weight:600;">${fmt(agriZakat)}</td></tr>` : '';
    const liveRow = livestockZakatVal > 0 ? `<tr><td>🐄 Zakat cheptel</td><td style="text-align:right;font-weight:600;">${fmt(livestockZakatVal)}</td></tr>` : '';
    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/><title>Synthèse Zakat — ${synName || '—'}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;color:#333;background:#fff;padding:0;}
.page{max-width:700px;margin:0 auto;padding:48px 40px;}
.header{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;padding-bottom:20px;border-bottom:2px solid #1a3c34;}
.logo-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#1a3c34;}
.doc-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#1a3c34;margin-bottom:4px;}
.doc-sub{font-size:13px;color:#5c6b65;}
.meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0;}
.meta-item{background:#f9f7f2;border-radius:8px;padding:12px 16px;}
.meta-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#5c6b65;margin-bottom:4px;}
.meta-val{font-size:14px;font-weight:600;color:#1a3c34;}
.section-title{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:#1a3c34;margin:28px 0 12px;padding-bottom:6px;border-bottom:1px solid #e0d9cc;}
table{width:100%;border-collapse:collapse;font-size:13px;}
td{padding:9px 12px;border-bottom:1px solid #f0ebe0;}
tr:last-child td{border-bottom:none;}
.base-row td{font-weight:700;color:#1a3c34;background:#f9f7f2;font-size:14px;}
.zakat-box{background:#1a3c34;border-radius:12px;padding:24px;text-align:center;margin:24px 0;}
.zakat-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.6);margin-bottom:8px;}
.zakat-amount{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:700;color:#b08d57;}
.notes-box{background:#f9f7f2;border-left:4px solid #b08d57;border-radius:0 8px 8px 0;padding:14px 16px;font-size:13px;line-height:1.7;margin:16px 0;}
.disclaimer{font-size:11px;color:#5c6b65;line-height:1.7;margin-top:32px;padding-top:20px;border-top:1px solid #e0d9cc;}
.footer-bar{margin-top:40px;padding-top:16px;border-top:2px solid #1a3c34;display:flex;justify-content:space-between;font-size:11px;color:#5c6b65;}
.footer-bar strong{color:#1a3c34;}
.no-print{text-align:center;margin-top:24px;}
.print-btn{background:#1a3c34;color:#fff;border:none;border-radius:8px;padding:12px 32px;font-size:14px;font-weight:600;cursor:pointer;}
@media print{.no-print{display:none!important;} body{print-color-adjust:exact;-webkit-print-color-adjust:exact;}}
</style></head><body><div class="page">
<div class="header">
  <div class="logo-name">Amana Patrimoine</div>
  <div style="text-align:right;"><div class="doc-title">Synthèse Zakat</div><div class="doc-sub">Calcul annuel conforme à la jurisprudence islamique</div></div>
</div>
<div class="meta-grid">
  <div class="meta-item"><div class="meta-label">Bénéficiaire</div><div class="meta-val">${synName || '—'}</div></div>
  <div class="meta-item"><div class="meta-label">Date de calcul</div><div class="meta-val">${synDate} / ${synHijri}</div></div>
  <div class="meta-item"><div class="meta-label">Madhab</div><div class="meta-val">${synMadhab}</div></div>
  <div class="meta-item"><div class="meta-label">Nisab référence</div><div class="meta-val">${nisabMethod === 'gold' ? 'Or 85g' : 'Argent 595g'} — ${Math.round(nisabVal).toLocaleString('fr-FR')} €</div></div>
  <div class="meta-item"><div class="meta-label">Prix or (€/g)</div><div class="meta-val">${gp} €/g</div></div>
  <div class="meta-item"><div class="meta-label">Prix argent (€/g)</div><div class="meta-val">${sp} €/g</div></div>
</div>
<div class="section-title">Détail des avoirs zakatiables</div>
<table>${rows.map(([l, v]) => `<tr><td>${l}</td><td style="text-align:right;">${v}</td></tr>`).join('')}
<tr class="base-row"><td>BASE ZAKATIABLE NETTE</td><td style="text-align:right;">${fmt(base)}</td></tr></table>
<div class="zakat-box"><div class="zakat-label">Zakat al-Mal due (taux 2,5%)</div><div class="zakat-amount">${fmt(zakatStandard)}</div></div>
${(agriRow || liveRow) ? `<div class="section-title">Zakat spéciale (taux distincts)</div><table>${agriRow}${liveRow}</table>
<div style="margin-top:12px;padding:12px 16px;background:#f9f7f2;border-radius:8px;font-size:13px;"><strong>Zakat totale : </strong><span style="font-size:16px;font-weight:700;color:#b08d57;margin-left:8px;">${fmt(totalZakat)}</span></div>` : ''}
${synNotes ? `<div class="section-title">Notes personnelles</div><div class="notes-box">${synNotes}</div>` : ''}
<div class="disclaimer"><strong>Avertissement :</strong> Ce document est fourni à titre indicatif uniquement. Il ne constitue pas une fatwa. Pour toute situation complexe, consultez un savant qualifié (alim).</div>
<div class="footer-bar"><div><strong>Amana Patrimoine</strong> — amana-patrimoine.fr</div><div>Simulateur généré le ${new Date().toLocaleDateString('fr-FR')}</div></div>
<div class="no-print"><button class="print-btn" onclick="window.print()">🖨️ Imprimer / Enregistrer en PDF</button></div>
</div><script>document.querySelector('.print-btn').onclick=()=>window.print();<\/script></body></html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Synthese_Zakat_${(synName || 'zakat').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().getFullYear()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setModalOpen(false);
  }

  /* ── render ─── */
  return (
    <div className="zakat-root">
      {/* HERO */}
      <div className="zakat-hero">
        <div className="zakat-hero-badge">☪ Outil de calcul islamique</div>
        <h1>Calculateur de <span>Zakat</span></h1>
        <p>Un simulateur complet et conforme à la jurisprudence islamique pour calculer votre Zakat annuelle sur l&apos;ensemble de vos biens zakatiables.</p>
      </div>

      {/* NISAB BANNER */}
      <div className="zakat-nisab-banner">
        <div className="zakat-nisab-inner">
          <div><div className="zakat-nisab-label">Nisab (seuil minimum)</div></div>
          <div className="zakat-nisab-values">
            <div className="zakat-nisab-chip">
              <span className="nisab-type">🥇 Or</span>
              <span>85g → </span>
              <span className="nisab-amount">{Math.round(85 * goldPrice).toLocaleString('fr-FR')}</span>
              <span className="nisab-unit">€</span>
            </div>
            <div className="zakat-nisab-chip">
              <span className="nisab-type">🥈 Argent</span>
              <span>595g → </span>
              <span className="nisab-amount">{Math.round(595 * silverPrice).toLocaleString('fr-FR')}</span>
              <span className="nisab-unit">€</span>
            </div>
          </div>
          <div className="zakat-price-inputs">
            <div className="zakat-price-wrap">
              <label>Or (€/g)</label>
              <input type="number" value={goldPrice} min="1" step="0.01" onChange={e => setGoldPrice(parseFloat(e.target.value) || 0)} />
            </div>
            <div className="zakat-price-wrap">
              <label>Argent (€/g)</label>
              <input type="number" value={silverPrice} min="0.01" step="0.01" onChange={e => setSilverPrice(parseFloat(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="zakat-main">
        <div>
          {/* SECTION 1 – Nisab method */}
          <Section id="nisab" icon="⚖️" title="Méthode de calcul du Nisab" subtitle="Choisissez la référence pour le seuil minimum" collapsed={collapsed.nisab} onToggle={toggleSection}>
            <div className="zakat-info-box">
              <strong>Qu&apos;est-ce que le Nisab ?</strong><br />
              Le Nisab est le seuil minimum de richesse à partir duquel la Zakat devient obligatoire. Si la valeur totale de vos biens zakatiables est inférieure au Nisab, vous n&apos;êtes pas tenu de payer la Zakat.
            </div>
            <div className="zakat-radio-group">
              <RadioOption selected={nisabMethod === 'gold'} onClick={() => setNisabMethod('gold')}>
                🥇 Or (85g) — plus restrictif
              </RadioOption>
              <RadioOption selected={nisabMethod === 'silver'} onClick={() => setNisabMethod('silver')}>
                🥈 Argent (595g) — plus inclusif
              </RadioOption>
            </div>
            <p className="zakat-field-note" style={{ marginTop: 12 }}>Note : La majorité des savants contemporains recommandent l&apos;utilisation du Nisab en or.</p>
          </Section>

          {/* SECTION 2 – Liquidités */}
          <Section id="cash" icon="💵" title="Liquidités & Comptes bancaires" subtitle="Espèces, comptes courants, épargne, livrets" total={cash > 0 ? fmtShort(cash) : '0 €'} collapsed={collapsed.cash} onToggle={toggleSection}>
            <div className="zakat-field-row">
              <Field label="Espèces en main" tip="Billets et pièces détenus physiquement"><NumInput id="cash_hand" value={f.cash_hand} onChange={setField} /></Field>
              <Field label="Compte courant" tip="Solde de votre compte courant le jour du calcul"><NumInput id="cash_checking" value={f.cash_checking} onChange={setField} /></Field>
            </div>
            <div className="zakat-field-row">
              <Field label="Livret A / Épargne réglementée"><NumInput id="cash_savings" value={f.cash_savings} onChange={setField} /></Field>
              <Field label="Autres comptes épargne"><NumInput id="cash_other" value={f.cash_other} onChange={setField} /></Field>
            </div>
            <div className="zakat-field-row">
              <Field label="Fonds monétaires / DAT"><NumInput id="cash_money_market" value={f.cash_money_market} onChange={setField} /></Field>
              <Field label="Argent prêté à des tiers" tip="Uniquement si vous pensez le récupérer"><NumInput id="cash_lent" value={f.cash_lent} onChange={setField} /></Field>
            </div>
          </Section>

          {/* SECTION 3 – Or & Argent */}
          <Section id="gold" icon="🏅" title="Or & Argent" subtitle="Bijoux, pièces, lingots, vaisselle" total={precious > 0 ? fmtShort(precious) : '0 €'} collapsed={collapsed.gold} onToggle={toggleSection}>
            <div className="zakat-warning-box">
              <strong>Règle sur les bijoux portés :</strong> Il existe un débat entre savants. Selon Hanafi et Hanbali, les bijoux en or portés sont zakatiables. Selon Maliki et Shafi&apos;i, les bijoux portés régulièrement sont exemptés. Par précaution (ihtiyat), il est recommandé de les inclure.
            </div>
            <div className="zakat-divider-label"><span>OR</span></div>
            <div className="zakat-field-row triple">
              <Field label="Bijoux or portés (g)"><NumInput id="gold_jewelry_worn" value={f.gold_jewelry_worn} onChange={setField} noPrefix suffix="g" /></Field>
              <Field label="Bijoux or non portés (g)"><NumInput id="gold_jewelry" value={f.gold_jewelry} onChange={setField} noPrefix suffix="g" /></Field>
              <Field label="Pièces / lingots or (g)"><NumInput id="gold_coins" value={f.gold_coins} onChange={setField} noPrefix suffix="g" /></Field>
            </div>
            <div className="zakat-field">
              <label>Inclure les bijoux portés ?</label>
              <div className="zakat-radio-group">
                <RadioOption selected={wornIncluded} onClick={() => setWornIncluded(true)}>Oui (Hanafi/Hanbali)</RadioOption>
                <RadioOption selected={!wornIncluded} onClick={() => setWornIncluded(false)}>Non (Maliki/Shafi&apos;i)</RadioOption>
              </div>
            </div>
            <div className="zakat-divider-label" style={{ marginTop: 16 }}><span>ARGENT</span></div>
            <div className="zakat-field-row triple">
              <Field label="Bijoux argent portés (g)"><NumInput id="silver_jewelry_worn" value={f.silver_jewelry_worn} onChange={setField} noPrefix suffix="g" /></Field>
              <Field label="Bijoux argent non portés (g)"><NumInput id="silver_jewelry" value={f.silver_jewelry} onChange={setField} noPrefix suffix="g" /></Field>
              <Field label="Pièces / lingots argent (g)"><NumInput id="silver_coins" value={f.silver_coins} onChange={setField} noPrefix suffix="g" /></Field>
            </div>
          </Section>

          {/* SECTION 4 – Investissements */}
          <Section id="invest" icon="📈" title="Investissements financiers" subtitle="Actions, fonds, obligations, crypto, retraite" total={invest > 0 ? fmtShort(invest) : '0 €'} collapsed={collapsed.invest} onToggle={toggleSection}>
            <div className="zakat-info-box">
              <strong>Méthode pour les actions :</strong> (1) Simple : 2,5% de la valeur totale. (2) Purifiée : actifs zakatiables de l&apos;entreprise proportionnellement.
            </div>
            <div className="zakat-subsection">
              <div className="zakat-subsection-title">📊 Actions & ETF</div>
              <div className="zakat-field-row">
                <Field label="Valeur du portefeuille actions"><NumInput id="stocks_value" value={f.stocks_value} onChange={setField} /></Field>
                <div className="zakat-field">
                  <label>Méthode</label>
                  <div className="zakat-input-wrap">
                    <select value={stocksMethod} onChange={e => setStocksMethod(e.target.value)}>
                      <option value="0.025">Simple (2,5% valeur totale)</option>
                      <option value="custom">Purifiée (% zakatiable personnalisé)</option>
                    </select>
                  </div>
                </div>
              </div>
              {stocksMethod === 'custom' && (
                <Field label="% zakatiable des actifs de l'entreprise">
                  <div className="zakat-input-wrap"><input type="number" className="no-prefix" value={f.stocks_custom_pct} min="0" max="100" onChange={e => setField('stocks_custom_pct', parseFloat(e.target.value) || 0)} /><span className="input-suffix">%</span></div>
                </Field>
              )}
            </div>
            <div className="zakat-subsection">
              <div className="zakat-subsection-title">🏦 Fonds d&apos;investissement</div>
              <div className="zakat-field-row">
                <Field label="Fonds islamiques (Sukuk)"><NumInput id="funds_islamic" value={f.funds_islamic} onChange={setField} /></Field>
                <Field label="Autres fonds (OPCVM, SICAV)"><NumInput id="funds_other" value={f.funds_other} onChange={setField} /></Field>
              </div>
            </div>
            <div className="zakat-subsection">
              <div className="zakat-subsection-title">₿ Cryptomonnaies</div>
              <div className="zakat-field-row single">
                <Field label="Valeur totale crypto (€)"><NumInput id="crypto_value" value={f.crypto_value} onChange={setField} /></Field>
              </div>
            </div>
            <div className="zakat-subsection">
              <div className="zakat-subsection-title">🎯 Épargne retraite</div>
              <div className="zakat-warning-box" style={{ fontSize: 12, marginBottom: 12 }}>Incluez uniquement la valeur de rachat accessible si vous pouvez en disposer.</div>
              <div className="zakat-field-row">
                <Field label="Assurance-vie (valeur de rachat)"><NumInput id="retirement_accessible" value={f.retirement_accessible} onChange={setField} /></Field>
                <Field label="PEA / PER accessible"><NumInput id="retirement_pea" value={f.retirement_pea} onChange={setField} /></Field>
              </div>
            </div>
          </Section>

          {/* SECTION 5 – Immobilier */}
          <Section id="realestate" icon="🏠" title="Immobilier d'investissement" subtitle="Locatif, terrains à vendre, SCPI (pas la résidence principale)" total={realestate > 0 ? fmtShort(realestate) : '0 €'} collapsed={collapsed.realestate} onToggle={toggleSection}>
            <div className="zakat-info-box">
              <strong>Règle immobilière :</strong> La résidence principale est exempte. Pour le locatif : Zakat sur les loyers. Pour les biens à vendre : 2,5% de la valeur.
            </div>
            <div className="zakat-subsection">
              <div className="zakat-subsection-title">🏢 Biens locatifs</div>
              <div className="zakat-field-row">
                <Field label="Loyers perçus sur l'année (net)"><NumInput id="rental_income" value={f.rental_income} onChange={setField} /></Field>
                <Field label="Loyers à percevoir (dus non encaissés)"><NumInput id="rental_pending" value={f.rental_pending} onChange={setField} /></Field>
              </div>
            </div>
            <div className="zakat-subsection">
              <div className="zakat-subsection-title">🏗️ Biens destinés à la revente</div>
              <div className="zakat-field-row">
                <Field label="Valeur marchande des biens à vendre"><NumInput id="realestate_sale" value={f.realestate_sale} onChange={setField} /></Field>
                <Field label="SCPI / Parts immobilières"><NumInput id="realestate_scpi" value={f.realestate_scpi} onChange={setField} /></Field>
              </div>
            </div>
          </Section>

          {/* SECTION 6 – Commerce */}
          <Section id="business" icon="💼" title="Commerce & Entreprise" subtitle="Stocks, créances commerciales, profits" total={business > 0 ? fmtShort(business) : '0 €'} collapsed={collapsed.business} onToggle={toggleSection}>
            <div className="zakat-info-box">La Zakat commerciale s&apos;applique sur les actifs circulants : stocks + créances + trésorerie. Les immobilisations sont exemptes.</div>
            <div className="zakat-field-row">
              <Field label="Valeur des stocks (prix coût)" tip="Valeur de vos marchandises au prix d'achat"><NumInput id="biz_inventory" value={f.biz_inventory} onChange={setField} /></Field>
              <Field label="Créances clients (recouvrables)"><NumInput id="biz_receivables" value={f.biz_receivables} onChange={setField} /></Field>
            </div>
            <div className="zakat-field-row">
              <Field label="Trésorerie de l'entreprise (votre part)"><NumInput id="biz_cash" value={f.biz_cash} onChange={setField} /></Field>
              <Field label="Profits non distribués (votre part)"><NumInput id="biz_profits" value={f.biz_profits} onChange={setField} /></Field>
            </div>
          </Section>

          {/* SECTION 7 – Agricole */}
          <Section id="agri" icon="🌾" title="Zakat Agricole (Ushr)" subtitle="Récoltes, productions agricoles" total={(f.agri_natural + f.agri_artificial) > 0 ? fmtShort(f.agri_natural + f.agri_artificial) : '0 €'} collapsed={collapsed.agri} onToggle={toggleSection}>
            <div className="zakat-info-box"><strong>Taux différent !</strong> 10% pour l&apos;irrigation naturelle, 5% pour l&apos;irrigation artificielle. Nisab agricole : 653 kg.</div>
            <div className="zakat-field-row">
              <Field label="Valeur récoltes irriguées naturellement (€)">
                <NumInput id="agri_natural" value={f.agri_natural} onChange={setField} />
                <span className="zakat-field-note">Taux : 10% (Ushr)</span>
              </Field>
              <Field label="Valeur récoltes irriguées artificiellement (€)">
                <NumInput id="agri_artificial" value={f.agri_artificial} onChange={setField} />
                <span className="zakat-field-note">Taux : 5% (demi-Ushr)</span>
              </Field>
            </div>
          </Section>

          {/* SECTION 8 – Cheptel */}
          <Section id="livestock" icon="🐄" title="Cheptel (Zakat al-An'am)" subtitle="Chameaux, bovins, ovins, caprins" total={`${f.livestock_camels + f.livestock_cattle + f.livestock_sheep} animaux`} collapsed={collapsed.livestock} onToggle={toggleSection}>
            <div className="zakat-info-box">La Zakat cheptel s&apos;applique aux animaux paissant librement (Sa&apos;ima). Peut être convertie en valeur monétaire.</div>
            <table className="zakat-livestock-table">
              <thead>
                <tr><th>Animal</th><th>Nombre</th><th>Nisab min.</th><th>Zakat due</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>🐪 Chameaux</td>
                  <td><input type="number" value={f.livestock_camels} min="0" onChange={e => setField('livestock_camels', parseInt(e.target.value) || 0)} /></td>
                  <td>5</td>
                  <td className="zakat-livestock-zakat">{f.livestock_camels < 5 ? 'Exempté' : `${camel.label} ≈ ${fmt(camel.val)}`}</td>
                </tr>
                <tr>
                  <td>🐄 Bovins</td>
                  <td><input type="number" value={f.livestock_cattle} min="0" onChange={e => setField('livestock_cattle', parseInt(e.target.value) || 0)} /></td>
                  <td>30</td>
                  <td className="zakat-livestock-zakat">{f.livestock_cattle < 30 ? 'Exempté' : `${cattle.label} ≈ ${fmt(cattle.val)}`}</td>
                </tr>
                <tr>
                  <td>🐑 Ovins / Caprins</td>
                  <td><input type="number" value={f.livestock_sheep} min="0" onChange={e => setField('livestock_sheep', parseInt(e.target.value) || 0)} /></td>
                  <td>40</td>
                  <td className="zakat-livestock-zakat">{f.livestock_sheep < 40 ? 'Exempté' : `${sheep.label} ≈ ${fmt(sheep.val)}`}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* SECTION 9 – Dettes */}
          <Section id="debts" icon="📉" title="Dettes déductibles" subtitle="Dettes immédiates à déduire de l'assiette zakatiable" total={debts > 0 ? '− ' + fmtShort(debts) : '0 €'} collapsed={collapsed.debts} onToggle={toggleSection}>
            <div className="zakat-info-box"><strong>Quelles dettes sont déductibles ?</strong> Seules les dettes à court terme (12 mois) sont déductibles. Pour les prêts longs : seule la mensualité annuelle est déductible.</div>
            <div className="zakat-field-row">
              <Field label="Dettes personnelles immédiates" tip="Dettes dues dans les 12 prochains mois"><NumInput id="debt_personal" value={f.debt_personal} onChange={setField} /></Field>
              <Field label="Mensualités annuelles (prêts longs)" tip="12 mensualités de vos prêts immobiliers, auto, etc."><NumInput id="debt_annual_installments" value={f.debt_annual_installments} onChange={setField} /></Field>
            </div>
            <div className="zakat-field-row">
              <Field label="Factures / charges dues"><NumInput id="debt_bills" value={f.debt_bills} onChange={setField} /></Field>
              <Field label="Dettes commerciales immédiates"><NumInput id="debt_commercial" value={f.debt_commercial} onChange={setField} /></Field>
            </div>
          </Section>
        </div>

        {/* SIDEBAR */}
        <div className="zakat-sidebar">
          <div className="zakat-result-card">
            <div className="zakat-result-header">
              <h3>Résultat de votre Zakat</h3>
              <p>Calcul automatique en temps réel</p>
            </div>
            <div className="zakat-result-body">
              <div className={`zakat-nisab-status ${nisabStatus}`}>
                <span>{nisabIcon}</span>
                <span>{nisabText}</span>
              </div>
              {[
                ['💵 Liquidités', fmt(cash)],
                ['🏅 Or & Argent', fmt(precious)],
                ['📈 Investissements', fmt(invest)],
                ['🏠 Immobilier', fmt(realestate)],
                ['💼 Commerce', fmt(business)],
              ].map(([label, val]) => (
                <div className="zakat-result-line" key={label}>
                  <span className="rl-label">{label}</span>
                  <span className="rl-value">{val}</span>
                </div>
              ))}
              <div className="zakat-result-line">
                <span className="rl-label">📉 Dettes déduites</span>
                <span className="rl-value deduct">− {fmt(debts)}</span>
              </div>
              <div className="zakat-result-line" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 4, paddingTop: 14 }}>
                <span className="rl-label" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Base zakatiable</span>
                <span className="rl-value" style={{ fontSize: 16 }}>{fmt(base)}</span>
              </div>

              <div className="zakat-result-total">
                <div className="zk-label">ZAKAT DUE (2,5%)</div>
                <div className="zk-amount">{fmt(zakatStandard)}</div>
                <div className="zk-currency">euros</div>
              </div>

              {hasSpecial && (
                <div>
                  <div className="zakat-divider-label"><span>ZAKAT SPÉCIALE</span></div>
                  {agriZakat > 0 && (
                    <div className="zakat-breakdown-item">
                      <span className="bi-label">🌾 Zakat agricole</span>
                      <span className="bi-val">{fmt(agriZakat)}</span>
                    </div>
                  )}
                  {livestockZakatVal > 0 && (
                    <div className="zakat-breakdown-item">
                      <span className="bi-label">🐄 Zakat cheptel</span>
                      <span className="bi-val">{fmt(livestockZakatVal)}</span>
                    </div>
                  )}
                  <div className="zakat-result-total" style={{ marginTop: 12 }}>
                    <div className="zk-label">ZAKAT TOTALE</div>
                    <div className="zk-amount" style={{ fontSize: 28 }}>{fmt(totalZakat)}</div>
                  </div>
                </div>
              )}

              <div className="zakat-result-note">Ce simulateur est fourni à titre indicatif. Consultez un savant pour les situations complexes.</div>

              <button className="zakat-cta-btn" onClick={() => setModalOpen(true)}>📄 Générer ma synthèse Zakat</button>
              <a href="https://www.amana-patrimoine.fr" className="zakat-cta-btn zakat-cta-btn-outline">Conseil patrimonial halal →</a>
            </div>
          </div>

          {/* 8 bénéficiaires */}
          <div className="zakat-extra-box">
            <h4>☪ Les 8 bénéficiaires de la Zakat</h4>
            <div style={{ fontSize: 12, color: '#444b3f', lineHeight: 1.9 }}>
              {['Fuqaraa — Les pauvres', 'Masakin — Les démunis', 'Amil — Les collecteurs de Zakat', 'Muallaf — Les nouveaux convertis', 'Riqab — Libération des esclaves', 'Gharimin — Les endettés', 'Fi Sabilillah — La cause d\'Allah', 'Ibn Sabil — Le voyageur'].map((item, i) => (
                <div key={i}>{['①','②','③','④','⑤','⑥','⑦','⑧'][i]} {item}</div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#5c6b65', marginTop: 10, fontStyle: 'italic' }}>Sourate At-Tawbah (9:60)</p>
          </div>

          {/* Hawl */}
          <div className="zakat-gold-box">
            <h4>⏳ Rappel : le Hawl (année lunaire)</h4>
            <p style={{ fontSize: 12, color: '#444b3f', lineHeight: 1.7 }}>La Zakat n&apos;est due que sur les biens possédés depuis au moins un an lunaire (354 jours).</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="zakat-faq-section">
        <div className="zakat-faq-inner">
          <div className="zakat-faq-header">
            <div className="zakat-faq-badge">FAQ</div>
            <h2>Questions fréquentes & Sources</h2>
            <p>Tout ce que vous devez savoir sur le calcul de la Zakat : sources coraniques, méthodes jurisprudentielles et règles pratiques.</p>
          </div>
          <div className="zakat-faq-grid">
            <div>
              <div className="zakat-faq-group-title">⚖️ Fondements & Obligations</div>
              <FaqItem question="Qu'est-ce que la Zakat et sur quelle base est-elle obligatoire ?">
                <p>La Zakat est le troisième pilier de l&apos;Islam. Elle est obligatoire pour tout musulman adulte, sain d&apos;esprit, libre et possédant une richesse au-dessus du Nisab depuis un an lunaire complet (Hawl).</p>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>Coran, Sourate Al-Baqarah (2:43)</li><li>Coran, Sourate At-Tawbah (9:103)</li><li>Hadith (Bukhari &amp; Muslim)</li></ul></div>
              </FaqItem>
              <FaqItem question="Comment est calculé le Nisab ?">
                <p>Deux références selon la Sunnah du Prophète ﷺ :</p>
                <ul style={{ margin: '8px 0 8px 16px', fontSize: 13, lineHeight: 1.8 }}>
                  <li><strong>Or :</strong> 85 grammes d&apos;or pur</li>
                  <li><strong>Argent :</strong> 595 grammes d&apos;argent pur</li>
                </ul>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>Hadith (Abu Dawud, n°1559)</li><li>Résolution ECFR n°4/3</li></ul></div>
              </FaqItem>
              <FaqItem question="Qu'est-ce que le Hawl (année lunaire) ?">
                <p>Le Hawl est la condition de durée de possession : la Zakat n&apos;est due que sur les biens possédés en continu pendant au moins un an lunaire (354 jours). Exception : les récoltes agricoles, zakatiables à chaque récolte.</p>
                <div className="zakat-faq-source"><strong>Source :</strong><ul><li>Al-Nawawi, Al-Majmu&apos;, vol. 5</li></ul></div>
              </FaqItem>

              <div className="zakat-faq-group-title" style={{ marginTop: 24 }}>🏅 Or, Argent & Bijoux</div>
              <FaqItem question="Les bijoux en or portés sont-ils zakatiables ?">
                <p>Les quatre écoles ne s&apos;accordent pas :</p>
                <ul style={{ margin: '8px 0 8px 16px', fontSize: 13, lineHeight: 1.9 }}>
                  <li><strong>Hanafi / Hanbali :</strong> Zakatiables</li>
                  <li><strong>Maliki / Shafi&apos;i :</strong> Exemptés si portés régulièrement</li>
                </ul>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>Al-Kasani, Bada&apos;i al-Sana&apos;i</li><li>Al-Nawawi, Al-Majmu&apos;</li></ul></div>
              </FaqItem>

              <div className="zakat-faq-group-title" style={{ marginTop: 24 }}>📈 Investissements modernes</div>
              <FaqItem question="Comment calculer la Zakat sur les actions en bourse ?">
                <p>Deux méthodes reconnues :</p>
                <ul style={{ margin: '8px 0 8px 16px', fontSize: 13, lineHeight: 1.9 }}>
                  <li><strong>Méthode simple :</strong> 2,5% de la valeur totale du portefeuille</li>
                  <li><strong>Méthode purifiée :</strong> % actifs zakatiables × participation × 2,5%</li>
                </ul>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>AAOIFI Standard n°35</li><li>Résolution OCI n°9/3</li></ul></div>
              </FaqItem>
              <FaqItem question="La Zakat s'applique-t-elle aux cryptomonnaies ?">
                <p>La majorité des savants contemporains les considèrent comme des actifs (amwal) soumis à la Zakat à 2,5% si détenus depuis un Hawl complet.</p>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>Fatwa ECFR 2018</li><li>Zakat Foundation of America</li></ul></div>
              </FaqItem>
            </div>

            <div>
              <div className="zakat-faq-group-title">🏠 Immobilier & Dettes</div>
              <FaqItem question="Ma résidence principale est-elle soumise à la Zakat ?">
                <p>Non. La résidence principale est exemptée par consensus (ijma&apos;). La Zakat s&apos;applique uniquement aux biens d&apos;investissement ou à vendre.</p>
                <div className="zakat-faq-source"><strong>Source :</strong><ul><li>Ibn Hazm, Al-Muhalla</li></ul></div>
              </FaqItem>
              <FaqItem question="Comment déduire les dettes de la Zakat ?">
                <p>Seules les dettes à court terme (12 mois) sont déductibles. Pour les prêts longs, l&apos;opinion majoritaire en Europe retient uniquement la mensualité annuelle.</p>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>Sheikh Al-Qaradawi, Fiqh Al-Zakat</li><li>Résolution ECFR 2004</li></ul></div>
              </FaqItem>

              <div className="zakat-faq-group-title" style={{ marginTop: 24 }}>🌾 Zakat spéciale</div>
              <FaqItem question="Qu'est-ce que la Zakat agricole (Ushr) ?">
                <p>La Zakat agricole s&apos;applique sur les récoltes :</p>
                <ul style={{ margin: '8px 0 8px 16px', fontSize: 13, lineHeight: 1.9 }}>
                  <li><strong>10% :</strong> Cultures irriguées naturellement</li>
                  <li><strong>5% :</strong> Cultures irriguées artificiellement</li>
                </ul>
                <div className="zakat-faq-source"><strong>Source :</strong><ul><li>Hadith (Bukhari n°1483)</li></ul></div>
              </FaqItem>
              <FaqItem question="Comment fonctionne la Zakat sur le cheptel ?">
                <p>Barèmes classiques selon la Sunnah :</p>
                <ul style={{ margin: '8px 0 8px 16px', fontSize: 13, lineHeight: 1.9 }}>
                  <li><strong>Chameaux :</strong> Nisab = 5</li>
                  <li><strong>Bovins :</strong> Nisab = 30</li>
                  <li><strong>Ovins/Caprins :</strong> Nisab = 40</li>
                </ul>
                <div className="zakat-faq-source"><strong>Source :</strong><ul><li>Lettre de Zakat du Prophète ﷺ (Abu Dawud n°1567)</li></ul></div>
              </FaqItem>

              <div className="zakat-faq-group-title" style={{ marginTop: 24 }}>📐 Méthode de calcul</div>
              <FaqItem question="Comment ce simulateur calcule-t-il la Zakat ?">
                <div className="zakat-faq-formula">
                  Base zakatiable = Liquidités + Or & Argent + Investissements + Immobilier + Commerce − Dettes<br /><br />
                  <strong>Zakat al-Mal = Base zakatiable × 2,5%</strong>
                </div>
              </FaqItem>
              <FaqItem question="Pourquoi 2,5% et pas un autre taux ?">
                <p>Le taux de 2,5% (= 1/40) est établi par consensus (ijma&apos;) de tous les savants depuis les Compagnons du Prophète ﷺ.</p>
                <div className="zakat-faq-source"><strong>Sources :</strong><ul><li>Hadith (Abu Dawud n°1574)</li><li>Al-Marghinani, Al-Hidaya</li></ul></div>
              </FaqItem>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SYNTHÈSE */}
      {modalOpen && (
        <div className="zakat-modal-overlay open" onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="zakat-modal-box">
            <div className="zakat-modal-header">
              <div>
                <h3>Générer ma synthèse Zakat</h3>
                <p>Personnalisez votre document avant de le télécharger</p>
              </div>
              <button className="zakat-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="zakat-modal-body">
              <div className="zakat-modal-fields">
                <div className="zakat-modal-field">
                  <label>Votre nom complet</label>
                  <input type="text" value={synName} onChange={e => setSynName(e.target.value)} placeholder="Ex : Mohammed Al-Amine" />
                </div>
                <div className="zakat-modal-field">
                  <label>Année hijri de référence</label>
                  <input type="text" value={synHijri} onChange={e => setSynHijri(e.target.value)} />
                </div>
                <div className="zakat-modal-field">
                  <label>Date de calcul</label>
                  <input type="date" value={synDate} onChange={e => setSynDate(e.target.value)} />
                </div>
                <div className="zakat-modal-field">
                  <label>Madhab suivi</label>
                  <select value={synMadhab} onChange={e => setSynMadhab(e.target.value)}>
                    <option>Hanafi</option>
                    <option>Maliki</option>
                    <option>Shafi&apos;i</option>
                    <option>Hanbali</option>
                    <option>Non précisé</option>
                  </select>
                </div>
                <div className="zakat-modal-field" style={{ gridColumn: '1/-1' }}>
                  <label>Notes personnelles (optionnel)</label>
                  <textarea rows={3} value={synNotes} onChange={e => setSynNotes(e.target.value)} placeholder="Ex : Zakat calculée à partir du 1er Ramadan 1446..." />
                </div>
              </div>
              <div className="zakat-modal-preview">
                <div style={{ fontSize: 12, color: '#5c6b65', marginBottom: 8 }}>Aperçu du document :</div>
                <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse', lineHeight: 1.9 }}>
                  <tbody>
                    <tr><td style={{ color: '#5c6b65', width: '45%' }}>Bénéficiaire</td><td style={{ fontWeight: 600, color: '#1a3c34' }}>{synName || '—'}</td></tr>
                    <tr><td style={{ color: '#5c6b65' }}>Date</td><td style={{ fontWeight: 600 }}>{synDate} / {synHijri}</td></tr>
                    <tr><td style={{ color: '#5c6b65' }}>Madhab</td><td style={{ fontWeight: 600 }}>{synMadhab}</td></tr>
                    <tr><td style={{ color: '#5c6b65' }}>Base zakatiable</td><td style={{ fontWeight: 600 }}>{fmt(base)}</td></tr>
                    <tr><td style={{ color: '#5c6b65' }}>Zakat due (2,5%)</td><td style={{ fontWeight: 700, color: '#b08d57', fontSize: 14 }}>{fmt(zakatStandard)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="zakat-modal-footer">
              <button className="zakat-cta-btn" style={{ margin: 0, maxWidth: 260 }} onClick={downloadSynthesis}>⬇ Télécharger le PDF</button>
              <button className="zakat-cta-btn zakat-cta-btn-outline" style={{ margin: 0, maxWidth: 160, background: 'transparent', border: '1.5px solid #e0d9cc', color: '#444b3f' }} onClick={() => setModalOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

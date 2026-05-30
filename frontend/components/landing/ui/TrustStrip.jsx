import { TRUST_STRIP_ITEMS } from '../../../lib/landing/data';

export default function TrustStrip({ dark = false }) {
    return (
        <div className={`lp-trust ${dark ? 'lp-trust--dark' : ''}`}>
            {TRUST_STRIP_ITEMS.map((item, index) => (
                <div key={item.k} className="lp-trust__item">
                    <span className="lp-trust__key">{item.k}</span>
                    <span className="lp-trust__val">{item.v}</span>
                    {index < TRUST_STRIP_ITEMS.length - 1 && <span className="lp-trust__sep" />}
                </div>
            ))}
        </div>
    );
}

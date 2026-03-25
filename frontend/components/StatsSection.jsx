'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_STATS = [
    { display: '2020', label: 'Année de création' },
    { display: '100+', label: 'Clients accompagnés' },
    { display: '100%', label: 'Indépendant & transparent' },
    { display: '5', label: 'Expertises patrimoniales' },
];

/**
 * Parse a display string like "100+", "100%", "2020" into:
 *   { numeric: 100, prefix: '', suffix: '+' }
 */
function parseDisplay(raw) {
    if (!raw) return { numeric: 0, prefix: '', suffix: '' };
    const str = String(raw);
    // Support legacy { value, prefix, suffix } format
    const match = str.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
    if (match) {
        return { numeric: Number(match[2]) || 0, prefix: match[1], suffix: match[3] };
    }
    return { numeric: Number(str.replace(/[^0-9]/g, '')) || 0, prefix: '', suffix: '' };
}

function CountUp({ display, duration = 1800 }) {
    const { numeric, prefix, suffix } = parseDisplay(display);
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    const runAnimation = useRef(null);

    useEffect(() => {
        runAnimation.current = () => {
            if (started.current) return;
            started.current = true;
            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * numeric));
                if (progress < 1) requestAnimationFrame(step);
                else setCount(numeric);
            };
            requestAnimationFrame(step);
        };
    }, [numeric, duration]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) runAnimation.current?.(); },
            { threshold: 0.1 }
        );
        observer.observe(el);

        // Fire immediately if already visible
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            runAnimation.current?.();
        }

        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString('fr-FR')}{suffix}
        </span>
    );
}

export default function StatsSection({ stats }) {
    // Support both new { display, label } and legacy { value, suffix, prefix, label } formats
    const raw = stats && stats.length > 0 ? stats : DEFAULT_STATS;
    const items = raw.map(s => ({
        display: s.display ?? `${s.prefix ?? ''}${s.value ?? ''}${s.suffix ?? ''}`,
        label: s.label,
    }));

    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    {items.map((stat, i) => (
                        <div key={i} className="stat-item">
                            <div className="stat-value">
                                <CountUp display={stat.display} />
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

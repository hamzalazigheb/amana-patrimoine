'use client';

/**
 * Push a dataLayer event for GTM/GA4/Meta tracking.
 * Safe to call even if GTM isn't loaded.
 */
export function track(eventName, params = {}) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
}

/** Track a Calendly / RDV CTA click */
export function trackCalendlyClick(source = 'unknown') {
    track('calendly_click', {
        event_category: 'Conversion',
        event_label: source,
        value: 1,
    });
    // GA4 specific
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
            event_category: 'Conversion',
            event_label: source,
            value: 100,
            currency: 'EUR',
        });
    }
}

/** Track a section view (scroll into view) */
export function trackSectionView(sectionName) {
    track('section_view', { section: sectionName });
}

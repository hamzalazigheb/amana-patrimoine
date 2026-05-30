export function getLandingUrls() {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

    return {
        siteUrl,
        parcoursUrl:
            process.env.NEXT_PUBLIC_LANDING_PARCOURS_URL ||
            'https://platform.amana-patrimoine.fr/onboard',
        calendlyUrl:
            process.env.NEXT_PUBLIC_CALENDLY_URL ||
            'https://calendly.com/amana-patrimoine/30min',
        loginUrl: process.env.NEXT_PUBLIC_LANDING_LOGIN_URL || '/admin/login',
        contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@amana-patrimoine.fr',
        financeUrl: '/finance-islamique',
        contactUrl: '/contact',
        mentionsUrl: '/mentions-legales',
    };
}

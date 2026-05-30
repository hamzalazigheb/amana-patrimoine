'use client';

import './landing.css';
import { getLandingUrls } from '../../lib/landing/urls';
import LandingFooter from './ui/Footer';
import {
    DeliverablesSection,
    OffersSection,
    WhyAmanaSection,
} from './sections/ContentSections';

export default function LandingPlatform() {
    const urls = getLandingUrls();

    return (
        <div className="lp">
            <DeliverablesSection />
            <OffersSection urls={urls} />
            <WhyAmanaSection />
            <LandingFooter urls={urls} />
        </div>
    );
}

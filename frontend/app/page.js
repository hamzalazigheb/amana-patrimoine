import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import CabinetVision from '../components/CabinetVision';
import Services from '../components/Services';
import Methodology from '../components/Methodology';
import Education from '../components/Education';
import Testimonials from '../components/Testimonials';
import PartnersSection from '../components/PartnersSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <TrustIndicators />
                <CabinetVision />
                <Services />
                <Methodology />
                <Education />
                <Testimonials />
                <PartnersSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}


import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ZakatCalculator from '../../components/ZakatCalculator';
import './zakat.css';

export const metadata = {
    title: 'Calculateur de Zakat Islamique - Simulateur Gratuit',
    description: 'Calculez votre Zakat en ligne avec notre simulateur islamique complet : liquidités, or, investissements, immobilier, commerce, cheptel. Conforme à la jurisprudence islamique.',
};

export default function SimulateursPage() {
    return (
        <>
            <Header />
            <main id="main-content">
                <ZakatCalculator />
            </main>
            <Footer />
        </>
    );
}

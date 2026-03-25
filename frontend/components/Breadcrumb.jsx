import Link from 'next/link';

export default function Breadcrumb({ items }) {
    const all = [{ name: 'Accueil', href: '/' }, ...items];

    return (
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <div className="container">
                <ol className="breadcrumb-list">
                    {all.map((item, i) => {
                        const isLast = i === all.length - 1;
                        return (
                            <li key={i} className="breadcrumb-item">
                                {!isLast ? (
                                    <>
                                        <Link href={item.href} className="breadcrumb-link">{item.name}</Link>
                                        <span className="breadcrumb-sep" aria-hidden="true">›</span>
                                    </>
                                ) : (
                                    <span className="breadcrumb-current" aria-current="page">{item.name}</span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}

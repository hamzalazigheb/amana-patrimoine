'use client';

export default function ContentSection({
    id,
    label,
    title,
    intro,
    children,
    background = 'cream',
    align = 'left',
    image,
    imageSide = 'right'
}) {
    const bgClass = background === 'cream' ? '' :
        background === 'beige' ? 'content-section-beige' :
            background === 'navy' ? 'content-section-navy' : '';

    return (
        <section id={id} className={`content-section ${bgClass}`}>
            <div className="container">
                <div className={`content-section-grid ${image ? 'has-image' : ''} ${imageSide === 'left' ? 'image-left' : ''}`}>
                    <div className="content-section-main">
                        {(label || title || intro) && (
                            <div className={`content-section-header ${align === 'center' ? 'text-center' : ''}`}>
                                {label && <span className="section-label">{label}</span>}
                                {title && <h2 className="section-title">{title}</h2>}
                                {intro && <p className="section-desc">{intro}</p>}
                            </div>
                        )}
                        <div className="content-section-body">
                            {children}
                        </div>
                    </div>
                    {image && (
                        <div className="content-section-image">
                            <img src={image} alt={title || 'Section image'} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

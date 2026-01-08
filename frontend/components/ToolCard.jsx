'use client';

export default function ToolCard({ icon, title, description, features }) {
    return (
        <div className="tool-card">
            {icon && <div className="tool-card-icon">{icon}</div>}
            <h3 className="tool-card-title">{title}</h3>
            {description && <p className="tool-card-desc">{description}</p>}
            {features && features.length > 0 && (
                <ul className="tool-card-features">
                    {features.map((feature, index) => (
                        <li key={index}>
                            <span className="feature-dot"></span>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

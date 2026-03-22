'use client';

import { useState } from 'react';

export default function RetraiteFaqItem({ item }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`faq-item ${open ? 'faq-item-open' : ''}`}>
            <button className="faq-question" aria-expanded={open} onClick={() => setOpen(!open)}>
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>
            {open && <p className="faq-answer">{item.answer}</p>}
        </div>
    );
}

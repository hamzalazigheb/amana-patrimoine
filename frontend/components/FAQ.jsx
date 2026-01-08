'use client';

import { useState } from 'react';

export default function FAQ({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-list">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
                >
                    <button
                        className="faq-question"
                        onClick={() => toggle(index)}
                        aria-expanded={openIndex === index}
                    >
                        <span>{item.question}</span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="faq-icon"
                        >
                            <polyline points={openIndex === index ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                        </svg>
                    </button>
                    <div className="faq-answer">
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    faqs: FaqItem[];
}

const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
    // Generate JSON-LD for FAQPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="space-y-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {faqs.map((faq, index) => (
                <details key={index} className="group bg-white rounded-lg shadow-sm border border-gray-200 open:shadow-md transition-all duration-300">
                    <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-800 list-none select-none">
                        <span>{faq.question}</span>
                        <span className="transition-transform duration-300 group-open:rotate-180">
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        </span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 mt-2 pt-2">
                        {faq.answer}
                    </div>
                </details>
            ))}
        </div>
    );
};

export default FaqAccordion;

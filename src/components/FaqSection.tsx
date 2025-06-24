import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const FaqSection = () => {
  const faqs = [
    {
      question: 'What plumbing services do you offer?',
      answer: 'I am a Master Plumber with over 35 years of experience providing expert plumbing solutions across Texas. I do xyz (still need to fill this part out)'
    },
    {
      question: 'What is your service area and availability?',
      answer: 'I serve Bandera, Bexar, Kendall, and all surrounding counties with reliable and professional service you can count on.'
    },
    {
      question: 'What are your payment options? ',
      answer: 'There will be an answer here eventually, but for now all we have is a placeholder.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 bg-tan">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="faq-header font-semibold mb-4 md:mb-6 text-blue tracking-normal">Frequently Asked Questions</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-blue mb-8" style={{ color: 'var(--color-brand-accent)' }}>
            Find answers to common questions about our plumbing services, service area, and payment options.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-blue rounded-xl overflow-hidden shadow-sm md:hover:shadow-md transition-all duration-300"
            >
              <button
                className="w-full text-left p-4 md:p-6 min-h-[44px] bg-white flex justify-between items-center md:hover:bg-tan transition-all duration-300"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-base md:text-lg" style={{ color: 'var(--color-brand-accent)' }}>{faq.question}</span>
                <div className="flex items-center justify-center w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-white">
                  <svg 
                    className={cn(
                      "w-6 h-6 transition-transform duration-300",
                      openIndex === index ? "rotate-180" : "",
                    )} 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                      stroke="var(--color-brand-accent)"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 bg-white",
                  openIndex === index ? "max-h-96 p-4 md:p-6" : "max-h-0"
                )}
              >
                <p className="text-blue text-base md:text-lg leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-base md:text-lg mb-6" style={{ color: 'var(--color-brand-accent)' }}>Can't find the answer you're looking for?</p>
          <Button asChild variant="darkRed" className="font-medium text-base md:text-lg min-h-[44px] px-6 py-3">
            <a 
              href="tel:830-444-5195" 
              className="flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-brand-accent)', color: '#fff', borderRadius: '0.375rem', boxShadow: 'none', border: 'none' }}
            >
              <span style={{ color: '#fff' }}>Give me a call</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
                style={{ color: '#fff' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" stroke="#fff" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

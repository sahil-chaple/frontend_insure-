import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    id: 'q1',
    question: 'How do I buy insurance on this platform?',
    answer:
      'Simply select a category, compare plans recommended by our AI, fill in your details, and complete the payment digitally. Your policy documents arrive in your inbox within minutes.',
  },
  {
    id: 'q2',
    question: 'How do I file a claim?',
    answer:
      'Head to the Claims section in your Dashboard, click "File Claim", upload the required supporting documents, and our team will process it — typically within 24–48 hours.',
  },
  {
    id: 'q3',
    question: 'Which plan should I choose?',
    answer:
      "Use our smart recommendation engine in your profile, or book a free consultation with one of our certified advisors who'll guide you to the best fit for your needs and budget.",
  },
  {
    id: 'q4',
    question: 'Can I renew my policy online?',
    answer:
      'Yes — 100% online. You will receive in-app and email reminders before your policy expires. Click Renew in your Dashboard, verify your details, and complete the payment in seconds.',
  },
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <section className="mb-20">
      {/* Section header */}
      <div className="mb-8 text-center">
        <h2 className="text-[1.75rem] sm:text-[2rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-[0.9375rem] text-[var(--text-secondary)] max-w-[520px] mx-auto">
          Everything you need to know about buying, managing, and claiming your insurance.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {FAQS.map((faq, i) => {
          const isOpen = openId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[16px] border overflow-hidden transition-colors duration-200"
              style={{
                borderColor: isOpen ? 'var(--brand-500)' : 'var(--border-low)',
                background: 'var(--bg-card)',
                boxShadow: isOpen ? '0 4px 24px rgba(31,110,242,0.1)' : 'var(--shadow-card)',
              }}
            >
              {/* Trigger */}
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 px-6 text-left focus:outline-none"
                style={{ minHeight: '60px', padding: '0 24px' }}
              >
                <span
                  className="font-semibold text-[0.9375rem] leading-snug"
                  style={{ color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0"
                  style={{ color: isOpen ? 'var(--brand-400)' : 'var(--text-muted)' }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-[var(--border-subtle)]">
                      <p className="text-[0.875rem] text-[var(--text-secondary)] leading-[1.8]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

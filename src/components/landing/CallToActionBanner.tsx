import { motion } from 'framer-motion';
import { Search, Phone, Shield } from 'lucide-react';

export default function CallToActionBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="mb-8 relative overflow-hidden rounded-[24px] border border-[var(--border-low)]"
      style={{
        background: 'linear-gradient(130deg, rgba(31,110,242,0.11) 0%, rgba(124,58,237,0.09) 60%, rgba(16,185,129,0.07) 100%)',
        boxShadow: '0 8px 48px rgba(31,110,242,0.12)',
      }}
    >
      {/* Decorative blobs */}
      <br />
      <div
        className=" absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'var(--brand-500)', transform: 'translate(-35%, -40%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'var(--accent-500)', transform: 'translate(35%, 40%)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20 w-full"

      >        {/* Icon badge */}
        <div
          className="w-14 h-14 flex items-center justify-center rounded-[16px] mb-6"
          style={{
            background: 'linear-gradient(135deg, var(--brand-500), var(--accent-500))',
            boxShadow: '0 8px 24px rgba(31,110,242,0.35)',
          }}
        >
          <Shield size={24} color="#fff" />
        </div>
        <br className="hidden sm:block" />
        <h2 className="mt-8 text-[1.875rem] sm:text-[2.25rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-4">
          Still confused about choosing
          the right insurance?
        </h2>
        <br className="hidden sm:block" />

        <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-10 max-w-[480px]">
          Don't leave your future to chance. Our certified advisors will craft a personalised plan that matches your lifestyle and budget — completely free.
        </p>
        <br className="hidden sm:block" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 focus:outline-none text-[0.9375rem]"
            style={{
              background: 'linear-gradient(135deg, var(--brand-500), var(--accent-500))',
              boxShadow: '0 6px 20px rgba(31,110,242,0.4)',
              minHeight: '48px', width: '270px'
            }}
          >
            <Search size={17} />
            Compare Policies
          </button>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[12px] font-semibold text-[var(--text-primary)] border border-[var(--border-mid)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 active:scale-95 focus:outline-none text-[0.9375rem]"
            style={{ background: 'rgba(255,255,255,0.04)', minHeight: '48px', width: '350px' }}
          >
            <Phone size={17} />
            Book Free Consultation
          </button>
        </div>
        <br className='hidden sm:block' />
        <br className='hidden sm:block' />
      </div>
    </motion.section>
  );
}

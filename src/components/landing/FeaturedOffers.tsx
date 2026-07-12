import { motion } from 'framer-motion';
import { TrendingUp, HeartPulse, Calculator } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    badge: 'Investment',
    icon: TrendingUp,
    title: 'Invest ₹10K',
    subtitle: 'Get ₹1 Crore Return',
    desc: 'Start small, grow big. High-return market-linked plans with life cover.',
    cta: 'Learn More',
    gradBg: 'linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(5,150,105,0.07) 100%)',
    border: 'rgba(16,185,129,0.22)',
    accent: '#22c55e',
    blob: 'rgba(16,185,129,0.3)',
  },
  {
    id: 2,
    badge: 'Free Session',
    icon: HeartPulse,
    title: 'Book a Free Health Consultation',
    subtitle: 'Talk to an expert doctor',
    desc: 'Get personalised health insurance guidance from our certified advisors.',
    cta: 'Book Now',
    gradBg: 'linear-gradient(135deg, rgba(59,130,246,0.14) 0%, rgba(37,99,235,0.07) 100%)',
    border: 'rgba(59,130,246,0.22)',
    accent: '#3b82f6',
    blob: 'rgba(59,130,246,0.3)',
  },
  {
    id: 3,
    badge: 'Calculator',
    icon: Calculator,
    title: 'Plan with our SIP Calculator',
    subtitle: 'Smart wealth planning made easy',
    desc: 'Visualise your investment growth and plan for big life goals effortlessly.',
    cta: 'Calculate',
    gradBg: 'linear-gradient(135deg, rgba(139,92,246,0.14) 0%, rgba(109,40,217,0.07) 100%)',
    border: 'rgba(139,92,246,0.22)',
    accent: '#a78bfa',
    blob: 'rgba(139,92,246,0.3)',
  },
];

export default function FeaturedOffers() {
  return (
    <section className="mb-20">
      {/* Section header */}
      <br />
      <br />
      <br />
      <div className="mb-8">
        <h2 className=" italic text-[1.75rem] sm:text-[2rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
          Exclusive Offers for You
        </h2>
        <br />
        <p className="italic mt-2 text-[0.9375rem] text-[var(--text-secondary)] max-w-[480px]">
          Take advantage of limited-time deals designed to give you the best value for your money.
        </p>
        <br />
        <br />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {OFFERS.map((offer, i) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.2 } }}
            className="relative flex flex-col rounded-[20px] p-7 overflow-hidden"
            style={{
              background: offer.gradBg,
              border: `1px solid ${offer.border}`,
              minHeight: '210px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Decorative blob */}
            <div
              className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{ background: offer.blob, transform: 'translate(30%, -30%)' }}
            />

            {/* Badge */}
            <span
              className="self-start text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-4"
              style={{
                background: `${offer.accent}20`,
                color: offer.accent,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '15px',
                width: '25%',
                textAlign: 'center'

              }}
            >
              {offer.badge}
            </span>

            {/* Icon */}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-[12px] mb-4"
              style={{
                background: `${offer.accent}15`, color: offer.accent,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '10px'
              }}
            >
              <offer.icon size={18} />
            </div>

            {/* Headline */}
            <h3 className="font-bold text-[1.125rem] text-[var(--text-primary)] leading-snug mb-1"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '10px'
              }}
            >
              {offer.title}
            </h3>
            <p className="text-[0.8125rem] font-medium mb-2" style={{
              color: offer.accent,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {offer.subtitle}
            </p>
            <p className="text-[0.8125rem] text-[var(--text-secondary)] leading-relaxed flex-1 mb-6"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '10px',
                textAlign: 'center'
              }}
            >
              {offer.desc}
            </p>

            {/* CTA */}
            <button
              className="self-start text-[0.8125rem] font-bold px-5 py-2 rounded-[10px] text-white transition-opacity hover:opacity-90 active:scale-95 focus:outline-none"
              style={{
                background: offer.accent,
                boxShadow: `0 4px 14px ${offer.blob}`,
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '10px',
                textAlign: 'center',
                marginBottom: '15px'
              }}
            >
              {offer.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

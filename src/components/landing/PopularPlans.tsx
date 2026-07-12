import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { motion } from 'framer-motion';
import {
  HeartPulse,
  Car,
  Users,
  Plane,
  MonitorCheck,
  Cat,
} from 'lucide-react';

const PLANS = [
  {
    id: 'car',
    title: 'Car Insurance',
    desc: 'Zero depreciation and instant roadside assistance nationwide.',
    icon: Car,
    color: '#3b82f6',
  },
  {
    id: 'life',
    title: 'Life Insurance',
    desc: "Secure your family's financial future with 1 Crore+ cover.",
    icon: Users,
    color: '#a78bfa',
  },
  {
    id: 'travel',
    title: 'Travel Insurance',
    desc: 'Cashless global medical cover for stress-free international trips.',
    icon: Plane,
    color: '#f59e0b',
  },

  {
    id: 'cyber',
    title: 'Cyber Insurance',
    desc: 'Full protection against digital fraud and identity theft.',
    icon: MonitorCheck,
    color: '#ef4444',
  },
  {
    id: 'pet',
    title: 'Pet Insurance',
    desc: "Affordable vet cover for your pet's health and happiness.",
    icon: Cat,
    color: '#ec4899',
  },
  {
    id: 'health',
    title: 'Health Insurance',
    desc: 'Comprehensive coverage with cashless treatment at 8,000+ hospitals.',
    icon: HeartPulse,
    color: '#22c55e',
  },

];

export default function PopularPlans() {
  return (
    <motion.section
      className="mt-24 mb-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <br />
          <br />
          <br />
          <h2 className="italic text-[1.75rem] sm:text-[2rem] font-bold text-[var(--text-primary)] tracking-tight leading-tight">
            Popular Insurance Plans
          </h2>
          <br />

          <p className="italic mt-2 max-w-[460px] text-[15px] leading-7 text-[var(--text-secondary)]">
            Our most trusted policies — browse, compare, and pick the one that
            fits you best.
          </p>
          <br />
          <br />
        </div>
      </div>

      {/* Swiper Navigation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .plans-swiper .swiper-button-next,
          .plans-swiper .swiper-button-prev{
            color:var(--brand-500);
            background:var(--bg-card);
            border:1px solid var(--border-low);
            width:40px;
            height:40px;
            border-radius:12px;
            transition:.25s;
            top:45%;
          }

          .plans-swiper .swiper-button-next:hover,
          .plans-swiper .swiper-button-prev:hover{
            border-color:var(--brand-500);
            background:#202020;
          }

          .plans-swiper .swiper-button-next::after,
          .plans-swiper .swiper-button-prev::after{
            font-size:14px;
            font-weight:700;
          }
        `,
        }}
      />

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.1}
        className="plans-swiper !overflow-visible"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2.4,
          },
          1024: {
            slidesPerView: 3.2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {PLANS.map((plan) => (
          <SwiperSlide key={plan.id} className="!h-auto">
            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group h-full rounded-2xl border border-[var(--border-low)] bg-[var(--bg-card)] p-6"
              style={{
                minHeight: 220,
                textAlign: 'center',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: `${plan.color}18`,
                  color: plan.color,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
              >
                <plan.icon size={22} />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
                {plan.title}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-7 text-[var(--text-secondary)]"
                style={{
                  padding: '15px'
                }}
              >
                {plan.desc}
              </p>

              <button className="rounded-full border border-[var(--border-mid)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--brand-500)] hover:bg-[#3b82f615] hover:text-[var(--brand-400)]"
                style={{
                  margin: 'auto'
                }}
              >
                View Plan →
              </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
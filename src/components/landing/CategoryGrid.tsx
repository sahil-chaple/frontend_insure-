import { motion } from 'framer-motion';
import {
  Shield, Users, Car, Heart, Activity, Plane,
  PiggyBank, Briefcase, Building, Landmark, Lock, Umbrella,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'health', title: 'Health Insurance', icon: Heart, tag: 'Popular', tagColor: '#22c55e' },
  { id: 'term', title: 'Term Insurance', icon: Shield, tag: 'Top Rated', tagColor: '#3b82f6' },
  { id: 'car', title: 'Car Insurance', icon: Car, tag: '', tagColor: '' },
  { id: 'bike', title: 'Bike Insurance', icon: Activity, tag: 'Lowest', tagColor: '#a78bfa' },
  { id: 'family', title: 'Family Insurance', icon: Users, tag: '', tagColor: '' },
  { id: 'travel', title: 'Travel Insurance', icon: Plane, tag: '', tagColor: '' },
  { id: 'invest', title: 'Investment Plans', icon: Landmark, tag: 'High ROI', tagColor: '#f59e0b' },
  { id: 'child', title: 'Child Plans', icon: PiggyBank, tag: '', tagColor: '' },
  { id: 'retire', title: 'Retirement Plans', icon: Umbrella, tag: '', tagColor: '' },
  { id: 'commer', title: 'Commercial Ins.', icon: Building, tag: '', tagColor: '' },
  { id: 'cyber', title: 'Cyber Insurance', icon: Lock, tag: 'New', tagColor: '#ef4444' },
  { id: 'pet', title: 'Pet Insurance', icon: Briefcase, tag: '', tagColor: '' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
};

export default function CategoryGrid() {
  return (
    <section className="mb-20 ">
      {/* Section header */}
      <br />
      <div className="mb-8  ">
        <h2 className="italic text-[1.75rem] mt-10 sm:text-[2rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
          Explore Insurance Categories
        </h2>
        <br />

        <p className="italic mt-2 text-[0.9375rem] text-[var(--text-secondary)] max-w-[520px]">
          Find the right plan for every stage of life — compare, select, and secure your future today.
        </p>
        <br />
        <br />

      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.18 } }}
            className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-[20px] border border-[var(--border-low)] bg-[var(--bg-card)] cursor-pointer text-left group transition-shadow focus:outline-none"
            style={{ minHeight: '110px', boxShadow: 'var(--shadow-card)' }}
            aria-label={cat.title}
          >
            {/* Hover border glow */}
            <span className="absolute inset-0 rounded-[20px] border border-[var(--brand-500)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

            {/* Tag ribbon */}
            {cat.tag && (
              <span
                className="w-20 text-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 text-[0.6rem] tracking-wide font-bold text-white rounded-full uppercase whitespace-nowrap"
                style={{ background: cat.tagColor }}
              >
                {cat.tag}
              </span>
            )}

            {/* Icon bubble */}
            <div
              className="w-12 h-12 flex items-center justify-center rounded-[14px] transition-colors duration-200"
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--text-muted)',
              }}
            >
              <cat.icon size={22} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <span className="text-[0.8125rem] font-semibold text-center leading-snug text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
              {cat.title}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}  
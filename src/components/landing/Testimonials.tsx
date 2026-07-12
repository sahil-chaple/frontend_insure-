import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1, name: 'Rahul Sharma', avatar: 'R', type: 'Health Insurance',
    text: 'Insurance buying was effortless. The AI suggestions were spot on and the entire process took less than five minutes.',
    rating: 5,
  },
  {
    id: 2, name: 'Priya Patel', avatar: 'P', type: 'Car Insurance',
    text: 'Claim settlement was super fast and completely cashless. I had a minor accident and everything was sorted within 24 hours.',
    rating: 5,
  },
  {
    id: 3, name: 'Amit Kumar', avatar: 'A', type: 'Term Life',
    text: 'The advisors guided me through all the fine print. Got a solid ₹1 Crore term plan at a surprisingly low premium.',
    rating: 5,
  },
  {
    id: 4, name: 'Sneha Gupta', avatar: 'S', type: 'Travel Insurance',
    text: 'Bought travel insurance minutes before boarding. The digital policy document was in my inbox before I reached the gate.',
    rating: 4,
  },
];

const AVATAR_COLORS = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b'];

export default function Testimonials() {
  return (
    <motion.section
      className="mb-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
    >
      {/* Section header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        style={{
          marginTop: '50px',
          marginBottom: '30px'
        }}
      >
        <div>
          <h2 style={{
            marginBottom: '10px',
            fontStyle: 'italic'
          }} className="text-[1.75rem] sm:text-[2rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-2 italic text-[0.9375rem] text-[var(--text-secondary)]">
            Trusted by thousands of happy policyholders across India.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-low)] bg-[var(--bg-card)] shrink-0">
          <span className="text-[0.9375rem] font-bold text-[var(--text-primary)]">4.8</span>
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
          </div>
          <span className="text-[0.75rem] text-[var(--text-muted)]">Average Rating</span>
        </div>
      </div>

      {/* Swiper styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .reviews-swiper .swiper-pagination-bullet {
          background: var(--text-muted); opacity: 0.45;
        }
        .reviews-swiper .swiper-pagination-bullet-active {
          background: var(--brand-500); opacity: 1;
        }
      `}} />

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        className="reviews-swiper !pb-12"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {REVIEWS.map((review, i) => (
          <SwiperSlide key={review.id} className="!h-auto">
            <div
              className="flex flex-col p-7 rounded-[20px] border border-[var(--border-low)] bg-[var(--bg-card)] h-full hover:border-[var(--border-mid)] transition-colors"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {/* Stars */}
              <div className=" flex justify-center text-yellow-400 gap-1 mb-5"
                style={{
                  padding: '10px'
                }}
              >
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={15} fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[0.9375rem] text-[var(--text-secondary)] italic leading-[1.7] flex-1 mb-6"
                style={{
                  padding: '15px',
                  textAlign: 'center'
                }}
              >
                "{review.text}"
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-[var(--border-subtle)]"
                style={{
                  padding: '10px'
                }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-[0.9375rem] shrink-0"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length], marginLeft: '25%' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[0.9375rem] text-[var(--text-primary)] leading-none mb-1.5"
                  >
                    {review.name}
                  </div>
                  <span className="text-[0.7rem] font-medium text-[var(--brand-400)] bg-[#3b82f618] px-2.5 py-0.5 rounded-full">
                    {review.type}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}

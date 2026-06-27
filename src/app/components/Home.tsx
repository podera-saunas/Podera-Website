import { useNavigate } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useRef } from 'react';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1764942394410-5b3f027b459b?w=2400&h=1600&fit=crop&auto=format',
  interior: 'https://images.unsplash.com/photo-1712659604528-b179a3634560?w=2000&h=2500&fit=crop&auto=format',
  lifestyle1: 'https://images.unsplash.com/photo-1676452458392-00932840dc0c?w=1000&h=1300&fit=crop&auto=format',
  lifestyle2: 'https://images.unsplash.com/photo-1712659606957-b7395ba9ebb2?w=1200&h=800&fit=crop&auto=format',
  lifestyle3: 'https://images.unsplash.com/photo-1692985159902-50c672483c31?w=1000&h=1300&fit=crop&auto=format',
  exterior: 'https://images.unsplash.com/photo-1759299653207-e0e9874752ca?w=2400&h=1400&fit=crop&auto=format',
};

const t = {
  en: {
    tagline: 'A sauna that moves with you.',
    scrollHint: 'Scroll',
    s2Title: 'Crafted for those\nwho demand more.',
    s2Sub: 'Premium cedar. Precision engineering. Delivered to your door.',
    learnMore: 'Learn More',
    s3Title: 'The PODERA Experience',
    s3Sub: 'Where warmth meets architecture.',
    gallery: 'Gallery',
    s4Title: 'Begin your\njourney.',
    s4Sub: 'We would love to help you create your perfect sauna sanctuary.',
    contactUs: 'Contact Us',
  },
  th: {
    tagline: 'เซาน่าที่เดินทางไปพร้อมคุณ',
    scrollHint: 'เลื่อน',
    s2Title: 'สร้างสรรค์สำหรับ\nผู้ที่ต้องการมากกว่า',
    s2Sub: 'ซีดาร์พรีเมียม วิศวกรรมที่แม่นยำ จัดส่งถึงประตูบ้านคุณ',
    learnMore: 'เรียนรู้เพิ่มเติม',
    s3Title: 'ประสบการณ์ PODERA',
    s3Sub: 'ที่ซึ่งความอบอุ่นพบกับสถาปัตยกรรม',
    gallery: 'แกลเลอรี',
    s4Title: 'เริ่มต้น\nการเดินทางของคุณ',
    s4Sub: 'เรายินดีช่วยคุณสร้างสวรรค์เซาน่าที่สมบูรณ์แบบ',
    contactUs: 'ติดต่อเรา',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
};

export function Home() {
  const { lang } = useLanguage();
  const copy = t[lang];
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <motion.img
            src={IMAGES.hero}
            alt="PODERA luxury sauna pod illuminated at dusk"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 text-center text-white px-6 select-none"
          style={{ opacity: heroOpacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 36, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,9rem)] uppercase mb-6"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.35em' }}
          >
            PODERA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.4, delay: 1.0, ease: 'easeOut' }}
            className="text-[10px] md:text-xs tracking-[0.35em] uppercase"
          >
            {copy.tagline}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[8px] tracking-[0.3em] uppercase text-white/50">{copy.scrollHint}</span>
          <motion.div
            className="w-[1px] bg-white/40"
            animate={{ height: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── Section 2 — Learn More ── */}
      <section className="py-28 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="overflow-hidden bg-[#f0ede8]"
          >
            <motion.img
              src={IMAGES.interior}
              alt="PODERA sauna warm cedar interior with tiered benches"
              className="w-full aspect-[3/4] object-cover"
              initial={{ scale: 1.08, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col justify-center py-8"
          >
            <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-10" />
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] text-[#0a0a0a] mb-8 leading-[1.1] whitespace-pre-line"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {copy.s2Title}
            </h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8a8a8a] mb-14 leading-loose">
              {copy.s2Sub}
            </p>
            <button
              onClick={() => navigate('/info')}
              className="self-start border border-[#0a0a0a] text-[#0a0a0a] text-[10px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500 hover:bg-[#0a0a0a] hover:text-white"
            >
              {copy.learnMore}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3 — Gallery teaser ── */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-20"
          >
            <h2
              className="text-[clamp(2.2rem,5vw,5rem)] text-[#0a0a0a] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {copy.s3Title}
            </h2>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a8a8a]">{copy.s3Sub}</p>
          </motion.div>

          {/* 3-column image mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {/* Tall left column */}
            <motion.div
              className="row-span-2 overflow-hidden bg-[#e8e4de]"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={IMAGES.lifestyle1}
                alt="Woman relaxing in PODERA sauna"
                className="w-full h-full object-cover min-h-[380px] md:min-h-[560px]"
              />
            </motion.div>

            {/* Top-right */}
            <motion.div
              className="overflow-hidden bg-[#e8e4de]"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={IMAGES.lifestyle2}
                alt="PODERA sauna heater with rocks and window light"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>

            {/* Bottom-right */}
            <motion.div
              className="overflow-hidden bg-[#e8e4de]"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={IMAGES.lifestyle3}
                alt="Serene PODERA sauna interior with bench and window"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/gallery')}
              className="border border-[#0a0a0a] text-[#0a0a0a] text-[10px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500 hover:bg-[#0a0a0a] hover:text-white"
            >
              {copy.gallery}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 — Exterior panorama + Contact CTA ── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img
            src={IMAGES.exterior}
            alt="PODERA sauna cabin reflected in still water"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="text-[clamp(2.5rem,6vw,6rem)] text-white mb-6 leading-[1.05] whitespace-pre-line"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {copy.s4Title}
              </h2>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-10 max-w-sm">
                {copy.s4Sub}
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="border border-white text-white text-[10px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500 hover:bg-white hover:text-[#0a0a0a]"
              >
                {copy.contactUs}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

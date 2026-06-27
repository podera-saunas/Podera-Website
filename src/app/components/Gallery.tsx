import exterior01 from '../../imports/podera-exterior-01.jpg';
import exterior02 from '../../imports/podera-exterior-02.jpg';
import exterior03 from '../../imports/podera-exterior-03.jpg';
import exterior04 from '../../imports/podera-exterior-04.jpg';
import exterior05 from '../../imports/podera-exterior-05.jpg';
import exterior06 from '../../imports/podera-exterior-06.jpg';
import exterior07 from '../../imports/podera-exterior-07.jpg';
import exterior08 from '../../imports/podera-exterior-08.jpg';

import interior01 from '../../imports/podera-interior-01.jpg';
import interior02 from '../../imports/podera-interior-02.jpg';
import interior03 from '../../imports/podera-interior-03.jpg';
import interior04 from '../../imports/podera-interior-04.jpg';
import interior05 from '../../imports/podera-interior-05.jpg';
import interior06 from '../../imports/podera-interior-06.jpg';
import interior07 from '../../imports/podera-interior-07.jpg';
import interior08 from '../../imports/podera-interior-08.jpg';
import interior09 from '../../imports/podera-interior-09.jpg';

import construction01 from '../../imports/podera-construction-01.jpg';
import construction02 from '../../imports/podera-construction-02.jpg';

import delivery01 from '../../imports/podera-delivery-01.jpg';
import delivery02 from '../../imports/podera-delivery-02.jpg';
import delivery03 from '../../imports/podera-delivery-03.jpg';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Category = 'all' | 'exterior' | 'interior' | 'construction' | 'delivery';

interface Photo {
  src: string;
  alt: string;
  category: Exclude<Category, 'all'>;
  span?: 'tall' | 'wide' | 'normal';
}

const photos: Photo[] = [
  { src: exterior01, alt: 'PODERA sauna exterior front view', category: 'exterior', span: 'wide' },
  { src: exterior02, alt: 'PODERA exterior detail', category: 'exterior', span: 'normal' },
  { src: exterior03, alt: 'PODERA sauna exterior angle', category: 'exterior', span: 'tall' },
  { src: exterior04, alt: 'PODERA exterior side view', category: 'exterior', span: 'normal' },
  { src: exterior05, alt: 'PODERA sauna outdoor placement', category: 'exterior', span: 'wide' },
  { src: exterior06, alt: 'PODERA exterior craftsmanship', category: 'exterior', span: 'normal' },
  { src: exterior07, alt: 'PODERA finished sauna exterior', category: 'exterior', span: 'tall' },
  { src: exterior08, alt: 'PODERA sauna exterior finish', category: 'exterior', span: 'normal' },

  { src: interior01, alt: 'PODERA sauna interior', category: 'interior', span: 'wide' },
  { src: interior02, alt: 'PODERA sauna bench detail', category: 'interior', span: 'normal' },
  { src: interior03, alt: 'PODERA sauna heater area', category: 'interior', span: 'tall' },
  { src: interior04, alt: 'PODERA interior wood finish', category: 'interior', span: 'normal' },
  { src: interior05, alt: 'PODERA sauna seating area', category: 'interior', span: 'wide' },
  { src: interior06, alt: 'PODERA interior lighting', category: 'interior', span: 'normal' },
  { src: interior07, alt: 'PODERA sauna craftsmanship', category: 'interior', span: 'tall' },
  { src: interior08, alt: 'PODERA finished sauna interior', category: 'interior', span: 'normal' },
  { src: interior09, alt: 'PODERA interior detail', category: 'interior', span: 'wide' },

  { src: construction01, alt: 'PODERA sauna construction process', category: 'construction', span: 'wide' },
  { src: construction02, alt: 'PODERA sauna build detail', category: 'construction', span: 'normal' },

  { src: delivery01, alt: 'PODERA sauna delivery process', category: 'delivery', span: 'wide' },
  { src: delivery02, alt: 'PODERA sauna being transported', category: 'delivery', span: 'normal' },
  { src: delivery03, alt: 'PODERA sauna placement process', category: 'delivery', span: 'wide' },
];

const categories = {
  en: [
    { id: 'all' as Category, label: 'All' },
    { id: 'exterior' as Category, label: 'Exterior' },
    { id: 'interior' as Category, label: 'Interior' },
    { id: 'construction' as Category, label: 'Construction' },
    { id: 'delivery' as Category, label: 'Delivery' },
  ],
  th: [
    { id: 'all' as Category, label: 'ทั้งหมด' },
    { id: 'exterior' as Category, label: 'ภายนอก' },
    { id: 'interior' as Category, label: 'ภายใน' },
    { id: 'construction' as Category, label: 'การก่อสร้าง' },
    { id: 'delivery' as Category, label: 'การจัดส่ง' },
  ],
};

export function Gallery() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const cats = categories[lang];
  const filtered = activeCategory === 'all' ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-[68px]">
      {/* Page header */}
      <div className="py-20 px-6 md:px-12 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a8a8a] mb-4">
              {lang === 'en' ? 'Visual Archive' : 'คลังภาพ'}
            </p>
            <h1
              className="text-5xl md:text-7xl text-[#0a0a0a]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {lang === 'en' ? 'Gallery' : 'แกลเลอรี'}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-[68px] z-30 bg-white/96 backdrop-blur-sm border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {cats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 text-[10px] tracking-[0.2em] uppercase py-5 px-6 border-b-[1.5px] transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'border-[#0a0a0a] text-[#0a0a0a]'
                    : 'border-transparent text-[#8a8a8a] hover:text-[#0a0a0a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 md:columns-3 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-3 overflow-hidden bg-[#f0ede8] break-inside-avoid cursor-pointer group"
                  onClick={() => setLightbox(photo)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      style={{
                        aspectRatio: photo.span === 'tall' ? '3/4' : photo.span === 'wide' ? '4/3' : '1/1',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <p className="text-[#8a8a8a] text-sm tracking-widest uppercase">
                {lang === 'en' ? 'No photos in this category.' : 'ไม่มีภาพในหมวดนี้'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={lightbox.src.replace('w=1200', 'w=2000').replace('w=900', 'w=1800').replace('w=800', 'w=1600')}
              alt={lightbox.alt}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl transition-colors w-10 h-10 flex items-center justify-center"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

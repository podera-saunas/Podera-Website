import exteriorGallery1 from '../../imports/exterior-gallery-1.jpg.jpeg';
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
  // Exterior
  {
  src: exteriorGallery1,
  alt: 'PODERA exterior',
  category: 'exterior',
  span: 'wide',
},
  {
    src: 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?w=800&h=1200&fit=crop&auto=format',
    alt: 'PODERA cedar sauna with black door',
    category: 'exterior',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1759299653207-e0e9874752ca?w=1200&h=800&fit=crop&auto=format',
    alt: 'PODERA sauna reflected in still water',
    category: 'exterior',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1609861751930-e463bb2f2dad?w=800&h=1100&fit=crop&auto=format',
    alt: 'Sauna cabin on rocky terrain',
    category: 'exterior',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1604609165742-58e1b9cf0457?w=1000&h=800&fit=crop&auto=format',
    alt: 'Wooden sauna near water at golden hour',
    category: 'exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1752564788161-77317f3cabb2?w=800&h=1200&fit=crop&auto=format',
    alt: 'Wooden steps to sauna in forest setting',
    category: 'exterior',
    span: 'tall',
  },
  // Interior
  {
    src: 'https://images.unsplash.com/photo-1712659604528-b179a3634560?w=1200&h=900&fit=crop&auto=format',
    alt: 'PODERA sauna interior with tiered benches',
    category: 'interior',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1712659606957-b7395ba9ebb2?w=900&h=1200&fit=crop&auto=format',
    alt: 'PODERA sauna with window view and heater rocks',
    category: 'interior',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1692985159902-50c672483c31?w=1200&h=900&fit=crop&auto=format',
    alt: 'Serene sauna interior with bench and natural light',
    category: 'interior',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1717356495389-6ab1e5ff9d84?w=900&h=1200&fit=crop&auto=format',
    alt: 'Wooden sauna bench with warm light',
    category: 'interior',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1572168400468-62e1b3209d7d?w=1000&h=1300&fit=crop&auto=format',
    alt: 'Cedar sauna benches close up',
    category: 'interior',
    span: 'tall',
  },
  // Construction
  {
    src: 'https://images.unsplash.com/photo-1678988227223-45112511eca2?w=1200&h=800&fit=crop&auto=format',
    alt: 'Sauna heater with black bucket and ladles',
    category: 'construction',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1657803778483-2b289d0f22c3?w=900&h=1100&fit=crop&auto=format',
    alt: 'Wooden frame construction detail',
    category: 'construction',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1604609165678-096d20fab1ad?w=1000&h=800&fit=crop&auto=format',
    alt: 'Sauna construction near water',
    category: 'construction',
  },
  // Delivery
  {
    src: 'https://images.unsplash.com/photo-1696702943218-0b7d66f1af17?w=1200&h=800&fit=crop&auto=format',
    alt: 'PODERA unit placed on hillside location',
    category: 'delivery',
    span: 'wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1676452458392-00932840dc0c?w=900&h=1200&fit=crop&auto=format',
    alt: 'Client enjoying PODERA sauna after delivery',
    category: 'delivery',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1739869481946-c054e37a55b1?w=1000&h=700&fit=crop&auto=format',
    alt: 'Couple enjoying PODERA sauna',
    category: 'delivery',
  },
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

import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const INFO_IMG = 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?w=2000&h=2600&fit=crop&auto=format';
const HEATER_IMG = 'https://images.unsplash.com/photo-1678988227223-45112511eca2?w=1400&h=900&fit=crop&auto=format';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] } },
});

const models = {
  en: [
    {
      name: 'PODERA 3×4',
      tagline: 'Intimate. Perfect for personal use.',
      specs: [
        { label: 'Capacity', value: '4-8 persons' },
        { label: 'Interior', value: '3 m × 4 m' },
        { label: 'Exterior', value: '3.2 m × 4.2 m' },
        { label: 'Height', value: '2.2 m interior' },
        { label: 'Heater', value: '12 kW' },
        { label: 'Weight', value: '~1,800 kg' },
      ],
    },
    {
      name: 'PODERA 3×6',
      tagline: 'Social. Sauna + A seperate steam room.',
      specs: [
        { label: 'Capacity', value: '4–8 persons' },
        { label: 'Interior', value: '3 m × 6 m' },
        { label: 'Exterior', value: '3.2 m × 6.2 m' },
        { label: 'Height', value: '2.2 m interior' },
        { label: 'Heater', value: '15 kW – 18 kW' },
        { label: 'Weight', value: '~2,600 kg' },
      ],
    },
  ],
  th: [
    {
      name: 'PODERA 3×4',
      tagline: 'สำหรับการใช้งานส่วนตัว',
      specs: [
        { label: 'ความจุ', value: '4-8 คน' },
        { label: 'ภายใน', value: '3 ม. × 4 ม.' },
        { label: 'ภายนอก', value: '3.2 ม. × 4.2 ม.' },
        { label: 'ความสูง', value: '2.2 ม. ภายใน' },
        { label: 'เครื่องทำความร้อน', value: '12 kW' },
        { label: 'น้ำหนัก', value: '~1,800 กก.' },
      ],
    },
    {
      name: 'PODERA 3×6',
      tagline: 'เพื่อการสังสรรค์ พร้อมห้องสตีมแยกส่วน',
      specs: [
        { label: 'ความจุ', value: '4–8 คน' },
        { label: 'ภายใน', value: '3 ม. × 6 ม.' },
        { label: 'ภายนอก', value: '3.2 ม. × 6.2 ม.' },
        { label: 'ความสูง', value: '2.2 ม. ภายใน' },
        { label: 'เครื่องทำความร้อน', value: '15 kW – 18 kW' },
        { label: 'น้ำหนัก', value: '~2,600 กก.' },
      ],
    },
  ],
};

const materials = {
  en: [
    {
      name: 'Canadian Cedar',
      desc: 'Naturally durable and highly resistant to moisture, making it ideal for sauna construction. Its rich aroma and beautiful grain create a warm, luxurious atmosphere while providing excellent longevity in humid environments.',
    },
    {
      name: 'Thermo Abachi',
      desc: 'Heat-treated for exceptional stability and comfort. Thermo Abachi remains cool to the touch even at high sauna temperatures, making it perfect for interior walls and upper benches while creating a clean, modern appearance.',
    },
    {
      name: 'Abachi',
      desc: 'Lightweight, smooth, and exceptionally comfortable in use. Thanks to its low heat conductivity, Abachi remains pleasant to touch even during long sauna sessions, making it the ideal material for backrests, handles, and seating details.',
    },
  ],
  th: [
    {
      name: 'ซีดาร์แคนาดา',
      desc: 'ไม้ซีดาร์แคนาดามีความทนทานตามธรรมชาติและทนต่อความชื้นได้ดีเยี่ยม จึงเหมาะสำหรับการสร้างซาวน่า กลิ่นหอมอันเป็นเอกลักษณ์และลวดลายไม้ที่สวยงามช่วยสร้างบรรยากาศอบอุ่นและหรูหรา พร้อมอายุการใช้งานที่ยาวนานแม้ในสภาพแวดล้อมที่มีความชื้นสูง',
    },
    {
      name: 'เทอร์โม อาบาชิ',
      desc: 'ผ่านกระบวนการอบความร้อนเพื่อเพิ่มความคงทนและความเสถียรของเนื้อไม้ Thermo Abachi ยังคงสัมผัสสบายแม้ในอุณหภูมิซาวน่าสูง จึงเหมาะสำหรับผนังภายในและม้านั่งระดับบน พร้อมมอบรูปลักษณ์ที่สะอาด เรียบหรู และทันสมัย',
    },
    {
      name: 'อาบาชิ',
      desc: 'มีน้ำหนักเบา ผิวสัมผัสเรียบเนียน และให้ความสบายเป็นพิเศษ ด้วยคุณสมบัติการนำความร้อนต่ำ Abachi จึงยังคงสัมผัสสบายแม้ใช้งานซาวน่าเป็นเวลานาน เหมาะอย่างยิ่งสำหรับพนักพิง มือจับ และส่วนประกอบที่ต้องสัมผัสโดยตรง',
    },
  ],
};

const details = {
  en: {
    heaterTitle: 'The Heart of the Sauna',
    heaterBody: [
      'Every PODERA sauna is equipped with a premium Finnish heater, delivering fast heat-up times, consistent temperatures, and an authentic sauna experience. Carefully matched to each model, the heater ensures efficient performance, reliable operation, and years of everyday use.',
      'Heat-up time: approximately 30–45 minutes. Operating temperatures range from 60°C to 95°C, allowing for both gentle relaxation and traditional high-heat sauna sessions. Premium sauna stones create soft, comfortable steam for an authentic Finnish sauna experience.',
    ],
    insulTitle: 'Industrial-Grade Insulation',
    insulBody: [
      'Every PODERA sauna is insulated with 100 mm mineral wool and a dedicated vapour barrier system, helping maintain stable temperatures while improving energy efficiency.',
      'This allows the sauna to heat up quickly, retain warmth for longer, and perform reliably in Thailands tropical climate — whether installed at a private residence, resort, villa, or rooftop location.',
    ],
    deliveryTitle: 'White-Glove Delivery',
    deliveryBody: [
      'Each PODERA sauna is delivered fully assembled and ready for placement. Our team coordinates transportation, crane placement where required, and final positioning at your location.',
      'Delivery is available throughout Thailand. We will advise on access requirements and help ensure a smooth installation process.',
    ],
    siteTitle: 'Site Preparation',
    siteBody: 'A stable and level surface is required before installation. Depending on the site, this may be a concrete foundation, support piers, or a structural decking system suitable for the saunas weight. Electrical requirements vary by model. Full technical specifications and preparation guidelines are provided prior to delivery.',
    warrantyTitle: 'Warranty',
    warrantyBody: 'PODERA offers a 3-year structural warranty covering the frame, cladding, and all wooden components. The heater carries the manufacturer\'s warranty (typically 2 years). Seals, glass, and accessories are covered for 1 year. We provide annual maintenance visit packages to keep your unit in perfect condition.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Can the sauna be placed outdoors in Thailand\'s climate?',
        a: 'Yes. All PODERA units are designed and built for outdoor use in tropical climates. The cedar exterior naturally weathers to a beautiful silver-grey patina, and all joints are sealed against rain and humidity. We recommend placing the unit in a shaded or covered area for optimal longevity.',
      },
      {
        q: 'How much does it cost to operate?',
        a: 'A typical 3×4 session of 60–90 minutes uses approximately 9–12 kWh of electricity at an estimated cost of 36–48 THB per session (at standard Thai electricity rates). The insulation efficiency means heat is retained and energy is used only to maintain temperature once the target is reached.',
      },
      {
        q: 'Is the unit movable after installation?',
        a: 'Yes — this is a core feature of PODERA. The unit is delivered fully assembled and can be relocated using a crane or forklift. No permanent foundation work is required. Many clients move their units seasonally or when relocating properties.',
      },
      {
        q: 'Can I customise the interior or exterior finish?',
        a: 'Yes. We offer several wood combinations and exterior paint or stain options. For bespoke requests, contact us to discuss a custom specification. Lead times for custom orders may be extended.',
      },
      {
        q: 'Do you provide installation and after-sales service?',
        a: 'Our team handles complete installation, electrical connection, and a thorough operational handover. We also offer annual maintenance packages including inspection, re-caulking, stone replacement, and heater service.',
      },
      {
        q: 'What electrical connection is required?',
        a: 'The PODERA 3×4 requires a single-phase 240V / 50A dedicated circuit. The PODERA 3×6 requires a 3-phase 400V / 32A supply. Our technical team provides full documentation and can coordinate with your electrician.',
      },
    ],
  },
  th: {
    heaterTitle: 'หัวใจของเซาน่า',
    heaterBody: [
      'ซาวน่า PODERA ทุกหลังติดตั้งฮีตเตอร์คุณภาพสูงจากฟินแลนด์ ให้ความร้อนรวดเร็ว ควบคุมอุณหภูมิได้อย่างสม่ำเสมอ และมอบประสบการณ์ซาวน่าแบบดั้งเดิมอย่างแท้จริง ฮีตเตอร์แต่ละรุ่นได้รับการคัดเลือกให้เหมาะสมกับขนาดของซาวน่า เพื่อประสิทธิภาพสูงสุด ความน่าเชื่อถือในการใช้งาน และอายุการใช้งานที่ยาวนาน',
      'เวลาอุ่น: ประมาณ 30–45 นาที โดยสามารถปรับอุณหภูมิได้ตั้งแต่ 60°C ถึง 95°C เพื่อรองรับทั้งการผ่อนคลายแบบสบาย ๆ และประสบการณ์ซาวน่าอุณหภูมิสูงแบบดั้งเดิม หินซาวน่าคุณภาพสูงช่วยสร้างไอน้ำที่นุ่มสบาย มอบประสบการณ์ซาวน่าสไตล์ฟินแลนด์อย่างแท้จริง',
    ],
    insulTitle: 'ฉนวนระดับอุตสาหกรรม',
    insulBody: [
      'ซาวน่า PODERA ทุกหลังติดตั้งฉนวนใยแร่หนา 100 มม. พร้อมระบบป้องกันความชื้น ช่วยรักษาอุณหภูมิให้คงที่และเพิ่มประสิทธิภาพในการใช้พลังงาน',
      'ด้วยระบบฉนวนประสิทธิภาพสูง ซาวน่าสามารถทำความร้อนได้รวดเร็ว เก็บความร้อนได้นาน และทำงานได้อย่างมีประสิทธิภาพในสภาพอากาศร้อนชื้นของประเทศไทย ไม่ว่าจะติดตั้งในบ้านพักส่วนตัว รีสอร์ท วิลล่า หรือพื้นที่บนดาดฟ้า',
    ],
    deliveryTitle: 'บริการจัดส่งระดับไวท์กลัฟ',
    deliveryBody: [
      'ซาวน่า PODERA ทุกหลังจัดส่งในรูปแบบประกอบสำเร็จพร้อมติดตั้ง ทีมงานของเราดูแลการขนส่ง การจัดวางด้วยเครนเมื่อจำเป็น และการติดตั้งในตำแหน่งที่ลูกค้าต้องการ',
      'เรามีบริการจัดส่งทั่วประเทศไทย พร้อมให้คำแนะนำเกี่ยวกับข้อกำหนดด้านการเข้าถึงพื้นที่ เพื่อให้การติดตั้งเป็นไปอย่างราบรื่นและมีประสิทธิภาพด',
    ],
    siteTitle: 'การเตรียมพื้นที่',
    siteBody: 'ก่อนการติดตั้ง จำเป็นต้องมีพื้นที่รองรับที่มั่นคงและได้ระดับ ซึ่งอาจเป็นฐานคอนกรีต เสารองรับ หรือโครงสร้างพื้นประเภทอื่นที่สามารถรองรับน้ำหนักของซาวน่าได้อย่างเหมาะสม ข้อกำหนดด้านไฟฟ้าจะแตกต่างกันตามรุ่น โดยเราจะจัดเตรียมข้อมูลทางเทคนิคและคำแนะนำในการเตรียมพื้นที่อย่างครบถ้วนก่อนการจัดส่ง',
    warrantyTitle: 'การรับประกัน',
    warrantyBody: 'PODERA มีการรับประกันโครงสร้าง 3 ปี ครอบคลุมโครงสร้าง การบุผิว และส่วนประกอบไม้ทั้งหมด เครื่องทำความร้อนมีการรับประกันของผู้ผลิต (โดยทั่วไป 2 ปี) ซีล กระจก และอุปกรณ์เสริมครอบคลุม 1 ปี',
    faqTitle: 'คำถามที่พบบ่อย',
    faqs: [
      {
        q: 'สามารถวางเซาน่าไว้ภายนอกในสภาพอากาศของไทยได้หรือไม่?',
        a: 'ได้ หน่วย PODERA ทั้งหมดออกแบบและสร้างเพื่อการใช้งานกลางแจ้งในภูมิอากาศเขตร้อน ไม้ซีดาร์ภายนอกจะเปลี่ยนเป็นสีเงินอย่างสวยงามตามธรรมชาติ และรอยต่อทั้งหมดถูกซีลป้องกันฝนและความชื้น',
      },
      {
        q: 'ค่าใช้จ่ายในการดำเนินงานเท่าไร?',
        a: 'เซสชันทั่วไป 60–90 นาที ของ 3×4 ใช้ไฟฟ้าประมาณ 9–12 kWh ด้วยต้นทุนประมาณ 36–48 บาทต่อเซสชัน (ตามอัตราไฟฟ้ามาตรฐานของไทย)',
      },
      {
        q: 'สามารถเคลื่อนย้ายหน่วยหลังการติดตั้งได้หรือไม่?',
        a: 'ได้ — นี่คือคุณสมบัติหลักของ PODERA หน่วยจัดส่งแบบประกอบสมบูรณ์และสามารถย้ายตำแหน่งได้โดยใช้เครน ไม่ต้องทำงานฐานรากถาวร',
      },
      {
        q: 'สามารถปรับแต่งการตกแต่งภายในหรือภายนอกได้หรือไม่?',
        a: 'ได้ เรามีตัวเลือกการผสมไม้หลายแบบและตัวเลือกสีหรือสีย้อมภายนอก สำหรับคำขอพิเศษ ติดต่อเราเพื่อหารือเกี่ยวกับข้อกำหนดที่กำหนดเอง',
      },
      {
        q: 'คุณให้บริการติดตั้งและบริการหลังการขายหรือไม่?',
        a: 'ทีมงานของเราดูแลการติดตั้งทั้งหมด การต่อไฟฟ้า และการส่งมอบการดำเนินงานอย่างละเอียด เรายังมีแพ็คเกจบำรุงรักษาประจำปี',
      },
      {
        q: 'ต้องการการเชื่อมต่อไฟฟ้าอย่างไร?',
        a: 'PODERA 3×4 ต้องการวงจรเฉพาะ 1 เฟส 240V / 50A PODERA 3×6 ต้องการระบบ 3 เฟส 400V / 32A ทีมเทคนิคของเราจัดเตรียมเอกสารครบถ้วน',
      },
    ],
  },
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        className="w-full flex items-center justify-between py-6 text-left gap-6"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm text-[#0a0a0a] leading-snug pr-4" style={{ fontFamily: 'var(--font-display)' }}>
          {q}
        </span>
        <span className={`text-[#8a8a8a] text-lg flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-[#8a8a8a] text-sm leading-relaxed pb-6">{a}</p>
      </motion.div>
    </div>
  );
}

export function Info() {
  const { lang } = useLanguage();
  const ms = models[lang];
  const mats = materials[lang];
  const d = details[lang];

  return (
    <div className="pt-[68px]">
      {/* Page hero */}
      <div className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden bg-[#0a0a0a]">
        <img
          src={INFO_IMG}
          alt="PODERA cedar sauna exterior"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="relative z-10 px-6 md:px-12 pb-14 max-w-7xl mx-auto w-full">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-3">
              {lang === 'en' ? 'Product Information' : 'ข้อมูลผลิตภัณฑ์'}
            </p>
            <h1 className="text-white text-5xl md:text-7xl" style={{ fontFamily: 'var(--font-display)' }}>
              {lang === 'en' ? 'Specifications' : 'ข้อมูลจำเพาะ'}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Models */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-8" />
            <h2 className="text-4xl md:text-5xl text-[#0a0a0a]" style={{ fontFamily: 'var(--font-display)' }}>
              {lang === 'en' ? 'Choose Your Model' : 'เลือกรุ่นของคุณ'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {ms.map((model, i) => (
              <motion.div
                key={model.name}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-[#e5e5e5] p-10 hover:border-[#0a0a0a] transition-colors duration-500"
              >
                <h3 className="text-2xl text-[#0a0a0a] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {model.name}
                </h3>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-10">{model.tagline}</p>
                <div className="space-y-0">
                  {model.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-4 border-b border-[#f0f0f0] last:border-0">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a]">{spec.label}</span>
                      <span className="text-sm text-[#0a0a0a]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-28 px-6 md:px-12 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-8" />
            <h2 className="text-4xl md:text-5xl text-[#0a0a0a]" style={{ fontFamily: 'var(--font-display)' }}>
              {lang === 'en' ? 'Materials' : 'วัสดุ'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {mats.map((mat, i) => (
              <motion.div
                key={mat.name}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="w-5 h-[1px] bg-[#8a8a8a] mb-6" />
                <h3 className="text-xl text-[#0a0a0a] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {mat.name}
                </h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">{mat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heater */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-8" />
            <h2 className="text-4xl md:text-5xl text-[#0a0a0a] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              {d.heaterTitle}
            </h2>
            {d.heaterBody.map((p, i) => (
              <p key={i} className="text-sm text-[#8a8a8a] leading-relaxed mb-4">{p}</p>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#f0ede8]"
          >
            <img
              src={HEATER_IMG}
              alt="Finnish sauna heater with volcanic rocks"
              className="w-full aspect-video object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Insulation */}
      <section className="py-28 px-6 md:px-12 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="w-8 h-[1px] bg-white/30 mb-8" />
            <h2 className="text-4xl md:text-5xl text-white mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              {d.insulTitle}
            </h2>
            {d.insulBody.map((p, i) => (
              <p key={i} className="text-sm text-white/60 leading-relaxed mb-4">{p}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-8" />
              <h2 className="text-3xl md:text-4xl text-[#0a0a0a] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                {d.deliveryTitle}
              </h2>
              {d.deliveryBody.map((p, i) => (
                <p key={i} className="text-sm text-[#8a8a8a] leading-relaxed mb-4">{p}</p>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-8" />
              <h2 className="text-3xl md:text-4xl text-[#0a0a0a] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                {d.siteTitle}
              </h2>
              <p className="text-sm text-[#8a8a8a] leading-relaxed">{d.siteBody}</p>
            </motion.div>
          </div>

          {/* Warranty */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 border border-[#e5e5e5] p-10"
          >
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              <div>
                <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-6" />
                <h2 className="text-3xl text-[#0a0a0a]" style={{ fontFamily: 'var(--font-display)' }}>
                  {d.warrantyTitle}
                </h2>
              </div>
              <p className="text-sm text-[#8a8a8a] leading-relaxed self-center">{d.warrantyBody}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 md:px-12 bg-[#f8f8f8]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="w-8 h-[1px] bg-[#0a0a0a]/30 mb-8" />
            <h2 className="text-4xl md:text-5xl text-[#0a0a0a]" style={{ fontFamily: 'var(--font-display)' }}>
              {d.faqTitle}
            </h2>
          </motion.div>

          <div className="border-t border-[#e5e5e5]">
            {d.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

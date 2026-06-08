import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] } },
});

const t = {
  en: {
    sub: 'Enquiries',
    title: 'Let\'s talk.',
    desc: 'Whether you have a question about our units, pricing, delivery, or site suitability — we are here to help. Reach out through any channel below.',
    form: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone / WhatsApp (optional)',
      subject: 'Subject',
      subjects: ['General Enquiry', 'Product Information', 'Pricing & Lead Time', 'Site Assessment', 'Other'],
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending…',
      success: 'Thank you. We will be in touch within 24 hours.',
    },
    or: 'Or reach us directly',
    socials: {
      whatsapp: 'WhatsApp',
      line: 'LINE',
      instagram: 'Instagram',
      email: 'Email',
    },
    location: {
      label: 'Based in',
      value: 'Thailand',
    },
    hours: {
      label: 'Response time',
      value: 'Within 24 hours',
    },
  },
  th: {
    sub: 'ติดต่อสอบถาม',
    title: 'มาคุยกัน',
    desc: 'ไม่ว่าคุณจะมีคำถามเกี่ยวกับผลิตภัณฑ์ ราคา การจัดส่ง หรือความเหมาะสมของพื้นที่ เราพร้อมช่วยเหลือคุณ ติดต่อผ่านช่องทางด้านล่าง',
    form: {
      name: 'ชื่อ-นามสกุล',
      email: 'อีเมล',
      phone: 'โทรศัพท์ / WhatsApp (ไม่บังคับ)',
      subject: 'หัวข้อ',
      subjects: ['สอบถามทั่วไป', 'ข้อมูลผลิตภัณฑ์', 'ราคาและระยะเวลา', 'ประเมินพื้นที่', 'อื่นๆ'],
      message: 'ข้อความ',
      send: 'ส่งข้อความ',
      sending: 'กำลังส่ง…',
      success: 'ขอบคุณ เราจะติดต่อกลับภายใน 24 ชั่วโมง',
    },
    or: 'หรือติดต่อเราโดยตรง',
    socials: {
      whatsapp: 'WhatsApp',
      line: 'LINE',
      instagram: 'Instagram',
      email: 'อีเมล',
    },
    location: {
      label: 'ที่ตั้ง',
      value: 'ประเทศไทย',
    },
    hours: {
      label: 'เวลาตอบกลับ',
      value: 'ภายใน 24 ชั่วโมง',
    },
  },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function Contact() {
  const { lang } = useLanguage();
  const copy = t[lang];

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: copy.form.subjects[0],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    // Simulate submission
    setTimeout(() => setStatus('success'), 1600);
  };

  const inputClass = (err?: string) =>
    `w-full bg-transparent border-b ${err ? 'border-red-400' : 'border-[#e5e5e5]'} py-4 text-sm text-[#0a0a0a] placeholder-[#c0c0c0] focus:outline-none focus:border-[#0a0a0a] transition-colors duration-300`;

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
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a8a8a] mb-4">{copy.sub}</p>
            <h1
              className="text-5xl md:text-7xl text-[#0a0a0a]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {copy.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_380px] gap-16 md:gap-24">
          {/* Form */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm text-[#8a8a8a] leading-relaxed mb-14 max-w-lg">{copy.desc}</p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center border border-[#e5e5e5]"
              >
                <div className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>✓</div>
                <p className="text-sm text-[#0a0a0a] tracking-wide">{copy.form.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-10">
                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <input
                      type="text"
                      placeholder={copy.form.name}
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                      className={inputClass(errors.name)}
                    />
                    {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={copy.form.email}
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                      className={inputClass(errors.email)}
                    />
                    {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <input
                      type="tel"
                      placeholder={copy.form.phone}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass()}
                    />
                  </div>
                  <div>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={`${inputClass()} appearance-none cursor-pointer`}
                    >
                      {copy.form.subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={5}
                    placeholder={copy.form.message}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: undefined }); }}
                    className={`${inputClass(errors.message)} resize-none`}
                  />
                  {errors.message && <p className="text-[10px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="border border-[#0a0a0a] text-[#0a0a0a] text-[10px] tracking-[0.25em] uppercase px-12 py-4 transition-all duration-500 hover:bg-[#0a0a0a] hover:text-white disabled:opacity-40"
                >
                  {status === 'sending' ? copy.form.sending : copy.form.send}
                </button>
              </form>
            )}
          </motion.div>

          {/* Social links sidebar */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Info */}
            <div className="border border-[#e5e5e5] p-8 space-y-6">
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#8a8a8a] mb-2">{copy.location.label}</p>
                <p className="text-sm text-[#0a0a0a]">{copy.location.value}</p>
              </div>
              <div className="w-full h-[1px] bg-[#e5e5e5]" />
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#8a8a8a] mb-2">{copy.hours.label}</p>
                <p className="text-sm text-[#0a0a0a]">{copy.hours.value}</p>
              </div>
            </div>

            {/* Divider */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8a8a8a] mb-6">{copy.or}</p>
              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/66640579410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 border border-[#e5e5e5] hover:border-[#0a0a0a] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0a0a0a]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">{copy.socials.whatsapp}</p>
                    <p className="text-[10px] text-[#8a8a8a] mt-0.5">+66 64 057 9410</p>
                  </div>
                </a>

                {/* LINE */}
                <a
                  href="https://line.me/ti/p/~podera_sauna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 border border-[#e5e5e5] hover:border-[#0a0a0a] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0a0a0a]">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">{copy.socials.line}</p>
                    <p className="text-[10px] text-[#8a8a8a] mt-0.5">+66 64 057 9410</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/podera.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 border border-[#e5e5e5] hover:border-[#0a0a0a] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0a0a0a]">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">{copy.socials.instagram}</p>
                    <p className="text-[10px] text-[#8a8a8a] mt-0.5">@podera.co</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@podera.co.th"
                  className="flex items-center gap-4 p-5 border border-[#e5e5e5] hover:border-[#0a0a0a] transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[#0a0a0a]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">{copy.socials.email}</p>
                    <p className="text-[10px] text-[#8a8a8a] mt-0.5">contact.podera@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

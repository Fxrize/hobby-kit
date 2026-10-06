"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

export function SupportSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { lang } = useLang();

  const text = {
    ID: {
      supportTitle: "Pusat Bantuan",
      supportDesc: "Layanan Pelanggan & Informasi",
      faqTitle: "Tanya Jawab (FAQ)",
      faqs: [
        { q: "Apa itu HobbyKit?", a: "Kami menyediakan peralatan hobi komplit dalam satu paket. Buka kotaknya, langsung bisa main tanpa ribet beli perlengkapan satu-satu." },
        { q: "Berapa lama pengiriman?", a: "Pesanan masuk sebelum jam 15:00 dikirim hari yang sama. Estimasinya 1-3 hari kerja tergantung lokasi." },
        { q: "Apakah ada panduannya?", a: "Ada. Setiap kit dilengkapi dengan manual fisik dan kode akses video tutorial eksklusif." },
        { q: "Bisa untuk kado?", a: "Sangat bisa! Tersedia opsi kartu ucapan gratis. Pilih saat checkout." }
      ],
      termsTitle: "Syarat & Ketentuan",
      termsUpdated: "Pembaruan Terakhir: Oktober 2026",
      termsSections: [
        { title: "A. Akses Platform", desc: "Dengan mengakses platform HobbyKit, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan yang berlaku di dokumen ini." },
        { title: "B. Transaksi & Barang", desc: "Barang yang sudah dibeli tidak dapat ditukar kecuali ada cacat produksi (wajib menyertakan video unboxing tanpa putus maksimal 1x24 jam sejak paket diterima)." },
        { title: "C. Akun Pengguna", desc: "Pengguna wajib menjaga kerahasiaan kata sandi dan data akun. Semua aktivitas yang terjadi menggunakan akun adalah tanggung jawab pengguna sepenuhnya." }
      ],
      contactTitle: "Hubungi Kami",
      contactLabels: ["Email Pelanggan", "WhatsApp", "Alamat Kantor"],
      contactFormTitle: "Kirim Pesan",
      contactFormInputs: ["Nama Lengkap", "Alamat Email", "Pesan Anda", "Kirim Pesan"]
    },
    EN: {
      supportTitle: "Help Center",
      supportDesc: "Customer Service & Information",
      faqTitle: "FAQ",
      faqs: [
        { q: "What is HobbyKit?", a: "We provide complete hobby gear in one package. Open the box, start playing instantly without the hassle of buying tools one by one." },
        { q: "How long is shipping?", a: "Orders placed before 15:00 are shipped the same day. Estimated 1-3 business days depending on location." },
        { q: "Are there guides included?", a: "Yes. Every kit comes with a physical manual and an exclusive video tutorial access code." },
        { q: "Can this be a gift?", a: "Absolutely! Free greeting card option is available. Select it at checkout." }
      ],
      termsTitle: "Terms of Service",
      termsUpdated: "Last Updated: October 2026",
      termsSections: [
        { title: "A. Platform Access", desc: "By accessing the HobbyKit platform, users are deemed to have read, understood, and agreed to all provisions in this document." },
        { title: "B. Transactions & Goods", desc: "Purchased goods cannot be exchanged unless there is a production defect (must include uncut unboxing video max 1x24 hours after receiving)." },
        { title: "C. User Account", desc: "Users must keep their password and account data confidential. All activities using the user account are fully the user's responsibility." }
      ],
      contactTitle: "Contact Us",
      contactLabels: ["Customer Email", "WhatsApp", "Office Address"],
      contactFormTitle: "Send a Message",
      contactFormInputs: ["Full Name", "Email Address", "Your Message", "Send Message"]
    }
  };

  const t = text[lang];

  return (
    <div className="w-full bg-black py-32 border-t-8 border-primary relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-5xl space-y-32 relative z-10">
        
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 transform -skew-x-2">
            <span className="text-primary">{t.supportTitle}</span> Network
          </h1>
          <p className="text-gray-400 font-bold tracking-widest uppercase">{t.supportDesc}</p>
        </div>

        {/* FAQ SECTION */}
        <section id="faq" className="scroll-mt-32">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 border-b-4 border-white/20 pb-4">
            <span className="text-primary">01.</span> {t.faqTitle}
          </h2>
          <div className="space-y-6">
            {t.faqs.map((item: {q: string, a: string}, i: number) => (
              <div 
                key={i} 
                className={`bg-black border-2 transition-colors cursor-pointer transform -skew-x-1 ${openFAQ === i ? 'border-primary' : 'border-white/10 hover:border-white/30'}`}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-xl font-black text-white uppercase tracking-wide border-l-4 border-primary pl-4 select-none">
                    {item.q}
                  </h3>
                  <span className="text-primary font-black text-2xl ml-4 select-none">
                    {openFAQ === i ? "−" : "+"}
                  </span>
                </div>
                
                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-0 text-gray-400 font-medium leading-relaxed select-none">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* TERMS SECTION */}
        <section id="terms" className="scroll-mt-32">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 border-b-4 border-white/20 pb-4">
            <span className="text-primary">02.</span> {t.termsTitle}
          </h2>
          <div className="bg-black border-4 border-white p-8 transform skew-x-1">
            <div className="prose prose-invert prose-yellow max-w-none space-y-6 text-gray-300 font-medium leading-relaxed">
              <p className="uppercase font-bold tracking-widest text-primary border-b-2 border-primary/20 pb-2 inline-block">{t.termsUpdated}</p>
              
              {t.termsSections.map((sec: {title: string, desc: string}, i: number) => (
                <div key={i}>
                  <h3 className="text-xl font-black text-white uppercase mt-6 mb-2 border-l-4 border-primary pl-4">{sec.title}</h3>
                  <p>{sec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-32">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 border-b-4 border-white/20 pb-4">
            <span className="text-primary">03.</span> {t.contactTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-black border-4 border-white p-6 transform -skew-x-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-black uppercase tracking-widest text-primary mb-2">{t.contactLabels[0]}</h3>
                <p className="text-xl font-bold text-white">support@hobbykit.com</p>
              </div>
              
              <div className="bg-black border-4 border-white p-6 transform -skew-x-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-black uppercase tracking-widest text-primary mb-2">{t.contactLabels[1]}</h3>
                <p className="text-xl font-bold text-white">+62 812 3456 7890</p>
              </div>
              
              <div className="bg-black border-4 border-white p-6 transform -skew-x-2 hover:-translate-y-1 transition-transform">
                <h3 className="font-black uppercase tracking-widest text-primary mb-2">{t.contactLabels[2]}</h3>
                <p className="text-white font-medium">Jl. Pahlawan Kreatif No. 99<br/>Jakarta Selatan, 12345</p>
              </div>
            </div>

            <div className="bg-primary text-black p-8 transform skew-x-1 shadow-[12px_12px_0_0_#ffffff]">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{t.contactFormTitle}</h3>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">{t.contactFormInputs[0]}</label>
                  <input type="text" className="w-full bg-white border-4 border-black p-3 focus:outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">{t.contactFormInputs[1]}</label>
                  <input type="email" className="w-full bg-white border-4 border-black p-3 focus:outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">{t.contactFormInputs[2]}</label>
                  <textarea rows={4} className="w-full bg-white border-4 border-black p-3 focus:outline-none font-bold"></textarea>
                </div>
                <button type="button" className="bg-black text-white font-black uppercase tracking-widest p-5 mt-4 hover:bg-white hover:text-black transition-colors transform -skew-x-6 border-4 border-black">
                  <span className="inline-block transform skew-x-6">{t.contactFormInputs[3]}</span>
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

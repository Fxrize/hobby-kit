"use client";

import { motion } from "framer-motion";
import { PackageOpen, Sparkles, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

export function InfoSections() {
  const { lang } = useLang();

  const text = {
    ID: {
      manualSmall: "Cara Kerja",
      manualTitle1: "Bagaimana",
      manualTitle2: "Caranya?",
      steps: [
        { title: "1. Pilih Produk", desc: "Pilih starter kit hobi yang paling menarik untuk Anda. Bebas tentukan pilihan." },
        { title: "2. Terima Paket", desc: "Kami kirimkan perlengkapan lengkap kualitas premium langsung ke rumah Anda." },
        { title: "3. Mulai Hobi", desc: "Buka buku panduan dan langsung mulai aktivitas hobi baru Anda sekarang juga." }
      ],
      objSmall: "Tentang Kami",
      objTitle1: "Lawan Bosan.",
      objTitle2: "Tingkatkan",
      objTitle3: "Kreativitasmu.",
      objDesc: "Banyak yang ingin memulai hobi tapi tidak ada waktu mencari alat satu per satu. HobbyKit merangkum semuanya dalam satu kotak praktis. Tidak ada lagi alasan bingung mulai dari mana.",
      objBtn: "Mulai Sekarang"
    },
    EN: {
      manualSmall: "How It Works",
      manualTitle1: "What Are",
      manualTitle2: "The Steps?",
      steps: [
        { title: "1. Choose Product", desc: "Select the hobby starter kit that catches your eye. The choice is yours." },
        { title: "2. Receive Package", desc: "We deliver complete premium-quality gear right to your doorstep." },
        { title: "3. Start Hobby", desc: "Open the guidebook and start your new hobby activity right away." }
      ],
      objSmall: "About Us",
      objTitle1: "Fight Boredom.",
      objTitle2: "Boost Your",
      objTitle3: "Creativity.",
      objDesc: "Many want to start a hobby but have no time to find the tools one by one. HobbyKit packs everything in one practical box. No more excuses for not knowing where to start.",
      objBtn: "Get Started"
    }
  };

  const t = text[lang];

  return (
    <div className="w-full">
      {/* How it Works Section */}
      <section id="manual" className="container mx-auto px-6 max-w-7xl py-24 border-t-4 border-white/10">
        <div className="text-center mb-16">
          <h2 className="inline-block bg-primary text-black px-4 py-1 font-bold uppercase tracking-widest text-sm mb-4 transform -skew-x-12">
            <span className="inline-block transform skew-x-12">{t.manualSmall}</span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            {t.manualTitle1} <span className="text-primary">{t.manualTitle2}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-20 right-20 h-1 bg-white/20 z-0"></div>

          {t.steps.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-black border-4 border-primary flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300 mb-8 shadow-[8px_8px_0_0_#ffffff]">
                {i === 0 && <PackageOpen className="w-10 h-10 text-primary transform -rotate-12 hover:rotate-0 transition-transform" />}
                {i === 1 && <Sparkles className="w-10 h-10 text-primary transform -rotate-12 hover:rotate-0 transition-transform" />}
                {i === 2 && <Gamepad2 className="w-10 h-10 text-primary transform -rotate-12 hover:rotate-0 transition-transform" />}
              </div>
              <h4 className="text-2xl font-black uppercase mb-4">{item.title}</h4>
              <p className="text-gray-400 uppercase tracking-wider text-sm font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About/Mission Section */}
      <section id="objective" className="bg-primary text-black py-24 relative overflow-hidden">
        {/* Background Text Decor */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] text-[10rem] md:text-[20rem] font-black text-black/5 uppercase select-none pointer-events-none whitespace-nowrap z-0">
          AWAKEN YOUR POTENTIAL
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black border-4 border-white p-8 md:p-16 text-center transform -skew-x-2 shadow-[16px_16px_0_0_#ffffff]"
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">{t.objSmall}</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
              {t.objTitle1} <br/> {t.objTitle2} <span className="text-primary">{t.objTitle3}</span>
            </h3>
            <p className="text-gray-400 text-lg md:text-xl uppercase tracking-wider font-medium max-w-2xl mx-auto border-l-4 border-primary pl-6 text-left">
              {t.objDesc}
            </p>
            
            <Link href="/login" className="mt-12 inline-block bg-primary text-black font-black uppercase tracking-widest px-10 py-5 text-lg transform -skew-x-12 border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0_0_#000000] hover:shadow-[4px_4px_0_0_#000000] hover:translate-x-1 hover:translate-y-1">
              <span className="inline-block transform skew-x-12">{t.objBtn}</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

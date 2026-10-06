"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

export function Hero() {
  const { lang } = useLang();

  const text = {
    ID: {
      tag: "Koleksi Terbaru 2026",
      desc: "Starter kit super lengkap. \nMulai hobi barumu tanpa ribet mencari alat satu per satu.",
      btn1: "Lihat Katalog",
      btn2: "Cara Kerja",
      ticker: "/// STARTER KIT HOBI /// SIAP KIRIM /// MULAI HARI INI "
    },
    EN: {
      tag: "New Collection 2026",
      desc: "Complete starter kits. \nStart your new hobby without the hassle.",
      btn1: "View Catalog",
      btn2: "How It Works",
      ticker: "/// HOBBY STARTER KITS /// READY TO SHIP /// START TODAY "
    }
  };

  const t = text[lang];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft Yellow Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]"
        />
        {/* Soft White/Gray Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] -right-[10%] w-[60%] h-[60%] bg-white/10 rounded-full blur-[100px]"
        />
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col pt-10">
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-8"
          >
            <span className="block transform -skew-x-6 hover:skew-x-0 transition-transform duration-300">Awaken</span>
            <span className="block transform -skew-x-6 text-primary hover:skew-x-0 transition-transform duration-300 ml-8 md:ml-16">Your</span>
            <span className="block transform -skew-x-6 hover:skew-x-0 transition-transform duration-300">Hobby.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 font-medium max-w-xl border-l-4 border-primary pl-4 md:pl-6 mb-12 uppercase tracking-wide whitespace-pre-line"
          >
            {t.desc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link href="#inventory" className="inline-block group relative bg-primary text-black font-black uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 text-base md:text-lg transform -skew-x-12 border-b-8 border-r-8 border-white/20 hover:translate-y-1 hover:border-b-4 hover:border-r-4 transition-all w-full sm:w-auto text-center">
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"></span>
              <span className="relative z-10 inline-block transform skew-x-12 group-hover:text-black">{t.btn1}</span>
            </Link>
            <Link href="#manual" className="inline-block group bg-transparent text-white border-4 border-white font-black uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 text-base md:text-lg transform -skew-x-12 hover:bg-white hover:text-black transition-colors w-full sm:w-auto text-center">
              <span className="inline-block transform skew-x-12">{t.btn2}</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Decorative Ticker */}
      <div className="absolute bottom-0 w-full overflow-hidden bg-primary py-3 border-y-4 border-black transform -rotate-1 scale-105 z-20">
        <div className="whitespace-nowrap flex gap-4 text-black font-black uppercase tracking-widest text-xs md:text-sm animate-ticker w-[200%]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              {t.ticker}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

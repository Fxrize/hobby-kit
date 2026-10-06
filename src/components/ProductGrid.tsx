"use client";

"use client";

import Image from "next/image";
import Link from "next/link";
import { type products } from "@/data/products";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

// Definisikan tipe struktur produk
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  color: string;
};

export function ProductGrid({ items }: { items: Product[] }) {
  const { lang } = useLang();

  const text = {
    ID: {
      soonTitle: "SEGERA HADIR",
      soonDesc: "Starter kit hobi baru sedang dipersiapkan untuk Anda..."
    },
    EN: {
      soonTitle: "COMING SOON",
      soonDesc: "A new hobby starter kit is currently being prepared..."
    }
  };
  const t = text[lang];

  return (
    <div className="flex flex-wrap justify-center gap-y-16 gap-x-10">
      {items.map((product, i) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] group relative"
        >
          {/* Shadow Box (No skew to prevent overflow glitches) */}
          <div className="absolute inset-0 bg-primary transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300 border-4 border-black"></div>
          
          <Link href={`/product/${product.id}`} className="relative block h-full bg-black border-4 border-white p-4 md:p-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
            
            {/* Price Tag */}
            <div className="absolute -top-6 -right-4 md:-right-6 bg-primary text-black font-black px-3 md:px-4 py-2 transform rotate-6 border-4 border-black z-10 group-hover:rotate-0 transition-transform">
              Rp {(product.price / 1000).toFixed(0)}K
            </div>

            <div className="relative aspect-square w-full mb-6 overflow-hidden border-2 border-white/20 filter grayscale group-hover:grayscale-0 transition-all duration-500">
              <div className="w-full h-full transform scale-110 group-hover:scale-100 transition-transform duration-500">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2 group-hover:text-primary transition-colors tracking-tight">{product.name}</h3>
              <p className="text-gray-400 text-xs md:text-sm mb-6 uppercase tracking-wider font-medium line-clamp-2">{product.description}</p>
              
              <div className="mt-auto flex items-center justify-between border-t-2 border-white/20 pt-4">
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white">Select</span>
                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-white flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-colors transform -skew-x-12">
                  <span className="transform skew-x-12 font-black text-sm md:text-base">→</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* COMING SOON CARD */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)] flex flex-col items-center justify-center border-4 border-dashed border-white/20 p-8 min-h-[400px] hover:border-primary transition-colors transform -skew-x-1 group"
      >
        <div className="w-20 h-20 border-4 border-white/20 flex items-center justify-center mb-6 group-hover:border-primary group-hover:text-primary transition-colors text-white/20 font-black text-4xl transform skew-x-1">?</div>
        <h3 className="text-2xl font-black uppercase text-white/30 mb-4 group-hover:text-primary transition-colors tracking-tight text-center transform skew-x-1">{t.soonTitle}</h3>
        <p className="text-gray-600 text-sm uppercase tracking-wider font-medium text-center transform skew-x-1">{t.soonDesc}</p>
      </motion.div>
    </div>
  );
}

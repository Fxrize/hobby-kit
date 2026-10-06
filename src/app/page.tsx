"use client";

import { products } from "@/data/products";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { InfoSections } from "@/components/InfoSections";
import { SupportSection } from "@/components/SupportSection";
import { useLang } from "@/lib/LanguageContext";

export default function Home() {
  const { lang } = useLang();
  
  const text = {
    ID: {
      invSmall: "Katalog Produk",
      invTitle1: "Pilih Hobi",
      invTitle2: "Barumu.",
      invBtn: "Semua Produk Tersedia"
    },
    EN: {
      invSmall: "Product Catalog",
      invTitle1: "Choose Your",
      invTitle2: "New Hobby.",
      invBtn: "All Products Available"
    }
  };

  const t = text[lang];

  return (
    <div className="w-full">
      <Hero />

      <section id="inventory" className="container mx-auto px-6 max-w-7xl py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-white/20 pb-4">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-2">{t.invSmall}</h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
              {t.invTitle1} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">{t.invTitle2}</span>
            </h3>
          </div>
          <div className="mt-6 md:mt-0 bg-white text-black px-6 py-2 font-bold uppercase transform -skew-x-12">
            <span className="inline-block transform skew-x-12">{t.invBtn}</span>
          </div>
        </div>
        
        <ProductGrid items={products[lang]} />
      </section>

      <InfoSections />
      
      <SupportSection />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

export function Footer() {
  const { lang } = useLang();

  const text = {
    ID: {
      desc: "Penyedia perlengkapan hobi terlengkap untuk membantu Anda memulai aktivitas baru.",
      navTitle: "Navigasi",
      navs: [
        { label: "Katalog Produk", href: "/#inventory" },
        { label: "Cara Kerja", href: "/#manual" },
        { label: "Tentang Kami", href: "/#objective" }
      ],
      supTitle: "Pusat Bantuan",
      sups: [
        { label: "Tanya Jawab (FAQ)", href: "/#faq" },
        { label: "Syarat & Ketentuan", href: "/#terms" },
        { label: "Hubungi Kami", href: "/#contact" }
      ],
      copy: "© 2026 HobbyKit. Hak cipta dilindungi undang-undang."
    },
    EN: {
      desc: "The most complete hobby gear provider to help you start new activities.",
      navTitle: "Navigation",
      navs: [
        { label: "Product Catalog", href: "/#inventory" },
        { label: "How It Works", href: "/#manual" },
        { label: "About Us", href: "/#objective" }
      ],
      supTitle: "Help Center",
      sups: [
        { label: "FAQ", href: "/#faq" },
        { label: "Terms of Service", href: "/#terms" },
        { label: "Contact Us", href: "/#contact" }
      ],
      copy: "© 2026 HobbyKit. All rights reserved."
    }
  };

  const t = text[lang];

  return (
    <footer className="bg-black border-t-8 border-primary py-12 text-white overflow-hidden relative">
      <div className="w-full px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 transform -skew-x-6">
              Hobby<span className="text-primary">Kit</span>
            </h2>
            <p className="text-gray-400 uppercase tracking-widest text-sm font-bold max-w-sm mb-6">
              {t.desc}
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-primary mb-6 border-b-2 border-primary/20 pb-2 inline-block">{t.navTitle}</h4>
            <ul className="flex flex-col gap-3 font-bold uppercase tracking-wider text-sm text-gray-400">
              {t.navs.map((n, i) => (
                <li key={i}><Link href={n.href} className="hover:text-primary transition-colors">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-primary mb-6 border-b-2 border-primary/20 pb-2 inline-block">{t.supTitle}</h4>
            <ul className="flex flex-col gap-3 font-bold uppercase tracking-wider text-sm text-gray-400">
              {t.sups.map((s, i) => (
                <li key={i}><Link href={s.href} className="hover:text-primary transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            {t.copy}
          </p>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/yawnn1x_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-colors transform -skew-x-6 cursor-pointer group"
            >
              {/* Instagram Original Icon */}
              <svg className="w-4 h-4 transform skew-x-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-colors transform -skew-x-6 cursor-pointer group"
            >
              {/* WhatsApp Original Icon */}
              <svg className="w-5 h-5 transform skew-x-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
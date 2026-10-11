"use client";

import Link from "next/link";
import { ShoppingCart, User as UserIcon, Menu, X, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { supabase } from "@/lib/supabase";

import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang, setLang } = useLang();
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const navItems = {
    ID: [
      { label: "Katalog", href: "/#inventory" },
      { label: "Cara Kerja", href: "/#manual" },
      { label: "Tentang", href: "/#objective" },
      { label: "FAQ", href: "/#faq" },
      { label: "Kontak", href: "/#contact" }
    ],
    EN: [
      { label: "Catalog", href: "/#inventory" },
      { label: "How It Works", href: "/#manual" },
      { label: "About", href: "/#objective" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" }
    ]
  };

  const currentNav = navItems[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);

    // Update Cart Count
    const updateCartCount = () => {
      const savedCart = JSON.parse(localStorage.getItem("hk_cart") || "[]");
      setCartCount(savedCart.length);
    };
    
    // Initial fetch
    updateCartCount();

    // Listen to storage changes for multi-tab support
    window.addEventListener("storage", updateCartCount);
    
    // Custom event listener for single-page dynamic updates
    window.addEventListener("hk_cart_updated", updateCartCount);

    // Cek Session DB Real-time
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("hk_cart_updated", updateCartCount);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-200 border-b-4 border-primary ${
        isScrolled 
          ? "bg-black py-4" 
          : "bg-black/90 py-6"
      }`}
    >
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group relative">
          <span className="absolute -inset-1 bg-primary transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
          <h1 className="relative text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-black transition-colors">
            Hobby<span className="text-primary group-hover:text-black">Kit</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          <nav className="hidden md:flex gap-6 lg:gap-10">
            {currentNav.map((item) => (
              <Link key={item.label} href={item.href} className="relative text-sm font-bold uppercase tracking-widest overflow-hidden group">
                <span className="inline-block transition-transform duration-200 group-hover:-translate-y-full">{item.label}</span>
                <span className="absolute top-0 left-0 text-primary inline-block transition-transform duration-200 translate-y-full group-hover:translate-y-0">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
              className="flex items-center gap-1.5 sm:gap-2 border-2 border-white/20 px-2 sm:px-3 py-1 hover:border-primary hover:text-primary transition-colors transform -skew-x-12"
              aria-label="Ubah Bahasa"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform skew-x-12" aria-hidden="true" />
              <span className="font-black text-xs uppercase transform skew-x-12">{lang}</span>
            </button>
            
            <Link href="/cart" className="relative p-1.5 sm:p-2 border-2 border-transparent hover:border-primary transition-colors flex items-center justify-center transform hover:-skew-x-12" aria-label="Keranjang Belanja">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-black text-xs font-bold flex items-center justify-center rounded-sm">
                {cartCount}
              </span>
            </Link>
            <Link href={user ? "/profile" : "/login"} className="p-1.5 sm:p-2 border-2 border-transparent hover:border-primary transition-colors transform hover:-skew-x-12" aria-label="Profil Pengguna">
              <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            </Link>
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)} 
              className="md:hidden p-1.5 sm:p-2 text-primary border-2 border-white/20 hover:border-primary transition-colors transform -skew-x-12 ml-2 mr-3 sm:mr-4" 
              aria-label={isMobileOpen ? "Tutup Menu" : "Buka Menu"}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 transform skew-x-12" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 transform skew-x-12" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden bg-black border-t-2 border-primary px-6 py-6 flex flex-col gap-4">
          {currentNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-base font-bold uppercase tracking-widest text-white hover:text-primary transition-colors py-2 border-b border-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

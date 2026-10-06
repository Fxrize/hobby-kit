"use client";

import { useLang } from "@/lib/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Script from "next/script";

import { Product } from "@/components/ProductGrid";

export default function Cart() {
  const { lang } = useLang();
  const [cart, setCart] = useState<Product[]>([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("hk_user");
    if (user) {
      setIsLogged(true);
      const savedCart = JSON.parse(localStorage.getItem("hk_cart") || "[]");
      setCart(savedCart);
    }
  }, []);

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("hk_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("hk_cart_updated"));
  };

  const text = {
    ID: {
      deniedTitle: "Harap Masuk",
      deniedDesc: "Anda harus masuk ke akun untuk melihat keranjang belanja.",
      btnLogin: "Masuk Sekarang",
      cartTitle: "Keranjang Belanja",
      cartEmpty: "Keranjang Anda masih kosong.",
      backBtn: "Kembali ke Katalog",
      total: "Total Estimasi",
      checkoutBtn: "Checkout via WhatsApp"
    },
    EN: {
      deniedTitle: "Please Log In",
      deniedDesc: "You need to log in to view your shopping cart.",
      btnLogin: "Log In Now",
      cartTitle: "Shopping Cart",
      cartEmpty: "Your cart is currently empty.",
      backBtn: "Back to Catalog",
      total: "Estimated Total",
      checkoutBtn: "Checkout via WhatsApp"
    }
  };

  const t = text[lang];

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'error' | 'success' | 'warning'} | null>(null);

  const showNotif = (message: string, type: 'error' | 'success' | 'warning') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    
    // Kumpulkan data pesanan
    const user = localStorage.getItem("hk_user") || "Agen";
    const totalPrice = cart.reduce((sum: number, item: Product) => sum + item.price, 0);
    
    try {
      // 1. Panggil API Route Backend Kita
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, user, total: totalPrice })
      });

      const data = await res.json();

      if (data.token) {
        // 2. Munculkan Popup Midtrans Snap
        // @ts-expect-error - snap is injected via script
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            showNotif("Pembayaran Berhasil!", "success");
            setCart([]);
            localStorage.removeItem("hk_cart");
            window.dispatchEvent(new Event("hk_cart_updated"));
          },
          onPending: function (result: any) {
            showNotif("Menunggu pembayaran Anda...", "warning");
          },
          onError: function (result: any) {
            showNotif("Pembayaran gagal!", "error");
          },
          onClose: function () {
            showNotif("Anda menutup halaman pembayaran tanpa menyelesaikannya.", "warning");
          }
        });
      } else {
        showNotif("Gagal memuat sistem pembayaran.", "error");
      }
    } catch (e) {
      console.error(e);
      showNotif("Terjadi kesalahan sistem saat checkout.", "error");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (!isLogged) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-black px-6">
        <div className="text-center border-4 border-primary p-12 transform -skew-x-2 shadow-[12px_12px_0_0_#FDE047]">
          <h1 className="text-primary font-black text-4xl uppercase tracking-widest mb-4">{t.deniedTitle}</h1>
          <p className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t.deniedDesc}</p>
          <Link href="/login" className="inline-block bg-white text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-primary transition-colors transform -skew-x-6 border-b-4 border-r-4 border-black">
            <span className="inline-block transform skew-x-6">{t.btnLogin}</span>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} 
        strategy="lazyOnload" 
      />
      
      {/* Custom Notification Toast */}
      {notification && (
        <div className="fixed bottom-10 right-10 z-[9999] animate-in slide-in-from-right fade-in duration-300">
          <div className={`p-4 font-black uppercase tracking-widest text-sm transform -skew-x-2 border-l-4 shadow-[8px_8px_0_0_#000000] backdrop-blur-md bg-black/90 ${
            notification.type === 'success' ? 'text-green-400 border-green-500' :
            notification.type === 'error' ? 'text-red-400 border-red-500' :
            'text-primary border-primary'
          }`}>
            {notification.message}
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-20 min-h-[85vh]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-white/20 pb-4">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter transform -skew-x-2">
            <span className="text-primary">{t.cartTitle}</span>
          </h1>
        </div>
        <Link href="/#inventory" className="mt-4 md:mt-0 text-primary font-bold uppercase tracking-widest hover:text-white transition-colors">
          {t.backBtn}
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="bg-black border-4 border-white/20 p-12 text-center transform -skew-x-1">
          <p className="text-gray-400 font-bold uppercase tracking-widest">{t.cartEmpty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row bg-black border-2 border-white/20 p-4 transform -skew-x-1 items-center gap-6 group hover:border-primary transition-colors">
                <div className="relative w-full md:w-32 h-32 bg-white/5 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black uppercase text-white mb-2">{item.name}</h3>
                  <p className="text-primary font-bold text-xl">Rp {item.price.toLocaleString("id-ID")}</p>
                </div>
                <button 
                  onClick={() => removeItem(index)}
                  className="p-4 border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black transition-colors transform -skew-x-6"
                >
                  <Trash2 className="w-6 h-6 transform skew-x-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="bg-black border-4 border-primary p-8 transform skew-x-1 h-fit shadow-[12px_12px_0_0_#FDE047]">
            <h3 className="text-xl font-black uppercase tracking-widest text-primary mb-6 border-b-2 border-primary/20 pb-4">{t.total}</h3>
            <div className="text-4xl font-black text-white mb-8">
              Rp {totalPrice.toLocaleString("id-ID")}
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={isCheckoutLoading}
              className="w-full bg-white text-black font-black uppercase tracking-widest p-4 hover:bg-primary transition-colors transform -skew-x-6 border-b-4 border-r-4 border-black disabled:opacity-50"
            >
              <span className="inline-block transform skew-x-6">
                {isCheckoutLoading ? "MENGHUBUNGKAN..." : "BAYAR SEKARANG"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

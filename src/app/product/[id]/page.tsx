"use client";

import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { use } from "react";
import { useLang } from "@/lib/LanguageContext";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductDetail({ params }: Props) {
  const resolvedParams = use(params);
  const { lang } = useLang();
  const router = useRouter();
  
  // Ambil list produk sesuai bahasa aktif
  const currentProducts = products[lang];
  const product = currentProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const text = {
    ID: {
      back: "← Kembali ke Katalog",
      tag: "Starter Kit",
      btn: "Tambah ke Keranjang"
    },
    EN: {
      back: "← Back to Catalog",
      tag: "Starter Kit",
      btn: "Add to Cart"
    }
  };

  const t = text[lang];

  const handleAddToCart = () => {
    const user = localStorage.getItem("hk_user");
    if (!user) {
      router.push("/login");
      return;
    }

    // Simulasi tambah ke keranjang
    const cart = JSON.parse(localStorage.getItem("hk_cart") || "[]");
    cart.push(product);
    localStorage.setItem("hk_cart", JSON.stringify(cart));
    
    // Trigger event agar Navbar langsung update angkanya
    window.dispatchEvent(new Event("hk_cart_updated"));
    
    // Pindah ke halaman keranjang
    router.push("/cart");
  };

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen max-w-6xl flex flex-col justify-center">
      <Link href="/#inventory" className="inline-block text-primary font-bold uppercase tracking-widest mb-16 hover:text-white transition-colors border-b-2 border-primary pb-1 self-start">
        {t.back}
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Section - Glitchy/Edgy box */}
        <div className="relative group max-w-lg mx-auto w-full">
          <div className="absolute inset-0 bg-primary transform translate-x-6 translate-y-6 border-4 border-black"></div>
          <div className="relative aspect-square w-full bg-black border-4 border-white p-4">
            <div className="relative w-full h-full overflow-hidden filter grayscale group-hover:grayscale-0 transition-all duration-700">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary"></div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col relative w-full pt-8 lg:pt-0">
          {/* Background Text Decor */}
          <div className="absolute -top-10 lg:-top-20 -left-4 lg:-left-10 text-8xl lg:text-9xl font-black text-white/5 uppercase select-none pointer-events-none transform -skew-x-12 z-0">
            {product.id.padStart(2, '0')}
          </div>
          
          <div className="relative z-10 w-full">
            <div className="inline-block bg-white text-black px-4 py-1 font-bold uppercase tracking-widest text-sm mb-6 transform -skew-x-12">
              <span className="inline-block transform skew-x-12">{t.tag}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 transform -skew-x-2 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-8 w-full">
              <p className="text-2xl md:text-3xl font-black text-primary whitespace-nowrap">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <div className="h-1 flex-1 bg-white/20"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-400 mb-12 uppercase tracking-wide leading-relaxed border-l-4 border-primary pl-6 w-full max-w-xl">
              {product.description}
            </p>
            
            <button 
              onClick={handleAddToCart}
              className="group relative inline-flex bg-primary text-black font-black uppercase tracking-widest px-8 md:px-12 py-5 md:py-6 text-lg md:text-xl transform -skew-x-12 border-b-8 border-r-8 border-white/20 hover:translate-y-1 hover:border-b-4 hover:border-r-4 transition-all w-full md:w-fit items-center justify-center gap-4 mt-auto"
            >
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"></span>
              <ShoppingCart className="w-6 h-6 relative z-10 transform skew-x-12 group-hover:text-black" />
              <span className="relative z-10 inline-block transform skew-x-12 group-hover:text-black">{t.btn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

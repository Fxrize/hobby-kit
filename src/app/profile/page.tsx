"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LanguageContext";
import { User as UserIcon, PackageSearch } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import type { User } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { lang } = useLang();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("hk_user");
    router.push("/");
  };

  const text = {
    ID: {
      title: "Dasbor Akun",
      identity: "Informasi Profil",
      code: "Nama",
      emailLabel: "Email",
      status: "Status Akun",
      active: "Aktif",
      quests: "Pesanan Saya",
      noQuest: "Anda belum memiliki pesanan.",
      explore: "Lihat Katalog Produk",
      stats1: "Total Pesanan",
      stats2: "Poin Member",
      logoutBtn: "Keluar (Logout)"
    },
    EN: {
      title: "Account Dashboard",
      identity: "Profile Information",
      code: "Name",
      emailLabel: "Email",
      status: "Account Status",
      active: "Active",
      quests: "My Orders",
      noQuest: "You have no active orders.",
      explore: "View Product Catalog",
      stats1: "Total Orders",
      stats2: "Member Points",
      logoutBtn: "Log Out"
    }
  };

  const t = text[lang];

  if (!user) return <div className="min-h-screen bg-black"></div>;

  // Mengambil nama dari metadata Supabase saat register, atau default "UNKNOWN"
  const codename = user.user_metadata?.codename || "UNKNOWN";

  return (
    <div className="min-h-[85vh] flex justify-center bg-black py-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-10 transform -skew-x-2">
          {t.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: Identitas */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="bg-black border-4 border-primary p-6 transform -skew-x-1 shadow-[8px_8px_0_0_#FDE047]">
              <h2 className="text-xl font-black uppercase tracking-widest border-b-2 border-primary/20 pb-4 mb-6 text-primary">
                {t.identity}
              </h2>
              
              <div className="w-24 h-24 bg-white/5 border-2 border-white/20 mb-8 flex items-center justify-center transform -skew-x-2 relative overflow-hidden group">
                <Image 
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`} 
                  alt="Agent Avatar" 
                  fill 
                  className="object-cover p-2 group-hover:scale-110 transition-transform"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{t.code}</p>
                  <p className="text-2xl font-black text-white truncate">{codename}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{t.emailLabel}</p>
                  <p className="text-sm font-bold text-white break-all">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{t.status}</p>
                  <p className="text-green-400 font-black uppercase tracking-widest">{t.active}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogout} 
              className="bg-red-500/10 text-red-500 border-2 border-red-500 p-4 font-black uppercase tracking-widest hover:bg-red-500 hover:text-black transition-colors transform -skew-x-2 w-full text-center"
            >
              {t.logoutBtn}
            </button>
          </div>

          {/* KOLOM KANAN: Pesanan & Statistik */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
            
            {/* Box Pesanan */}
            <div className="bg-black border-4 border-white p-8 transform skew-x-1 flex-1">
              <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-6 border-l-4 border-primary pl-4">
                {t.quests}
              </h2>
              
              <div className="border-2 border-dashed border-white/20 p-12 text-center flex flex-col items-center justify-center h-full min-h-[250px]">
                <PackageSearch className="w-16 h-16 text-white/20 mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest mb-6">{t.noQuest}</p>
                <Link href="/#inventory" className="inline-block bg-primary text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition-colors transform -skew-x-6 border-b-4 border-r-4 border-black">
                  <span className="inline-block transform skew-x-6">{t.explore}</span>
                </Link>
              </div>
            </div>

            {/* Box Statistik */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black border-2 border-white/20 p-6 transform -skew-x-2 hover:border-primary transition-colors">
                <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">{t.stats1}</p>
                <p className="text-4xl md:text-5xl font-black text-white">0</p>
              </div>
              <div className="bg-black border-2 border-white/20 p-6 transform -skew-x-2 hover:border-primary transition-colors">
                <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">{t.stats2}</p>
                <p className="text-4xl md:text-5xl font-black text-primary">1</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", pass: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const text = {
    ID: {
      title: "Daftar Akun",
      subtitle: "Daftar untuk mengakses sistem dan fitur keranjang.",
      name: "Nama Lengkap",
      email: "Alamat Email",
      pass: "Kata Sandi",
      btn: "Daftar",
      switch: "Sudah punya akun? Masuk.",
      errorEmpty: "Gagal: Semua data wajib diisi."
    },
    EN: {
      title: "Register Account",
      subtitle: "Register to access the system and cart features.",
      name: "Full Name",
      email: "Email Address",
      pass: "Password",
      btn: "Register",
      switch: "Already have an account? Log in.",
      errorEmpty: "Failed: All fields are required."
    }
  };

  const t = text[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.pass) {
      setError(t.errorEmpty);
      setSuccess("");
      return;
    }
    
    // Matikan error sementara saat loading
    setError("");
    
    // === INTEGRASI SUPABASE AUTH (REGISTER) ===
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.pass,
      options: {
        data: {
          codename: formData.name,
        }
      }
    });

    if (signUpError) {
      setError(`Gagal: ${signUpError.message}`);
      return;
    }

    // Jika sukses
    setSuccess(lang === "ID" ? "Pendaftaran Berhasil. Mengalihkan..." : "Registration Successful. Redirecting...");
    
    // Backup state sementara ke localstorage untuk UX instan
    localStorage.setItem("hk_user", formData.name);

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-black py-20 relative overflow-hidden px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-black border-4 border-white p-8 transform skew-x-1 shadow-[12px_12px_0_0_#FDE047]">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 transform -skew-x-2">
          {t.title}
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6 border-b-2 border-white/10 pb-4">
          {t.subtitle}
        </p>

        {error && (
          <div className="bg-red-500/10 text-red-400 font-bold uppercase tracking-widest text-xs p-4 mb-6 transform -skew-x-2 border-l-4 border-red-500">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/10 text-green-400 font-bold uppercase tracking-widest text-xs p-4 mb-6 transform -skew-x-2 border-l-4 border-green-500">
            {success}
          </div>
        )}
        
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2 transform -skew-x-2">
              {t.name}
            </label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black border-2 border-white/30 text-white p-3 focus:outline-none focus:border-primary font-bold transition-colors"
              placeholder="YOUR.NAME"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2 transform -skew-x-2">
              {t.email}
            </label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black border-2 border-white/30 text-white p-3 focus:outline-none focus:border-primary font-bold transition-colors"
              placeholder="AGENT@HOBBY.KIT"
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2 transform -skew-x-2">
              {t.pass}
            </label>
            <input 
              type="password" 
              value={formData.pass}
              onChange={(e) => setFormData({...formData, pass: e.target.value})}
              className="w-full bg-black border-2 border-white/30 text-white p-3 focus:outline-none focus:border-primary font-bold transition-colors tracking-widest"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 bg-primary text-black font-black uppercase tracking-widest p-4 hover:bg-white hover:text-black transition-all transform -skew-x-6 border-b-4 border-r-4 border-black hover:translate-y-1 hover:border-b-2 hover:border-r-2"
          >
            <span className="inline-block transform skew-x-6">{t.btn}</span>
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t-2 border-white/10">
          <Link href="/login" className="text-gray-500 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">
            {t.switch}
          </Link>
        </div>
      </div>
    </div>
  );
}

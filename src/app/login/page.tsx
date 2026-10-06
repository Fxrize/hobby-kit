"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({ email: "", pass: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const text = {
    ID: {
      title: "Masuk Akun",
      subtitle: "Masuk untuk menyimpan hobi favorit Anda.",
      email: "Alamat Email",
      pass: "Kata Sandi",
      btn: "Masuk",
      switch: "Belum punya akun? Daftar sekarang.",
      errorEmpty: "Gagal: Email dan Kata Sandi wajib diisi."
    },
    EN: {
      title: "Account Login",
      subtitle: "Log in to save your favorite hobbies.",
      email: "Email Address",
      pass: "Password",
      btn: "Log In",
      switch: "Don't have an account? Register now.",
      errorEmpty: "Failed: Email and Password are required."
    }
  };

  const t = text[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.pass) {
      setError(t.errorEmpty);
      setSuccess("");
      return;
    }
    
    setError("");
    
    // === INTEGRASI SUPABASE AUTH (LOGIN) ===
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.pass,
    });

    if (signInError) {
      setError(lang === "ID" ? "Gagal: Email atau Kata Sandi salah." : "Failed: Incorrect Email or Password.");
      return;
    }

    setSuccess(lang === "ID" ? "Login Berhasil. Mengalihkan..." : "Login Successful. Redirecting...");
    
    // Simpan identitas ke localstorage (bisa diganti ambil dari token Supabase)
    localStorage.setItem("hk_user", data.user?.email || "active_agent");
    
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
          <Link href="/register" className="text-gray-500 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">
            {t.switch}
          </Link>
        </div>
      </div>
    </div>
  );
}

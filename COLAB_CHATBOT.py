# ============================================================
# HOBBYKIT CHATBOT SERVER - Google Colab
# Qwen/Qwen2.5-3B-Instruct + FastAPI + ngrok
# Jalankan sel ini di Colab, lalu copy URL ngrok ke .env.local
# ============================================================

# Sel 1: Install dependencies
# !pip install transformers torch fastapi uvicorn pyngrok nest-asyncio accelerate -q

# Sel 2: Jalankan server (copy semua kode di bawah ke satu sel)

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
import uvicorn
import nest_asyncio
import json

nest_asyncio.apply()

# ── Load Model ──────────────────────────────────────────────
MODEL_ID = "Qwen/Qwen2.5-3B-Instruct"

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)

print("Loading model (this may take a few minutes)...")
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto"
)
model.eval()
print("Model loaded!")

# ── System Prompt ────────────────────────────────────────────
SYSTEM_PROMPT = """Kamu adalah asisten HobbyKit, toko online starter kit hobi.
Tugasmu membantu pelanggan dengan pertanyaan seputar:
- Produk dan starter kit yang tersedia (melukis, merajut, origami, kopi, dll)
- Cara pemesanan dan pembayaran
- Informasi pengiriman (1-3 hari kerja)
- Garansi dan retur produk
- Rekomendasi kit sesuai minat pelanggan

Jawab singkat, ramah, dan gunakan bahasa sesuai pertanyaan pelanggan (Indonesia atau Inggris).
Jangan menjawab hal di luar topik HobbyKit."""

# ── FastAPI App ───────────────────────────────────────────────
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "HobbyKit Chatbot Server aktif"}

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_message = body.get("message", "")
    history = body.get("history", [])  # list of {role, content}

    if not user_message:
        return {"reply": "Pesan tidak boleh kosong."}

    # Susun conversation
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for h in history[-6:]:  # batasi 6 pesan terakhir agar tidak OOM
        messages.append(h)
    messages.append({"role": "user", "content": user_message})

    # Tokenize
    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    inputs = tokenizer([text], return_tensors="pt").to(model.device)

    # Generate
    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=256,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            pad_token_id=tokenizer.eos_token_id
        )

    # Decode hanya output baru (bukan prompt)
    new_tokens = output_ids[0][inputs["input_ids"].shape[1]:]
    reply = tokenizer.decode(new_tokens, skip_special_tokens=True).strip()

    return {"reply": reply}

# ── Expose via ngrok ─────────────────────────────────────────
# Ganti dengan ngrok authtoken kamu (gratis di https://dashboard.ngrok.com)
ngrok.set_auth_token("MASUKKAN_NGROK_AUTHTOKEN_KAMU_DISINI")

public_url = ngrok.connect(8000)
print(f"\n{'='*50}")
print(f"  CHATBOT SERVER AKTIF!")
print(f"  URL: {public_url}")
print(f"  Salin URL ini ke .env.local:")
print(f"  COLAB_CHAT_URL={public_url}")
print(f"{'='*50}\n")

uvicorn.run(app, host="0.0.0.0", port=8000)

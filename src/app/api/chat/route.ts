import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    const colabUrl = process.env.COLAB_CHAT_URL;

    if (!colabUrl) {
      return NextResponse.json(
        { reply: "Server chatbot belum dikonfigurasi. Pastikan COLAB_CHAT_URL sudah diisi di .env.local." },
        { status: 503 }
      );
    }

    const res = await fetch(`${colabUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
      signal: AbortSignal.timeout(30000), // 30 detik timeout
    });

    if (!res.ok) {
      throw new Error(`Colab server error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.reply });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Maaf, asisten sedang tidak tersedia. Coba lagi sesaat lagi." },
      { status: 500 }
    );
  }
}

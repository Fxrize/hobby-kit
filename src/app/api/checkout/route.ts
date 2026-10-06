import { NextResponse } from "next/server";
// @ts-expect-error - Midtrans doesn't have official TS types
import Midtrans from "midtrans-client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, user, total } = body;

    // Inisialisasi Midtrans Snap
    const snap = new Midtrans.Snap({
      isProduction: false, // Gunakan Sandbox (Uji Coba)
      serverKey: process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-placeholder",
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-placeholder",
    });

    const orderId = `HK-${Date.now()}`; // ID Transaksi Unik

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },
      customer_details: {
        first_name: user, // Ambil dari localstorage atau Supabase
        email: "buyer@example.com", // Dummy email untuk notifikasi
      },
      item_details: cart.map((item: { id: string, price: number, name: string }) => ({
        id: item.id,
        price: item.price,
        quantity: 1,
        name: item.name.substring(0, 50), // Batas karakter midtrans
      })),
    };

    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({ token: transaction.token });

  } catch (error) {
    console.error("Midtrans Error:", error);
    return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 500 });
  }
}

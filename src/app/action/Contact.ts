// app/action/contact.ts
"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ContactData {
  email: string;
  nomor: string;
  lokasi: string;
}

export async function updateContact(form: FormData) {
  const email = form.get("email") as string;
  const nomor = form.get("nomor") as string;
  const lokasi = form.get("lokasi") as string;

  const con = await db();
  try {
    // Asumsi insert baru setiap kali untuk menyimpan riwayat, atau ganti dengan UPDATE jika ingin overwrite
    await con.query(
      "INSERT INTO tb_contact (email, nomor, lokasi) VALUES (?, ?, ?)",
      [email || "", nomor || "", lokasi || ""]
    );
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to insert into database: ${error.message}`);
  } finally {
    con.release();
  }

  revalidatePath("/admin/contact"); // Sesuaikan path dengan halaman admin Anda
  return {
    status: "success",
    email,
    nomor,
    lokasi,
  };
}

export async function getLatestContact() {
  const con = await db();
  try {
    const [rows] = await con.query(
      "SELECT email, nomor, lokasi FROM tb_contact ORDER BY id DESC LIMIT 1"
    );
    return (rows as ContactData[])?.[0] || null;
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to fetch latest contact data: ${error.message}`);
  } finally {
    con.release();
  }
}

export default updateContact;

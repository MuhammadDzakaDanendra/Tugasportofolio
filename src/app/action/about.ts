// app/action/about.ts
"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface AboutData {
  text1: string;
  text2: string;
  lokasi: string;
  email: string;
  kotak1_1: string;
  kotak1_2: string;
  kotak2_1: string;
  kotak2_2: string;
  kotak3_1: string;
  kotak3_2: string;
  kotak4_1: string;
  kotak4_2: string;
}

export async function about(form: FormData) {
  const text1 = form.get("text1") as string;
  const text2 = form.get("text2") as string;
  const lokasi = form.get("lokasi") as string;
  const email = form.get("email") as string;
  const kotak1_1 = form.get("kotak1_1") as string;
  const kotak1_2 = form.get("kotak1_2") as string;
  const kotak2_1 = form.get("kotak2_1") as string;
  const kotak2_2 = form.get("kotak2_2") as string;
  const kotak3_1 = form.get("kotak3_1") as string;
  const kotak3_2 = form.get("kotak3_2") as string;
  const kotak4_1 = form.get("kotak4_1") as string;
  const kotak4_2 = form.get("kotak4_2") as string;

  const con = await db();
  try {
    await con.query(
      "INSERT INTO tb_about (text1, text2, lokasi, email, kotak1_1, kotak1_2, kotak2_1, kotak2_2, kotak3_1, kotak3_2, kotak4_1, kotak4_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        text1 || "",
        text2 || "",
        lokasi || "",
        email || "",
        kotak1_1 || "",
        kotak1_2 || "",
        kotak2_1 || "",
        kotak2_2 || "",
        kotak3_1 || "",
        kotak3_2 || "",
        kotak4_1 || "",
        kotak4_2 || "",
      ]
    );
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to insert into database: ${error.message}`);
  } finally {
    con.release();
  }

  revalidatePath("/admin/about");
  return {
    status: "success",
    text1,
    text2,
    lokasi,
    email,
    kotak1_1,
    kotak1_2,
    kotak2_1,
    kotak2_2,
    kotak3_1,
    kotak3_2,
    kotak4_1,
    kotak4_2,
  };
}

export async function getLatestAbout() {
  const con = await db();
  try {
    const [rows] = await con.query(
      "SELECT text1, text2, lokasi, email, kotak1_1, kotak1_2, kotak2_1, kotak2_2, kotak3_1, kotak3_2, kotak4_1, kotak4_2 FROM tb_about ORDER BY id DESC LIMIT 1"
    );
    return (rows as AboutData[])?.[0] || null;
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to fetch latest about data: ${error.message}`);
  } finally {
    con.release();
  }
}

export default about;

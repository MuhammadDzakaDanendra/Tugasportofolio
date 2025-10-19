"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function uploadFile(form: FormData) {
  const foto = form.get("foto") as File;
  const judul = form.get("judul") as string;
  const sub_judul = form.get("sub_judul") as string;

  if (!foto) {
    throw new Error("foto tidak boleh kosong");
  }

  // Validate file type and size
  if (!foto.type.startsWith("image/")) {
    throw new Error("Hanya file gambar yang diperbolehkan");
  }
  if (foto.size > 2 * 1024 * 1024) {
    // Limit to 2MB
    throw new Error("Ukuran file terlalu besar (maksimum 2MB)");
  }

  // Save the file
  const uploadDir = path.join(process.cwd(), "public/foto");
  await fs.mkdir(uploadDir, { recursive: true });
  const fileName = `${Date.now()}-${foto.name}`;
  const filePath = `/foto/${fileName}`;
  const fullPath = path.join(process.cwd(), "public", filePath);

  const buffer = Buffer.from(await foto.arrayBuffer());
  await fs.writeFile(fullPath, buffer);

  // Insert into database
  const con = await db();
  try {
    await con.query(
      "INSERT INTO tb_home (foto, judul, sub_judul) VALUES (?, ?, ?)",
      [filePath, judul || "", sub_judul || ""]
    );
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to insert into database: ${error.message}`);
  } finally {
    con.release();
  }

  revalidatePath("/admin/home");
  revalidatePath("/"); // Revalidate the portfolio page
  return {
    status: "success",
    foto: filePath,
    judul,
    sub_judul,
  };
}

export async function getLatestImage() {
  const con = await db();
  try {
    const [rows] = await con.query(
      "SELECT foto, judul, sub_judul FROM tb_home ORDER BY id DESC LIMIT 1"
    );
    return (
      (rows as { foto: string; judul: string; sub_judul: string }[])[0] || null
    );
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to fetch latest image: ${error.message}`);
  } finally {
    con.release();
  }
}

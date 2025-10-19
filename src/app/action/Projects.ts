"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// Tentukan direktori penyimpanan gambar
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/projects");

interface ProjectData {
  gambar: string;
  judul: string;
  sub_judul: string;
  bahasa: string;
}

export async function projects(form: FormData) {
  // Pastikan direktori penyimpanan ada
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  // Fungsi untuk menyimpan file gambar
  async function saveImage(
    file: File | null,
    projectDir: string
  ): Promise<string> {
    if (!file) return "";
    const projectPath = path.join(UPLOAD_DIR, projectDir);
    await fs.mkdir(projectPath, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(projectPath, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    return `/uploads/projects/${projectDir}/${fileName}`;
  }

  // Ambil file dan data teks dari FormData
  const gambar1 =
    form.get("gambar1") instanceof File
      ? await saveImage(form.get("gambar1") as File, "project1")
      : "";
  const judul1 = form.get("judul1")?.toString() || "";
  const sub_judul1 = form.get("sub_judul1")?.toString() || "";
  const bahasa1 = form.get("bahasa1")?.toString() || "";

  const gambar2 =
    form.get("gambar2") instanceof File
      ? await saveImage(form.get("gambar2") as File, "project2")
      : "";
  const judul2 = form.get("judul2")?.toString() || "";
  const sub_judul2 = form.get("sub_judul2")?.toString() || "";
  const bahasa2 = form.get("bahasa2")?.toString() || "";

  const gambar3 =
    form.get("gambar3") instanceof File
      ? await saveImage(form.get("gambar3") as File, "project3")
      : "";
  const judul3 = form.get("judul3")?.toString() || "";
  const sub_judul3 = form.get("sub_judul3")?.toString() || "";
  const bahasa3 = form.get("bahasa3")?.toString() || "";

  // Validasi bahwa setidaknya satu proyek memiliki semua field
  const hasProject1 = gambar1 && judul1 && sub_judul1 && bahasa1;
  const hasProject2 = gambar2 && judul2 && sub_judul2 && bahasa2;
  const hasProject3 = gambar3 && judul3 && sub_judul3 && bahasa3;

  if (!hasProject1 && !hasProject2 && !hasProject3) {
    throw new Error("At least one project must have all fields provided.");
  }

  const con = await db();
  try {
    // Insert ke tb_proyek1
    if (hasProject1) {
      await con.query(
        "INSERT INTO tb_proyek1 (gambar, judul, sub_judul, bahasa) VALUES (?, ?, ?, ?)",
        [gambar1, judul1, sub_judul1, bahasa1]
      );
    }

    // Insert ke tb_proyek2
    if (hasProject2) {
      await con.query(
        "INSERT INTO tb_proyek2 (gambar, judul, sub_judul, bahasa) VALUES (?, ?, ?, ?)",
        [gambar2, judul2, sub_judul2, bahasa2]
      );
    }

    // Insert ke tb_proyek3
    if (hasProject3) {
      await con.query(
        "INSERT INTO tb_proyek3 (gambar, judul, sub_judul, bahasa) VALUES (?, ?, ?, ?)",
        [gambar3, judul3, sub_judul3, bahasa3]
      );
    }
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to insert into database: ${error.message}`);
  } finally {
    con.release();
  }

  revalidatePath("/admin/projects");
  return {
    status: "success",
    project1: {
      gambar: gambar1,
      judul: judul1,
      sub_judul: sub_judul1,
      bahasa: bahasa1,
    },
    project2: {
      gambar: gambar2,
      judul: judul2,
      sub_judul: sub_judul2,
      bahasa: bahasa2,
    },
    project3: {
      gambar: gambar3,
      judul: judul3,
      sub_judul: sub_judul3,
      bahasa: bahasa3,
    },
  };
}

export async function getLatestProjects() {
  const con = await db();
  try {
    const [project1] = await con.query(
      "SELECT gambar, judul, sub_judul, bahasa FROM tb_proyek1 ORDER BY id DESC LIMIT 1"
    );
    const [project2] = await con.query(
      "SELECT gambar, judul, sub_judul, bahasa FROM tb_proyek2 ORDER BY id DESC LIMIT 1"
    );
    const [project3] = await con.query(
      "SELECT gambar, judul, sub_judul, bahasa FROM tb_proyek3 ORDER BY id DESC LIMIT 1"
    );

    return {
      project1: (project1 as ProjectData[])?.[0] || null,
      project2: (project2 as ProjectData[])?.[0] || null,
      project3: (project3 as ProjectData[])?.[0] || null,
    };
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to fetch latest projects data: ${error.message}`);
  } finally {
    con.release();
  }
}

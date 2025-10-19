// File 1: actions/skills.ts (or similar path for server actions)
"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface SkillData {
  keterangan: string;
}

export async function skills(form: FormData) {
  // Retrieve form values with fallback to empty string
  const keterangan1 = form.get("keterangan1")?.toString() || "";
  const keterangan2 = form.get("keterangan2")?.toString() || "";
  const keterangan3 = form.get("keterangan3")?.toString() || "";
  const keterangan4 = form.get("keterangan4")?.toString() || "";

  // Validate that at least one field has a value (optional, adjust as needed)
  if (!keterangan1 && !keterangan2 && !keterangan3 && !keterangan4) {
    throw new Error("At least one skill field must be provided.");
  }

  const con = await db();
  try {
    // Insert into tb_skills1
    if (keterangan1) {
      await con.query("INSERT INTO tb_skills1 (keterangan) VALUES (?)", [
        keterangan1,
      ]);
    }

    // Insert into tb_skills2
    if (keterangan2) {
      await con.query("INSERT INTO tb_skills2 (keterangan) VALUES (?)", [
        keterangan2,
      ]);
    }

    // Insert into tb_skills3
    if (keterangan3) {
      await con.query("INSERT INTO tb_skills3 (keterangan) VALUES (?)", [
        keterangan3,
      ]);
    }

    // Insert into tb_skills4
    if (keterangan4) {
      await con.query("INSERT INTO tb_skills4 (keterangan) VALUES (?)", [
        keterangan4,
      ]);
    }
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to insert into database: ${error.message}`);
  } finally {
    con.release();
  }

  revalidatePath("/admin/about");
  return {
    status: "success",
    keterangan1,
    keterangan2,
    keterangan3,
    keterangan4,
  };
}

export async function getLatestSkills() {
  const con = await db();
  try {
    const [skills1] = await con.query(
      "SELECT keterangan FROM tb_skills1 ORDER BY id DESC LIMIT 1"
    );
    const [skills2] = await con.query(
      "SELECT keterangan FROM tb_skills2 ORDER BY id DESC LIMIT 1"
    );
    const [skills3] = await con.query(
      "SELECT keterangan FROM tb_skills3 ORDER BY id DESC LIMIT 1"
    );
    const [skills4] = await con.query(
      "SELECT keterangan FROM tb_skills4 ORDER BY id DESC LIMIT 1"
    );

    return {
      keterangan1: (skills1 as SkillData[])?.[0]?.keterangan || null,
      keterangan2: (skills2 as SkillData[])?.[0]?.keterangan || null,
      keterangan3: (skills3 as SkillData[])?.[0]?.keterangan || null,
      keterangan4: (skills4 as SkillData[])?.[0]?.keterangan || null,
    };
  } catch (error: any) {
    console.error("Database error:", error.message);
    throw new Error(`Failed to fetch latest skills data: ${error.message}`);
  } finally {
    con.release();
  }
}

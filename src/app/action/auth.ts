"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RowDataPacket } from "mysql2";
import { deleteAuthCookie } from "@/lib/cookies";
import { error } from "console";

//REGISTER
export async function register(form: FormData) {
  const name = form.get("name") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  if (!name || !email || !password) {
    revalidatePath("/register");
    return {
      error: "Semua field harus diisi",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const connection = await db();
  const [existingUse] = await connection.query(
    "select * from users where email=?",
    [email]
  );
  if ((existingUse as RowDataPacket[]).length > 0) {
    connection.release();
    revalidatePath("/register");
    return {
      error: "Email sudah terdaftar",
    };
  }
  await connection.query(
    "insert into users (name, email, password, role) values (?, ?, ?, ?)",
    [name, email, hashedPassword, "user"]
  );
  connection.release();

  const token = await createToken({ email });
  await setAuthCookie(token);
  revalidatePath("/register");
}

//L0GIN
export async function login(form: FormData) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  if (!email || !password) {
    revalidatePath("/login");
    return {
      error: "semua field harus di isi",
    };
  }
  const connection = await db();
  const [rows] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email=?",
    [email]
  );
  connection.release();
  if (rows.length === 0) {
    return {
      error: "username tidak ditemukan",
    };
  }
  const user = rows[0] as { email: string; password: string };
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      error: "password salah",
    };
  }
  const token = await createToken({ email: user.email });
  await setAuthCookie(token);
  revalidatePath("/admin");
  redirect("/admin");
}

//LOGOUT
export async function logout() {
  await deleteAuthCookie();
  redirect("/");
}

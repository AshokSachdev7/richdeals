"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API = process.env.API_INTERNAL_URL || "http://localhost:4000";
const COOKIE = "rd_admin";

function adminKey(): string {
  const k = process.env.ADMIN_KEY;
  if (!k) throw new Error("ADMIN_KEY not configured");
  return k;
}

// Cookie holds the raw key (httpOnly) — matched against ADMIN_KEY server-side only.
export async function isAuthed(): Promise<boolean> {
  const c = (await cookies()).get(COOKIE)?.value;
  return !!c && c === process.env.ADMIN_KEY;
}

export async function login(formData: FormData) {
  const pw = String(formData.get("key") || "").trim();
  if (pw && pw === process.env.ADMIN_KEY) {
    (await cookies()).set(COOKIE, pw, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/admin");
  }
  redirect("/admin?e=1");
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect("/admin");
}

async function call(path: string, init: RequestInit) {
  if (!(await isAuthed())) throw new Error("Not authed");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "x-admin-key": adminKey(), "content-type": "application/json", ...(init.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text().catch(() => "")}`);
  return res.json();
}

export async function setStatus(id: number, status: string) {
  await call(`/admin/deals/${id}/status`, { method: "POST", body: JSON.stringify({ status }) });
  revalidatePath("/admin");
}

export async function remove(id: number) {
  await call(`/admin/deals/${id}`, { method: "DELETE" });
  revalidatePath("/admin");
}

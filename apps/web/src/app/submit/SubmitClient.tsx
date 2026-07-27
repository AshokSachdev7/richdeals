"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Result = { status: string; points: number; slug?: string; message: string };

const EMPTY = { url: "", title: "", price: "", mrp: "", couponCode: "", description: "" };

// Phone photos are 4-8MB; the API caps a data URL at 6MB. Draw to a canvas at 1200px
// and re-encode as JPEG — that lands ~200KB and costs no dependency.
function downscale(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That file is not an image."));
      img.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.85));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function SubmitClient() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Result | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((r) => setSignedIn(r.ok))
      .catch(() => setSignedIn(false));
  }, []);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const dataUrl = await downscale(file);
      setPreview(dataUrl);
      const r = await fetch(`${API}/auth/upload-image`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.message || "Upload failed.");
      setImage(j.url);
    } catch (err) {
      setPreview("");
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch(`${API}/auth/submit-deal`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: image || undefined }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.message || "Could not post that deal.");
      setDone(j as Result);
      setForm(EMPTY);
      setImage("");
      setPreview("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post that deal.");
    } finally {
      setBusy(false);
    }
  }

  if (signedIn === false) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">Post a deal</h1>
        <p className="mt-3 text-ink-soft">
          Sign in first — we pay ₹1 into your account for every deal we publish, so it has to land on a real member.
        </p>
        <Link
          href="/account"
          className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
        >
          Sign in or join free
        </Link>
      </section>
    );
  }

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-5xl" aria-hidden="true">
          {done.status === "live" ? "🎉" : "⏳"}
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">
          {done.status === "live" ? "Your deal is live" : "Sent for a price check"}
        </h1>
        <p className="mt-3 text-ink-soft">{done.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {done.status === "live" && done.slug && (
            <Link href={`/${done.slug}`} className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark">
              View the deal page
            </Link>
          )}
          <button
            onClick={() => setDone(null)}
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-ink hover:border-brand hover:text-brand"
          >
            Post another
          </button>
          <Link href="/account" className="rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-ink hover:border-brand hover:text-brand">
            My points
          </Link>
        </div>
      </section>
    );
  }

  const field = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
  const label = "block text-sm font-bold text-ink";

  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Post a deal</h1>
      <p className="mt-2 text-ink-soft">
        Found something genuinely cheap? Paste the product link. We check the price, publish it with your name on it and
        credit <strong>₹1</strong> to your account.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label className={label} htmlFor="url">
            Product link <span className="text-brand">*</span>
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">
            Full product page only — Amazon /dp/, Flipkart /p/, or any store&apos;s product URL. Short links won&apos;t work.
          </p>
          <input id="url" required value={form.url} onChange={set("url")} placeholder="https://www.amazon.in/dp/B0…" className={`${field} mt-2`} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="price">
              Deal price (₹)
            </label>
            <input id="price" inputMode="numeric" value={form.price} onChange={set("price")} placeholder="1499" className={`${field} mt-2`} />
          </div>
          <div>
            <label className={label} htmlFor="mrp">
              MRP (₹)
            </label>
            <input id="mrp" inputMode="numeric" value={form.mrp} onChange={set("mrp")} placeholder="3999" className={`${field} mt-2`} />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="title">
            Title
          </label>
          <p className="mt-0.5 text-xs text-ink-soft">Leave blank and we&apos;ll pull the product name off the store page.</p>
          <input id="title" value={form.title} onChange={set("title")} placeholder="boAt Airdopes 141 TWS Earbuds" className={`${field} mt-2`} />
        </div>

        <div>
          <label className={label} htmlFor="couponCode">
            Coupon code <span className="font-normal text-ink-soft">(if one is needed)</span>
          </label>
          <input id="couponCode" value={form.couponCode} onChange={set("couponCode")} placeholder="SAVE200" className={`${field} mt-2 uppercase`} />
        </div>

        <div>
          <label className={label} htmlFor="description">
            Why is it a good deal?
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={set("description")}
            placeholder="Lowest it has been in 3 months. Bank offer stacks on top."
            className={`${field} mt-2`}
          />
        </div>

        <div>
          <span className={label}>Product photo</span>
          <p className="mt-0.5 text-xs text-ink-soft">Optional — we use the store&apos;s image if you skip it. JPG, PNG or WebP.</p>
          <div className="mt-2 flex items-center gap-4">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={pickImage}
              className="block w-full text-sm text-ink-soft file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-brand"
            />
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Selected product photo" className="h-16 w-16 shrink-0 rounded-lg border border-gray-200 object-contain" />
            )}
          </div>
          {uploading && <p className="mt-2 text-sm font-semibold text-ink-soft">Uploading…</p>}
          {image && !uploading && <p className="mt-2 text-sm font-semibold text-green-700">Photo attached ✓</p>}
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-brand-dark">{error}</p>}

        <button
          type="submit"
          disabled={busy || uploading || signedIn === null}
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
        >
          {busy ? "Posting…" : "Post the deal"}
        </button>

        <p className="text-xs text-ink-soft">
          We verify the price against the store before publishing. Deals we can&apos;t read automatically (Amazon, mostly)
          wait for a manual check — points land when it goes live. One payout per deal, first submitter wins.
        </p>
      </form>
    </section>
  );
}

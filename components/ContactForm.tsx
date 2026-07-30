"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-md border border-paper/20 bg-transparent px-4 py-3 font-sora text-paper placeholder-paper/40 outline-none transition-colors focus:border-sienna";

  if (status === "sent") {
    return (
      <div className="rounded-md border border-paper/20 p-8">
        <p className="eyebrow text-sienna">Received</p>
        <p className="mt-4 font-marcellus text-2xl text-paper">Thank you — your note is on its way.</p>
        <p className="mt-3 font-sora text-sm font-light text-paper/70">
          Gus will be in touch shortly about the piece. If it&apos;s easier, call{" "}
          <a href="tel:+13109888522" className="link-underline text-sienna">
            +1 (310) 988-8522
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="eyebrow link-underline mt-6 inline-block text-paper/70"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-paper/60">Name</span>
          <input required value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-paper/60">Email</span>
          <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@email.com" />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60">Phone</span>
        <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="Optional" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60">Tell me about the piece</span>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder="The wood, the scale, where it will live…"
        />
      </label>

      <div className="flex items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-sienna px-8 py-3 font-sora text-sm font-600 text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ fontWeight: 600 }}
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "error" && (
          <span className="font-sora text-sm font-light text-sienna">
            Something went wrong — please call instead.
          </span>
        )}
      </div>
    </form>
  );
}

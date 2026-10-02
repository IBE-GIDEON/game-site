"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Chip, Field, Input, Textarea } from "@/components/ui/Form";
import Button from "@/components/ui/Button";

const topics = ["Booking", "Corporate", "Partnership", "Something else"];

export default function ContactForm() {
  const [topic, setTopic] = useState("Booking");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(d.get("name")).trim()) next.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email")))) next.email = "Enter a valid email";
    if (String(d.get("message")).trim().length < 5) next.message = "Tell us a little more";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("sending");
    // Demo build: no backend wired yet.
    window.setTimeout(() => setState("sent"), 1000);
  };

  return (
    <div className="panel p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col justify-center">
            <span className="grid size-14 place-items-center rounded-[2px] bg-pb/15 text-pb ring-1 ring-pb/30">
              <CheckCircle size={28} weight="fill" />
            </span>
            <h3 className="font-display mt-8 text-[2.2rem] text-white">Message received.</h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-smoke">Thanks for getting in touch. We usually reply within two hours during opening times.</p>
            <div className="mt-8">
              <Button variant="outline" icon={false} onClick={() => setState("idle")}>
                Send another message
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
                  {t}
                </Chip>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" error={errors.name}>
                <Input name="name" autoComplete="name" invalid={!!errors.name} />
              </Field>
              <Field label="Phone" hint="Optional">
                <Input name="phone" type="tel" autoComplete="tel" placeholder="+44" />
              </Field>
            </div>
            <Field label="Email" error={errors.email}>
              <Input name="email" type="email" autoComplete="email" invalid={!!errors.email} />
            </Field>
            <Field label="Message" error={errors.message}>
              <Textarea name="message" invalid={!!errors.message} placeholder="How can we help?" />
            </Field>
            <label className="flex items-center gap-3 text-[13px] text-smoke">
              <input type="checkbox" name="news" className="size-4 accent-[#e3101c]" />
              Send me tournament dates, discounts and news
            </label>
            <div className="pt-2">
              <Button type="submit" size="lg" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send message"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Chip, Field, Input, Textarea } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const services = ["Birthday", "Corporate", "Private hire", "Other"];
const budgets = ["Under £300", "£300 to £500", "Over £500"];

type Errors = Partial<Record<"first" | "last" | "email" | "date" | "time", string>>;

export default function EnquiryForm() {
  const [service, setService] = useState<string[]>(["Birthday"]);
  const [budget, setBudget] = useState("£300 to £500");
  const [drivers, setDrivers] = useState(10);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("first")).trim()) next.first = "Required";
    if (!String(data.get("last")).trim()) next.last = "Required";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email")))) next.email = "Enter a valid email";
    if (!data.get("date")) next.date = "Required";
    if (!data.get("time")) next.time = "Required";
    setErrors(next);
    if (Object.keys(next).length) return;
    setName(String(data.get("first")));
    setState("sending");
    // Demo build: no backend wired yet. Simulate the round trip.
    window.setTimeout(() => setState("sent"), 1100);
  };

  return (
    <div className="panel relative overflow-hidden p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[520px] flex-col items-start justify-center"
          >
            <span className="grid size-14 place-items-center rounded-[2px] bg-pb/15 text-pb ring-1 ring-pb/30">
              <CheckCircle size={28} weight="fill" />
            </span>
            <h3 className="font-display mt-8 text-[clamp(1.8rem,3.36vw,2.52rem)] text-white">You&apos;re on the grid, {name}.</h3>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-smoke">
              We&apos;ve received your enquiry for {drivers} drivers. We&apos;ll confirm availability and send your invoice,
              usually within two hours. Need it faster? Call or WhatsApp {site.phone}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.whatsapp}>Message on WhatsApp</Button>
              <Button variant="outline" icon={false} onClick={() => setState("idle")}>
                Send another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" error={errors.first}>
                <Input name="first" autoComplete="given-name" invalid={!!errors.first} />
              </Field>
              <Field label="Last name" error={errors.last}>
                <Input name="last" autoComplete="family-name" invalid={!!errors.last} />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input name="email" type="email" autoComplete="email" invalid={!!errors.email} />
              </Field>
              <Field label="Phone" hint="Optional">
                <Input name="phone" type="tel" autoComplete="tel" placeholder="+44" />
              </Field>
            </div>

            <div>
              <div className="mb-3 text-[13px] text-bone/90">What are you planning?</div>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <Chip
                    key={s}
                    active={service.includes(s)}
                    onClick={() => setService((v) => (v.includes(s) ? v.filter((x) => x !== s) : [...v, s]))}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-3 flex items-baseline justify-between text-[13px]">
                  <span className="text-bone/90">Number of drivers</span>
                  <span className="tabular font-mono text-white">{drivers}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={30}
                  value={drivers}
                  onChange={(e) => setDrivers(Number(e.target.value))}
                  className="h-12 w-full cursor-pointer accent-[#e3101c]"
                  aria-label="Number of drivers"
                />
              </div>
              <div>
                <div className="mb-3 text-[13px] text-bone/90">Budget</div>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
                      {b}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Preferred date" error={errors.date}>
                <Input name="date" type="date" invalid={!!errors.date} />
              </Field>
              <Field label="Start time" error={errors.time}>
                <Input name="time" type="time" invalid={!!errors.time} />
              </Field>
              <Field label="Hours needed">
                <Input name="hours" type="number" min={1} max={8} defaultValue={2} />
              </Field>
            </div>

            <Field label="Anything else?" hint="Optional">
              <Textarea name="notes" placeholder="Ages, cake, catering or a trophy for the boss" />
            </Field>

            <div className="flex flex-col-reverse items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
              <p className="text-[13px] text-ash">We reply within two hours during opening times.</p>
              <Button type="submit" size="lg" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Request availability"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

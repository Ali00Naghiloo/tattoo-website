"use client";

import { useRef, useState, type FormEvent } from "react";

import ArrowButton from "@/components/ui/ArrowButton";
import { submitContactRequest } from "@/lib/contact";
import { gsap, useGSAP } from "@/lib/gsap";

import Checkbox from "./Checkbox";
import ChoiceGroup from "./ChoiceGroup";
import FileField from "./FileField";
import TextField from "./TextField";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  // Fields rise in one after another as the form scrolls into view.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-field]", {
        y: 50,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 1.2,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  // Success panel entrance.
  useGSAP(
    () => {
      if (status !== "sent") return;
      gsap.from("[data-success] > *", { yPercent: 60, autoAlpha: 0, stagger: 0.1, duration: 1.2 });
    },
    { scope: root, dependencies: [status] },
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      await submitContactRequest(new FormData(form));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={root}>
      {status === "sent" ? (
        <div data-success role="status" className="flex min-h-[60vh] flex-col items-start justify-center gap-8">
          <span className="eyebrow">Request received</span>
          <p className="font-display font-light text-[clamp(3rem,6vw,6rem)] leading-[0.95]">
            Thank you — <em>talk soon.</em>
          </p>
          <p className="max-w-md text-mute">I&apos;ll look through your idea and get back to you personally.</p>
          <ArrowButton label="Send another" onClick={() => setStatus("idle")} />
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          <div data-field className="md:col-span-2">
            <ChoiceGroup legend="Salutation" name="salutation" options={["Ms", "Mr", "Mx"]} />
          </div>
          <div data-field>
            <TextField label="Your name" name="name" autoComplete="name" required />
          </div>
          <div data-field>
            <TextField label="Email address" name="email" type="email" autoComplete="email" required />
          </div>
          <div data-field>
            <TextField label="Phone number" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div data-field>
            <TextField label="Preferred date" name="date" type="date" />
          </div>
          <div data-field className="md:col-span-2">
            <TextField label="Number of tattoos at this appointment" name="count" type="number" min={1} max={10} inputMode="numeric" />
          </div>
          <div data-field className="md:col-span-2">
            <TextField label="Your idea — placement, size, style…" name="message" multiline required />
          </div>
          <div data-field className="md:col-span-2">
            <FileField label="Design reference (optional)" name="reference" />
          </div>
          <div data-field>
            <ChoiceGroup legend="Is this your first request?" name="firstRequest" options={["Yes", "No"]} />
          </div>
          <div data-field>
            <ChoiceGroup legend="Have I tattooed you before?" name="returning" options={["Yes", "No"]} />
          </div>
          <div data-field className="md:col-span-2">
            <Checkbox name="privacy" required>
              I have read and accept the <a href="#" className="text-bone underline underline-offset-4">privacy policy</a>.
            </Checkbox>
          </div>
          <div data-field className="flex flex-wrap items-center gap-6 md:col-span-2">
            <ArrowButton type="submit" size="lg" label={status === "sending" ? "Sending…" : "Send request"} disabled={status === "sending"} />
            <p aria-live="polite" className="text-sm text-ember">
              {status === "error" && "Something went wrong — please try again or message me on Instagram."}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialState: FormState = { name: "", email: "", subject: "", message: "" };

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(field: keyof FormState, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent."
          description="Have a role, a project, or just want to talk about RAG pipelines and Solidity? Reach out."
        />

        <div className="mx-auto max-w-xl">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <Field
              label="Name"
              id="name"
              value={values.name}
              onChange={(v) => handleChange("name", v)}
              error={errors.name}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={values.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
            />
            <Field
              label="Subject"
              id="subject"
              value={values.subject}
              onChange={(v) => handleChange("subject", v)}
              error={errors.subject}
            />
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-ink-soft">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full resize-none rounded border border-line-strong bg-surface/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-signal"
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded bg-ink px-5 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-signal disabled:opacity-60"
            >
              <Send size={15} />
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-1.5 text-sm text-signal-dim">
                <CheckCircle2 size={15} /> Message sent — thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
                <AlertCircle size={15} /> Something went wrong. Please email directly instead.
              </p>
            )}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded border border-line-strong bg-surface/60 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-signal"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

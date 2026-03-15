"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

function UnderlineInput({
  label,
  type = "text",
  error,
  ...props
}: {
  label: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const inputId = `field-${props.name}`;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.2em] text-text/50"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="peer w-full border-b border-text/20 bg-transparent py-3 font-[family-name:var(--font-body)] text-base text-text focus:outline-none"
          {...props}
        />
        <div className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-text transition-transform duration-300 ease-out peer-focus:scale-x-100" />
      </div>
      {error && (
        <span
          id={errorId}
          role="alert"
          className="mt-1 block font-[family-name:var(--font-body)] text-xs text-accent"
        >
          {error}
        </span>
      )}
    </div>
  );
}

function UnderlineTextarea({
  label,
  error,
  tall = false,
  ...props
}: {
  label: string;
  error?: string;
  tall?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const inputId = `field-${props.name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={tall ? "flex flex-col lg:h-full" : ""}>
      <label
        htmlFor={inputId}
        className="block font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.2em] text-text/50"
      >
        {label}
      </label>
      <div className={`relative ${tall ? "flex-1" : ""}`}>
        <textarea
          id={inputId}
          rows={tall ? undefined : 4}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`peer w-full resize-none border-b border-text/20 bg-transparent py-3 font-[family-name:var(--font-body)] text-base text-text focus:outline-none ${
            tall ? "h-full min-h-[100px]" : ""
          }`}
          {...props}
        />
        <div className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-text transition-transform duration-300 ease-out peer-focus:scale-x-100" />
      </div>
      {error && (
        <span
          id={errorId}
          role="alert"
          className="mt-1 block font-[family-name:var(--font-body)] text-xs text-accent"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16">
        {/* Left column: Name, Email, Company */}
        <div className="space-y-6">
          <UnderlineInput
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <UnderlineInput
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <UnderlineInput
            label="Company / Organization"
            {...register("company")}
            error={errors.company?.message}
          />
        </div>

        {/* Right column: Message (spans full height on desktop) */}
        <div className="mt-6 lg:mt-0">
          <UnderlineTextarea
            label="Message"
            tall
            {...register("message", { required: "Message is required" })}
            error={errors.message?.message}
          />
        </div>
      </div>

      {/* Submit row */}
      <div className="mt-10 flex items-center gap-5">
        {/* Circular submit with rotating halo */}
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label="Submit contact form"
          className="group relative flex h-14 w-14 shrink-0 items-center justify-center"
        >
          {/* Rotating halo ring */}
          <div
            className="absolute inset-[-3px] rounded-full transition-transform duration-300 group-hover:scale-[1.15]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #FF7C48 40%, transparent 80%)",
              animation: "halo-spin 3s linear infinite",
            }}
          />
          {/* Button face */}
          <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-bg overflow-hidden">
            <span className="relative block overflow-hidden h-5 w-5">
              <svg
                className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-full"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
              <svg
                className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </span>
          </div>
        </button>

        <span className="font-[family-name:var(--font-body)] text-[13px] uppercase tracking-[0.15em] text-accent">
          Send
        </span>

        <div aria-live="polite" aria-atomic="true">
          <span className="font-[family-name:var(--font-body)] text-sm text-text/50">
            {status === "sending" && "Sending..."}
            {status === "success" && "Message sent. We\u2019ll be in touch."}
            {status === "error" && "Something went wrong. Please try again."}
          </span>
        </div>
      </div>
    </form>
  );
}

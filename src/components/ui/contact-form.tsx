"use client";

import { useForm, ValidationError } from "@formspree/react";

function UnderlineInput({
  label,
  type = "text",
  name,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  const inputId = `field-${name}`;

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
          name={name}
          required={required}
          className="peer w-full border-b border-text/20 bg-transparent py-3 font-[family-name:var(--font-body)] text-base text-text focus:outline-none"
        />
        <div className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-text transition-transform duration-300 ease-out peer-focus:scale-x-100" />
      </div>
    </div>
  );
}

function UnderlineTextarea({
  label,
  name,
  required,
  tall = false,
}: {
  label: string;
  name: string;
  required?: boolean;
  tall?: boolean;
}) {
  const inputId = `field-${name}`;

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
          name={name}
          required={required}
          rows={tall ? undefined : 4}
          className={`peer w-full resize-none border-b border-text/20 bg-transparent py-3 font-[family-name:var(--font-body)] text-base text-text focus:outline-none ${
            tall ? "h-full min-h-[100px]" : ""
          }`}
        />
        <div className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-text transition-transform duration-300 ease-out peer-focus:scale-x-100" />
      </div>
    </div>
  );
}

export function ContactForm() {
  const [state, handleSubmit] = useForm("xeoklqkv");

  if (state.succeeded) {
    return (
      <div className="w-full py-12">
        <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold uppercase mb-4">
          Message sent.
        </p>
        <p className="font-[family-name:var(--font-body)] text-base text-text/60">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16">
        {/* Left column: Name, Email, Company */}
        <div className="space-y-6">
          <div>
            <UnderlineInput label="Name" name="name" required />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="mt-1 block font-[family-name:var(--font-body)] text-xs text-accent"
            />
          </div>
          <div>
            <UnderlineInput label="Email" type="email" name="email" required />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="mt-1 block font-[family-name:var(--font-body)] text-xs text-accent"
            />
          </div>
          <UnderlineInput label="Company / Organization" name="company" />
        </div>

        {/* Right column: Message (spans full height on desktop) */}
        <div className="mt-6 lg:mt-0">
          <UnderlineTextarea label="Message" name="message" tall required />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="mt-1 block font-[family-name:var(--font-body)] text-xs text-accent"
          />
        </div>
      </div>

      {/* Submit row */}
      <div className="mt-10 flex items-center gap-5">
        {/* Circular submit with rotating halo */}
        <button
          type="submit"
          disabled={state.submitting}
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

        {state.submitting && (
          <span className="font-[family-name:var(--font-body)] text-sm text-text/50">
            Sending...
          </span>
        )}
      </div>
    </form>
  );
}

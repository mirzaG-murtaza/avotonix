"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const featureHighlights = [
  {
    title: "Omnichannel AI solutions",
    description:
      "Voice, SMS, email, and chat work together so no lead slips through. Avotonix handles inbound greetings, outbound reactivation, and keeps every conversation moving forward.",
    bullets: ["Conversations tailored to your brand", "Real-time CRM updates", "Intelligent escalation routing", "Automated follow-up and nurture"],
  },
  {
    title: "Qualify and convert every opportunity",
    description:
      "We qualify every interaction--from new callers to dormant leads. We capture intent, answer FAQs, and drop qualified bookings straight to your calendar or ticketing system.",
    bullets: ["Proactive lead nurturing", "Calendar sync & reminders", "Human warm transfer options"],
  },
  {
    title: "Brand-safe AI solutions",
    description:
      "Natural speech models tuned to your brand tone, with sentiment awareness and compliance guardrails built into every interaction from day one.",
    bullets: ["Multi-lingual support", "PCI & HIPAA modes", "Zero hallucination architecture"],
  },
];

const metrics = [
  { label: "Average response rate", value: "98%" },
  { label: "Meetings booked", value: "3.2x" },
  { label: "Coverage hours", value: "24/7" },
];

const industries = [
  "Professional services",
  "Healthcare clinics",
  "Real estate",
  "Home services",
  "Hospitality",
  "Legal practices",
];

const processSteps = [
  {
    title: "Discover & script",
    description: "We map your intake workflows and translate them into branded conversation flows in under a week.",
  },
  {
    title: "Integrate & launch",
    description: "Plug Avotonix into your calendars, phone systems, and CRMs with secure handshakes.",
  },
  {
    title: "Learn & optimize",
    description: "Live dashboards surface insights, while our team tunes prompts for conversion and compliance.",
  },
];

const testimonials = [
  {
    quote:
      "Avotonix took our missed calls from 32% to under 4% in a month. Clients think they're speaking with our in-house reception team.",
    name: "Karen Alvarez",
    role: "Director of Operations, Midtown Clinics",
  },
  {
    quote:
      "The AI concierge doesn't just answer questions -- it books qualified site visits and briefs our sales reps before the call.",
    name: "Marcus Lee",
    role: "VP Growth, Brightline Properties",
  },
];

const faqs = [
  {
    question: "What exactly does Avotonix's AI Voice Solution do?",
    answer:
      "Avotonix automates phone-based conversations for your business--handling greetings, appointment bookings, lead reactivation, and customer follow-ups using natural, human-like AI voices that align with your brand tone.",
  },
  {
    question: "Can the AI voice agent integrate with my existing tools and CRM?",
    answer:
      "Absolutely. Our system connects with popular CRMs, calendars, ticketing, and payment tools to ensure seamless data flow--so your team never has to manually update or follow up.",
  },
  {
    question: "How does the AI handle different industries or call types?",
    answer:
      "Each AI workflow is custom-built for your business. Whether you run a dental clinic, law firm, or hotel, we tailor the script, tone, and compliance requirements to your industry's needs.",
  },
  {
    question: "Is the AI voice capable of handling multiple languages and accents?",
    answer:
      "Yes. Avotonix supports multilingual and regional voice options, allowing your business to serve customers in their preferred language while maintaining a consistent brand voice.",
  },
  {
    question: "Is my customer data secure and compliant?",
    answer:
      "Data security is a top priority. All recordings, transcripts, and analytics are encrypted and stored in compliance with data protection laws such as HIPAA, GDPR, and CCPA where applicable.",
  },
];

type CursorPosition = {
  x: number;
  y: number;
};

type FloatingDecorProps = {
  cursor: CursorPosition;
  scroll: number;
};

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((nextTheme: Theme) => {
    const root = document.documentElement;
    root.dataset.theme = nextTheme;
    root.classList.toggle("dark", nextTheme === "dark");
    root.classList.toggle("light", nextTheme === "light");
    window.localStorage.setItem("avotonix-theme", nextTheme);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("avotonix-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "light" || stored === "dark" ? (stored as Theme) : prefersDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, [applyTheme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  const renderTheme = mounted ? theme : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/90 text-[#120a33] shadow-sm backdrop-blur-md transition hover:bg-white dark:bg-white/12 dark:hover:bg-white/18"
      aria-label={`Switch to ${renderTheme === "light" ? "dark" : "light"} mode`}
    >
      {renderTheme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.76 1.76M17.5 17.5l1.76 1.76M2 12h2.5M19.5 12H22M4.22 19.78l1.76-1.76M17.5 6.5l1.76-1.76" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#120a33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4.2a7.8 7.8 0 1 0 7.8 9.17 6.5 6.5 0 1 1-7.8-9.17Z" />
    </svg>
  );
}

function FloatingDecor({ cursor, scroll }: FloatingDecorProps) {
  const orbs = [
    {
      size: 360,
      left: 12,
      top: 18,
      color: "rgba(162, 120, 255, 0.75)",
      blur: 55,
      opacity: 0.84,
      magnet: 120,
      parallax: 160,
      delay: 0,
      duration: 18,
    },
    {
      size: 240,
      left: 78,
      top: 12,
      color: "rgba(92, 84, 255, 0.65)",
      blur: 40,
      opacity: 0.7,
      magnet: 80,
      parallax: 120,
      delay: 1.6,
      duration: 16,
    },
    {
      size: 420,
      left: 58,
      top: 68,
      color: "rgba(210, 185, 255, 0.55)",
      blur: 65,
      opacity: 0.6,
      magnet: 90,
      parallax: 200,
      delay: 0.9,
      duration: 22,
    },
    {
      size: 180,
      left: 5,
      top: 72,
      color: "rgba(140, 110, 255, 0.65)",
      blur: 35,
      opacity: 0.6,
      magnet: 110,
      parallax: 150,
      delay: 0.6,
      duration: 14,
    },
  ];

  const sparks = [
    {
      size: 90,
      left: "22%",
      top: "32%",
      delay: "0s",
    },
    {
      size: 75,
      left: "68%",
      top: "28%",
      delay: "1.4s",
    },
    {
      size: 110,
      left: "78%",
      top: "64%",
      delay: "2.2s",
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {orbs.map((orb, index) => {
        const translateX = (cursor.x - 0.5) * orb.magnet;
        const translateY = (cursor.y - 0.5) * (orb.magnet * 0.6) + (scroll - 0.5) * orb.parallax;

        return (
          <div
            key={`orb-${index}`}
            aria-hidden="true"
            className="floating-orb-wrapper"
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            }}
          >
            <div
              className="floating-orb"
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                opacity: orb.opacity,
                filter: `blur(${orb.blur}px)`,
                animationDelay: `${orb.delay}s`,
                animationDuration: `${orb.duration}s`,
                background: `radial-gradient(circle at 30% 30%, ${orb.color} 0%, rgba(124, 58, 237, 0) 70%)`,
                mixBlendMode: "screen",
              }}
            />
          </div>
        );
      })}

      {sparks.map((spark, index) => (
        <div
          key={`spark-${index}`}
          aria-hidden="true"
          className="floating-spark"
          style={{
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            left: spark.left,
            top: spark.top,
            animationDelay: spark.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const pointerFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const x = Math.min(Math.max(event.clientX / window.innerWidth, 0), 1);
      const y = Math.min(Math.max(event.clientY / window.innerHeight, 0), 1);

      if (pointerFrameRef.current) {
        cancelAnimationFrame(pointerFrameRef.current);
      }

      pointerFrameRef.current = window.requestAnimationFrame(() => {
        setCursor({ x, y });
      });
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        setScrollProgress(progress);
      });
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (pointerFrameRef.current) {
        cancelAnimationFrame(pointerFrameRef.current);
      }
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const heroTiltStyle: CSSProperties = {
    transform: `perspective(1400px) rotateX(${(cursor.y - 0.5) * -10}deg) rotateY(${(cursor.x - 0.5) * 12}deg) scale(1.01)`,
    transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  const metricsMotionStyle: CSSProperties = {
    transform: `translate3d(${(cursor.x - 0.5) * 16}px, ${(cursor.y - 0.5) * 12}px, 0)`,
    transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <FloatingDecor cursor={cursor} scroll={scrollProgress} />
      <header className="sticky top-6 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 rounded-full border border-[var(--border)] shell-panel px-5 py-3 shadow-md shadow-purple-500/5 backdrop-blur-lg transition">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/avotonix-logo.png"
              alt="Avotonix logo"
              width={40}
              height={40}
              className="h-10 w-10 drop-shadow-[0_12px_24px_rgba(82,53,222,0.55)]"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight text-foreground">Avotonix</span>
              <span className="text-xs text-muted">AI Voice Solutions Studio</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-muted transition hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="#contact" className="btn-primary hidden md:inline-flex">
              Book a voice strategy call
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative mt-16 px-4 sm:px-6">
          <div
            className="mx-auto max-w-6xl overflow-hidden rounded-[42px] border border-white/25 bg-[radial-gradient(130%_160%_at_50%_-20%,_rgba(143,84,255,0.95)_0%,_rgba(103,53,222,0.9)_45%,_rgba(82,67,227,0.82)_70%,_rgba(98,109,255,0.78)_100%)] px-6 py-16 text-white shadow-[0_58px_120px_-38px_rgba(87,55,197,0.95)] dark:border-[rgba(167,139,250,0.25)] dark:bg-[radial-gradient(130%_160%_at_50%_-20%,_rgba(114,60,255,0.95)_0%,_rgba(80,41,194,0.88)_42%,_rgba(61,63,214,0.82)_70%,_rgba(78,96,255,0.76)_100%)] sm:px-10 sm:py-20"
            style={heroTiltStyle}
          >
            <div className="absolute right-10 top-10 hidden h-24 w-24 rounded-full bg-white/15 blur-2xl md:block" />
            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-6">
                <span className="animate-hero inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Fully managed AI voice solutions
                </span>
                <h1 className="animate-hero animate-hero-delay-1 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Turn every interaction into a loyal client with AI voice solutions that never sleep.
                </h1>
                <p className="animate-hero animate-hero-delay-2 text-lg text-white/85 sm:text-xl">
                  Avotonix designs, trains, and runs AI voice solutions tailored to your brand. We engage, qualify, schedule, and reactivate -- so your team can focus on growing the business.
                </p>
                <div className="animate-hero animate-hero-delay-2 flex flex-col gap-4 sm:flex-row">
                  <Link href="#contact" className="btn-primary w-full sm:w-auto">
                    Book a voice strategy call
                  </Link>
                  <a
                    href="#features"
                    className="btn-secondary w-full border-white/60 bg-white/15 text-white hover:bg-white/25 sm:w-auto dark:border-white/40"
                  >
                    See how it works
                  </a>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm text-white/80 shadow-xl backdrop-blur-lg">
                  <p className="text-base font-semibold text-white">Live conversation snapshot</p>
                  <p className="mt-4 rounded-2xl bg-white/10 p-4 text-[15px] text-white/90">
                    &quot;Hi Sara, thanks for calling Midtown Clinics. I can get you on Dr. Chen&#39;s calendar this Thursday at 2 PM. Does
                    that work for you?&quot;
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
                    <span>Intent: new patient</span>
                    <span>Auto-confirmation sent</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm text-white/85" style={metricsMotionStyle}>
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-white/25 bg-white/10 px-3 py-4 backdrop-blur-md">
                      <p className="text-lg font-semibold sm:text-xl">{metric.value}</p>
                      <p className="mt-1 text-xs text-white/70">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">Why teams choose Avotonix</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Designed for real-world customer conversations
              </h2>
            </div>
            <Link href="#contact" className="btn-secondary self-start">
              Get a tailored walkthrough
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="surface-card h-full rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-45px_rgba(80,46,170,0.55)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/80 via-[#6d50f5]/80 to-[#4f8bfd]/80 text-white shadow-md shadow-purple-500/40">
                  <SparkleIcon />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{feature.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#8b5cf6]/10 text-[#6d50f5]">
                      &bull;
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="solutions" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="surface-card overflow-hidden rounded-[32px] p-10 shadow-xl transition-transform duration-700 hover:-translate-y-2 hover:shadow-[0_48px_90px_-50px_rgba(80,46,170,0.6)]">
            <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
              <div>
                <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Tailored by industry, built for conversion.</h2>
                <p className="mt-4 text-lg text-muted">
                  Avotonix brings the human touch to AI voice--blending smart scripts, perfect tone, and seamless workflows to turn every call into a conversion.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {industries.map((industry) => (
                    <div
                      key={industry}
                      className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/40 px-5 py-3 text-sm font-medium text-foreground"
                    >
                      {industry}
                      <span className="text-xs text-muted">Playbook ready</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="gradient-accent rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-foreground">Your AI voice agent handles:</h3>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-muted">
                  <li>Personalized greetings in your brand's tone.</li>
                  <li>Dynamic lead nurturing and qualification.</li>
                  <li>Effortless appointment booking and payment capture.</li>
                  <li>Smooth transfers with instant summaries.</li>
                  <li>Secure analytics and compliance-safe recordings.</li>
                </ul>
                <Link href="#process" className="btn-secondary mt-6 inline-flex">
                  Explore the delivery process
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="section-panel rounded-[32px] border border-[var(--border)] p-10 shadow-purple-500/10 backdrop-blur-md">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">From intake to live in days, not months.</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              We bring a dedicated conversational strategist and automation engineer. You bring the goals. Together, we launch a
              concierge that feels uniquely yours.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="surface-card rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_36px_70px_-48px_rgba(76,38,168,0.5)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8b5cf6]/15 text-sm font-semibold text-[#6d50f5]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Proven in the wild</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">Teams trust Avotonix to answer first.</h2>
            </div>
            <Link href="#contact" className="btn-primary self-start">
              Request customer stories
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="surface-card h-full rounded-[28px] p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_36px_70px_-48px_rgba(70,40,160,0.6)]"
              >
                <p className="text-lg leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                <figcaption className="mt-6 text-sm font-medium text-muted">
                  {testimonial.name} - {testimonial.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
            <div>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Frequently asked questions</h2>
              <p className="mt-4 text-lg text-muted">
                Still curious? We are happy to walk through demos, technical docs, and client references.
              </p>
              <Link href="#contact" className="btn-secondary mt-6 inline-flex">
                Chat with our team
              </Link>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="surface-card group overflow-hidden rounded-3xl border border-[var(--border)] p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-44px_rgba(74,42,158,0.55)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
                    {faq.question}
                    <span className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#8b5cf6]/15 text-[#6d50f5] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="gradient-cta overflow-hidden rounded-[32px] border border-[var(--border)] p-10 shadow-[0_28px_60px_-40px_rgba(98,49,204,0.6)] transition-transform duration-700 hover:-translate-y-2 hover:shadow-[0_58px_110px_-52px_rgba(80,42,172,0.6)]">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#8b5cf6]/10 px-4 py-1.5 text-sm font-medium text-[#6d50f5]">
                  We do the heavy lifting
                </span>
                <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
                  Ready to greet every lead with confidence?
                </h2>
                <p className="text-lg text-muted">
                  Book a strategy call to see how Avotonix builds, trains, and operates an AI voice agent that sounds like your best team member.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href="mailto:hello@avotonix.com" className="btn-primary w-full sm:w-auto">
                    hello@avotonix.com
                  </a>
                  <a href="tel:+12125551234" className="btn-secondary w-full sm:w-auto">
                    Call (212) 555-1234
                  </a>
                </div>
                <p className="text-sm text-muted">
                  Prefer a live walkthrough? We can connect via Zoom, Teams, or drop into your office phone line.
                </p>
              </div>
              <div className="surface-card rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_38px_80px_-52px_rgba(70,36,155,0.55)]">
                <h3 className="text-lg font-semibold text-foreground">What happens next?</h3>
                <ol className="mt-4 space-y-4 text-sm text-muted">
                  <li>
                    <span className="font-semibold text-foreground">1. Discovery call:</span> Outline goals, integrations, compliance needs.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">2. Prototype voice:</span> We ship a branded demo script within 72 hours.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">3. Launch plan:</span> Agree on rollout, KPIs, and human handoff options.
                  </li>
                </ol>
                <p className="mt-5 text-xs text-muted">
                  No obligation. We only proceed when we are confident we can increase booked appointments and response rates.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-24 w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="shell-panel rounded-3xl border border-[var(--border)] px-6 py-8 text-sm text-muted backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-foreground">Avotonix</p>
              <p className="text-sm text-muted">AI automation agency for human-grade voice experiences.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#features" className="transition hover:text-foreground">
                Features
              </a>
              <a href="#solutions" className="transition hover:text-foreground">
                Solutions
              </a>
              <a href="#process" className="transition hover:text-foreground">
                Process
              </a>
              <a href="#faq" className="transition hover:text-foreground">
                FAQ
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Avotonix. All rights reserved.</p>
            <p>Built with care in New York &amp; Dubai.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 3v3M12 18v3M5.22 5.22l2.12 2.12M16.66 16.66l2.12 2.12M3 12h3M18 12h3M5.22 18.78l2.12-2.12M16.66 7.34l2.12-2.12" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}


import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import sealedBackdrop from "@/assets/sealed-backdrop.jpg";
import heroBackdrop from "@/assets/hero-backdrop.jpg";
import waxSeal from "@/assets/wax-seal.png";
import paperTexture from "@/assets/paper-texture.jpg";
import { Corners, Divider, SectionHeading } from "@/components/ornaments";
import { ScratchDate } from "@/components/ScratchDate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Anaya — 14 February 2027" },
      { name: "description", content: "You are warmly invited to celebrate the wedding of Aarav & Anaya at The Grand Pavilion." },
      { property: "og:title", content: "Aarav & Anaya — Wedding Invitation" },
      { property: "og:description", content: "14 February 2027 · The Grand Pavilion. Open your invitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const WEDDING = new Date("2027-02-14T17:00:00+05:30");
const TZ = "Asia/Kolkata";

const EVENTS = [
  { name: "Mehendi", at: "2027-02-12T16:00:00+05:30", place: "The Garden Court", dress: "Ivory & sage" },
  { name: "Sangeet", at: "2027-02-13T19:30:00+05:30", place: "The Colonnade Hall", dress: "Black tie, festive" },
  { name: "The Vows", at: "2027-02-14T17:00:00+05:30", place: "The Grand Pavilion", dress: "Ivory & charcoal" },
  { name: "Reception", at: "2027-02-14T20:30:00+05:30", place: "The Stone Terrace", dress: "Evening formal" },
];

const fmtDay = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: TZ }).format(new Date(iso));
const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ }).format(new Date(iso)) + " IST";

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const paperStyle = { "--paper-img": `url(${paperTexture})` } as CSSProperties;

  const open = () => {
    if (opened) return;
    setOpened(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => setGone(true), reduce ? 50 : 1900);
  };

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
  }, [gone]);

  return (
    <div style={paperStyle} className="paper-ground min-h-screen">
      {!gone && (
        <div className={`fixed inset-0 z-50 overflow-hidden bg-foreground ${opened ? "opened" : ""}`}>
          {(["left", "right"] as const).map((side) => (
            <div
              key={side}
              className={`curtain-half curtain-${side} absolute inset-y-0 w-1/2 overflow-hidden ${side === "left" ? "left-0" : "right-0"}`}
            >
              <img
                src={sealedBackdrop}
                alt=""
                width={1536}
                height={1024}
                className={`absolute inset-y-0 h-full w-[200%] max-w-none object-cover ${side === "left" ? "left-0" : "right-0"}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              onClick={open}
              aria-label="Open the invitation"
              className="seal-btn relative w-36 drop-shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-44"
            >
              <img src={waxSeal} alt="" width={816} height={816} className="w-full" />
              <span className="gold-text absolute inset-0 flex items-center justify-center font-display text-3xl italic sm:text-4xl">
                A&nbsp;&amp;&nbsp;A
              </span>
            </button>
            <p className={`eyebrow mt-6 text-paper-light transition-opacity ${opened ? "opacity-0" : ""}`}>
              Tap the seal to open
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img
          src={heroBackdrop}
          alt="Stone colonnade with white florals in warm light"
          width={1536}
          height={1024}
          className={`absolute inset-0 h-full w-full object-cover ${opened ? "hero-zoom" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-transparent to-paper" />
        {opened && (
          <div className="relative z-10 px-6 py-24 text-center">
            <p className="eyebrow rise" style={{ animationDelay: "1.2s" }}>Together with their families</p>
            <h1 className="rise mt-6 font-display font-light leading-[0.9] text-foreground" style={{ animationDelay: "1.5s" }}>
              <span className="block text-6xl sm:text-8xl lg:text-9xl">Aarav</span>
              <span className="gold-text my-2 block text-4xl italic sm:text-6xl">&amp;</span>
              <span className="block text-6xl sm:text-8xl lg:text-9xl">Anaya</span>
            </h1>
            <p className="rise mt-6 font-display text-lg italic text-muted-foreground sm:text-xl" style={{ animationDelay: "1.8s" }}>
              request the pleasure of your company
            </p>
            <div className="rise mx-auto mt-10 w-64 sm:w-72" style={{ animationDelay: "2.1s" }}>
              <ScratchDate>
                <div className="card-frame px-6 py-6">
                  <p className="eyebrow">Sunday</p>
                  <p className="mt-2 font-display text-3xl text-foreground">14 · 02 · 2027</p>
                  <p className="eyebrow mt-2">The Grand Pavilion</p>
                </div>
              </ScratchDate>
            </div>
          </div>
        )}
      </section>

      <Countdown />

      {/* EVENTS */}
      <section className="px-5 py-24 sm:py-32">
        <SectionHeading eyebrow="The celebrations" title="Order of Days" />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <article key={e.name} className="card-frame px-8 py-14 text-center">
              <Corners />
              <p className="eyebrow">{fmtDay(e.at)}</p>
              <h3 className="mt-4 font-display text-4xl font-light text-foreground">{e.name}</h3>
              <Divider className="my-4 w-32" />
              <p className="font-display text-xl italic text-foreground">{fmtTime(e.at)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{e.place}</p>
              <p className="eyebrow mt-6 text-accent">Attire · {e.dress}</p>
            </article>
          ))}
        </div>
      </section>

      {/* VENUE */}
      <section className="bg-tint/60 px-5 py-24 sm:py-32">
        <SectionHeading eyebrow="Where" title="The Venue" />
        <div className="card-frame mx-auto max-w-2xl px-8 py-16 text-center">
          <Corners />
          <h3 className="font-display text-4xl font-light text-foreground sm:text-5xl">The Grand Pavilion</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Colonnade Road, Udaipur<br />Rajasthan, India
          </p>
          <a
            href="https://maps.google.com/?q=The+Grand+Pavilion"
            target="_blank"
            rel="noreferrer"
            className="eyebrow mt-10 inline-block border border-accent px-8 py-4 text-foreground transition-colors hover:bg-foreground hover:text-paper-light"
          >
            Open in maps
          </a>
        </div>
      </section>

      <Rsvp />

      <footer className="px-5 pb-16 pt-8 text-center">
        <Divider />
        <p className="mt-6 font-display text-3xl italic text-foreground">Aarav &amp; Anaya</p>
        <p className="eyebrow mt-3">14 · 02 · 2027</p>
      </footer>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
  const parts = [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor(diff / 36e5) % 24],
    ["Minutes", Math.floor(diff / 6e4) % 60],
    ["Seconds", Math.floor(diff / 1e3) % 60],
  ] as const;
  return (
    <section className="px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Counting down" title="Until We Wed" />
      <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2 sm:gap-6">
        {parts.map(([label, v]) => (
          <div key={label} className="card-frame px-1 py-6 text-center sm:py-10">
            <p className="font-display text-3xl font-light tabular-nums text-foreground sm:text-6xl">
              {now === null ? "—" : String(v).padStart(2, "0")}
            </p>
            <p className="eyebrow mt-2 !text-[0.55rem] !tracking-[0.25em] sm:!text-[0.68rem]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Rsvp() {
  const [sent, setSent] = useState(false);
  const field = "w-full border-0 border-b border-border bg-transparent px-1 py-3 font-display text-xl text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none";
  return (
    <section className="px-5 py-24 sm:py-32">
      <SectionHeading eyebrow="Kindly reply by 14 January 2027" title="RSVP" />
      <div className="card-frame mx-auto max-w-xl px-8 py-14 sm:px-14">
        <Corners />
        {sent ? (
          <div className="py-10 text-center">
            <p className="font-display text-4xl italic text-foreground">With gratitude</p>
            <Divider className="my-5" />
            <p className="text-sm text-muted-foreground">Your reply has been received.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-8">
            <label className="block"><span className="eyebrow">Your name</span>
              <input required className={field} placeholder="Full name" />
            </label>
            <label className="block"><span className="eyebrow">Guests</span>
              <select className={field} defaultValue="1">
                {[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <fieldset className="flex gap-6">
              {["Joyfully accepts", "Regretfully declines"].map((o, i) => (
                <label key={o} className="flex items-center gap-2 font-display text-lg italic text-foreground">
                  <input type="radio" name="reply" defaultChecked={i === 0} className="accent-accent" /> {o}
                </label>
              ))}
            </fieldset>
            <button className="eyebrow w-full bg-foreground py-5 !text-paper-light transition-colors hover:bg-accent">
              Send reply
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

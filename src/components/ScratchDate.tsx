import { useEffect, useRef, useState } from "react";

export function ScratchDate({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const css = getComputedStyle(document.documentElement);
    const foil = css.getPropertyValue("--scratch-foil").trim();
    const hi = css.getPropertyValue("--highlight").trim();
    const ink = css.getPropertyValue("--scratch-ink").trim();
    const r = c.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, foil); g.addColorStop(0.45, hi); g.addColorStop(0.6, foil); g.addColorStop(1, foil);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.18})`;
      ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1, 1);
    }
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.75;
    ctx.font = `500 10px Jost, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("S C R A T C H   T O   R E V E A L", r.width / 2, r.height / 2 + 4);
    ctx.globalAlpha = 1;

    let down = false;
    let moves = 0;
    const pos = (e: PointerEvent): [number, number] => { const b = c.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const scratch = (e: PointerEvent) => {
      if (!down) return;
      const [x, y] = pos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill();
      if (++moves % 12 === 0) {
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        let clear = 0;
        for (let i = 3; i < d.length; i += 64) if (d[i] === 0) clear++;
        if (clear / (d.length / 64) > 0.5) setDone(true);
      }
    };
    const on = (e: PointerEvent) => { down = true; c.setPointerCapture(e.pointerId); scratch(e); };
    const off = () => { down = false; };
    c.addEventListener("pointerdown", on);
    c.addEventListener("pointermove", scratch);
    c.addEventListener("pointerup", off);
    return () => { c.removeEventListener("pointerdown", on); c.removeEventListener("pointermove", scratch); c.removeEventListener("pointerup", off); };
  }, []);

  return (
    <div className="relative">
      {children}
      <canvas
        ref={ref}
        aria-label="Scratch to reveal the date"
        className={`absolute inset-0 h-full w-full touch-none cursor-pointer transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : ""}`}
      />
      {!done && (
        <button onClick={() => setDone(true)} className="sr-only">Reveal date</button>
      )}
    </div>
  );
}

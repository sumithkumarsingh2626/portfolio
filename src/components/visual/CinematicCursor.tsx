'use client';

import { useEffect, useRef } from 'react';

type Ripple = { x: number; y: number; r: number; a: number };
type Spark = { x: number; y: number; vx: number; vy: number; a: number; s: number };

export function CinematicCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const trailLen = 26;
    const trail = Array.from({ length: trailLen }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let hx = px;
    let hy = py;
    let vx = 0;
    let vy = 0;

    const ripples: Ripple[] = [];
    const sparks: Spark[] = [];

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    const onDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, a: 0.55 });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('resize', resize);

    let rafId = 0;
    let lastX = px;
    let lastY = py;

    const tick = () => {
      const dx = px - hx;
      const dy = py - hy;
      vx = vx * 0.72 + dx * 0.12;
      vy = vy * 0.72 + dy * 0.12;
      hx += vx;
      hy += vy;

      // Rope follow
      trail[0].x += (hx - trail[0].x) * 0.45;
      trail[0].y += (hy - trail[0].y) * 0.45;
      for (let i = 1; i < trail.length; i++) {
        const tx = trail[i - 1].x;
        const ty = trail[i - 1].y;
        trail[i].x += (tx - trail[i].x) * 0.38;
        trail[i].y += (ty - trail[i].y) * 0.38;
      }

      const speed = Math.hypot(px - lastX, py - lastY);
      lastX = px;
      lastY = py;

      if (speed > 18) {
        const count = Math.min(6, Math.floor(speed / 18));
        for (let i = 0; i < count; i++) {
          const ang = Math.random() * Math.PI * 2;
          const sp = 0.8 + Math.random() * 1.8;
          sparks.push({
            x: hx,
            y: hy,
            vx: Math.cos(ang) * sp,
            vy: Math.sin(ang) * sp,
            a: 0.18,
            s: 1 + Math.random() * 1.6,
          });
        }
      }

      // Clear
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw trail
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'lighter';

      const grad = ctx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length - 1].x, trail[trail.length - 1].y);
      grad.addColorStop(0, 'rgba(245,246,247,0.38)');
      grad.addColorStop(0.5, 'rgba(121,151,255,0.14)');
      grad.addColorStop(1, 'rgba(245,246,247,0.0)');

      ctx.strokeStyle = grad;
      ctx.shadowColor = 'rgba(121,151,255,0.18)';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) ctx.lineTo(trail[i].x, trail[i].y);
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.restore();

      // Draw head
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(245,246,247,0.25)';
      ctx.shadowColor = 'rgba(245,246,247,0.18)';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(hx, hy, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 3.4;
        r.a *= 0.92;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = `rgba(121,151,255,${r.a * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        if (r.a < 0.02) ripples.splice(i, 1);
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.92;
        s.vy *= 0.92;
        s.a *= 0.92;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(245,246,247,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (s.a < 0.02) sparks.splice(i, 1);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[60] pointer-events-none" />;
}

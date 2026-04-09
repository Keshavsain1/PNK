// src/hooks/useReveal.ts
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useReveal - stable visibility detection for animations.
 *
 * Options:
 *  - delay (ms): delay before showing after element intersects (default 0)
 *  - once (bool): unobserve after first reveal (default true)
 *  - threshold (number|number[]): intersection threshold (default 0.15)
 *  - rootMargin (string): observer rootMargin (default "0px")
 *  - stableMs (number): require intersection state to be stable for this many ms before toggle (default 180)
 *
 * This implementation:
 *  - debounces reveal/hide so short jitter won't flip visible
 *  - cleans up timers on unmount
 *  - respects prefers-reduced-motion (reveals immediately)
 */
export default function useReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit & { delay?: number; once?: boolean; stableMs?: number }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  // keep stable options in a ref
  const optsRef = useRef({
    delay: options?.delay ?? 0,
    once: options?.once ?? true,
    threshold: options?.threshold ?? 0.15,
    root: (options as any)?.root ?? null,
    rootMargin: options?.rootMargin ?? "0px",
    stableMs: (options as any)?.stableMs ?? 180,
  });

  useEffect(() => {
    optsRef.current = {
      delay: options?.delay ?? 0,
      once: options?.once ?? true,
      threshold: options?.threshold ?? 0.15,
      root: (options as any)?.root ?? null,
      rootMargin: options?.rootMargin ?? "0px",
      stableMs: (options as any)?.stableMs ?? 180,
    };
  }, [options]);

  // Track reduced motion
  const prefersReducedMotionRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
      if (e.matches) setVisible(true);
    };
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", handler as any);
    else if ((mq as any).addListener) (mq as any).addListener(handler);
    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", handler as any);
      else if ((mq as any).removeListener) (mq as any).removeListener(handler);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotionRef.current) {
      setVisible(true);
      return;
    }

    const { delay, once, threshold, root, rootMargin, stableMs } = optsRef.current as any;

    // Use thresholds array for more stable intersection reporting
    const thresholds = Array.isArray(threshold) ? threshold : [0, Math.max(0.01, threshold), 0.5, 0.95, 1];

    let observer: IntersectionObserver | null = null;
    const revealTimers = new Map<Element, number>();
    const hideTimers = new Map<Element, number>();

    const clearAll = () => {
      revealTimers.forEach((t) => clearTimeout(t));
      revealTimers.clear();
      hideTimers.forEach((t) => clearTimeout(t));
      hideTimers.clear();
    };

    const cb: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const ratio = entry.intersectionRatio;

        // Decide if we consider the element "intersecting enough"
        const hits = ratio >= (Array.isArray(threshold) ? Math.min(...threshold) : threshold);

        if (hits) {
          // cancel any pending hide timer (hysteresis)
          const h = hideTimers.get(target);
          if (h) {
            clearTimeout(h);
            hideTimers.delete(target);
          }

          // If already visible, nothing to do (prevents re-setting and reflow)
          if (visible) {
            if (once && observer) observer.unobserve(target);
            return;
          }

          // Schedule reveal after 'delay' but only if stable for 'stableMs'
          if (!revealTimers.has(target)) {
            const t = window.setTimeout(() => {
              // stable window passed -> set visible
              setVisible(true);
              revealTimers.delete(target);
              if (once && observer) observer.unobserve(target);
            }, Math.max(0, delay + stableMs));
            revealTimers.set(target, t as unknown as number);
          }
        } else {
          // Not enough intersection -> schedule hide only if not 'once'
          if (!once) {
            const r = revealTimers.get(target);
            if (r) {
              clearTimeout(r);
              revealTimers.delete(target);
            }
            if (!hideTimers.has(target)) {
              const t = window.setTimeout(() => {
                setVisible(false);
                hideTimers.delete(target);
              }, stableMs);
              hideTimers.set(target, t as unknown as number);
            }
          }
        }
      });
    };

    observer = new IntersectionObserver(cb, {
      threshold: thresholds,
      root: root as Element | null,
      rootMargin,
    });

    observer.observe(el);

    return () => {
      clearAll();
      if (observer) {
        try {
          observer.disconnect();
        } catch {}
        observer = null;
      }
    };
  }, [ref, visible]);

  const reset = useCallback(() => setVisible(false), []);
  return { ref, visible, reset };
}

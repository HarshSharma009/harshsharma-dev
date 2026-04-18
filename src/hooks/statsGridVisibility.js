/**
 * Layout-based visibility check (fallback when IntersectionObserver is late on WebKit).
 * @param {Element} el
 * @param {{ height?: number; width?: number; padY?: number; padX?: number }} [viewport]
 */
export function elementLikelyVisible(el, viewport = {}) {
  if (!el || typeof el.getBoundingClientRect !== "function") return false;
  const rect = el.getBoundingClientRect();
  const height = viewport.height ?? (typeof window !== "undefined" ? window.innerHeight : 0);
  const width = viewport.width ?? (typeof window !== "undefined" ? window.innerWidth : 0);
  const padY = viewport.padY ?? 220;
  const padX = viewport.padX ?? 100;
  return (
    rect.top < height + padY &&
    rect.bottom > -padY &&
    rect.left < width + padX &&
    rect.right > -padX
  );
}

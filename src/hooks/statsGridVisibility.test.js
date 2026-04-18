import { describe, it, expect } from "vitest";
import { elementLikelyVisible } from "./statsGridVisibility.js";

function mockEl(rect) {
  return {
    getBoundingClientRect: () => rect,
  };
}

describe("elementLikelyVisible", () => {
  it("returns true when rect overlaps expanded viewport", () => {
    const el = mockEl({ top: 100, bottom: 200, left: 10, right: 100 });
    expect(elementLikelyVisible(el, { height: 800, width: 400, padY: 200, padX: 80 })).toBe(true);
  });

  it("returns true for element just above fold with default padding", () => {
    const el = mockEl({ top: -100, bottom: 50, left: 0, right: 200 });
    expect(elementLikelyVisible(el, { height: 700, width: 390 })).toBe(true);
  });

  it("returns false when rect is far below viewport", () => {
    const el = mockEl({ top: 5000, bottom: 5100, left: 0, right: 100 });
    expect(elementLikelyVisible(el, { height: 700, width: 400, padY: 200, padX: 80 })).toBe(false);
  });

  it("returns false for null element", () => {
    expect(elementLikelyVisible(null)).toBe(false);
  });
});

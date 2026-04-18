import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CountUp from "./CountUp.jsx";

vi.mock("framer-motion", () => ({
  useInView: () => false,
  useReducedMotion: () => true,
}));

describe("CountUp", () => {
  it("shows final value when reduced motion is on and startWhen is true", async () => {
    render(<CountUp value={5} suffix="+" decimals={0} startWhen />);
    await waitFor(() => {
      expect(screen.getByText("5+")).toBeTruthy();
    });
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders with CTA variant", () => {
    render(<Button variant="cta">Belanja sekarang</Button>);
    const btn = screen.getByRole("button", { name: /belanja sekarang/i });
    expect(btn).toBeDefined();
    expect(btn.className).toContain("bg-sun-400");
    expect(btn.className).toContain("rounded-full");
  });

  it("renders with Primary variant", () => {
    render(<Button variant="primary">Masuk</Button>);
    const btn = screen.getByRole("button", { name: /masuk/i });
    expect(btn.className).toContain("bg-brand-500");
  });
});

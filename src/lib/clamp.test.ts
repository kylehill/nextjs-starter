import { describe, expect, it } from "vitest";
import { clamp } from "./clamp";

describe("clamp", () => {
  it("returns the value when it is inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("returns min when the value is below the range", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it("returns max when the value is above the range", () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });

  it("includes both bounds", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("works when min equals max", () => {
    expect(clamp(7, 3, 3)).toBe(3);
  });

  it("handles infinite bounds", () => {
    expect(clamp(1e9, 0, Infinity)).toBe(1e9);
    expect(clamp(-1e9, -Infinity, 0)).toBe(-1e9);
  });

  it("throws when min is greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  });

  it("throws on NaN", () => {
    expect(() => clamp(Number.NaN, 0, 10)).toThrow(RangeError);
  });
});

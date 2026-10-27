import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Counter } from "./Counter";

function setup(props: Parameters<typeof Counter>[0] = {}) {
  const user = userEvent.setup();
  render(<Counter {...props} />);
  return {
    user,
    value: () => screen.getByRole("status"),
    increment: screen.getByRole("button", { name: "Increment" }),
    decrement: screen.getByRole("button", { name: "Decrement" }),
  };
}

describe("Counter", () => {
  it("starts at 0 by default", () => {
    const { value } = setup();
    expect(value()).toHaveTextContent("0");
  });

  it("increments and decrements", async () => {
    const { user, value, increment, decrement } = setup();
    await user.click(increment);
    await user.click(increment);
    expect(value()).toHaveTextContent("2");
    await user.click(decrement);
    expect(value()).toHaveTextContent("1");
  });

  it("uses the step size", async () => {
    const { user, value, increment } = setup({ step: 5 });
    await user.click(increment);
    expect(value()).toHaveTextContent("5");
  });

  it("clamps the initial count into range", () => {
    const { value } = setup({ initialCount: 99, min: 0, max: 10 });
    expect(value()).toHaveTextContent("10");
  });

  it("never goes past max and disables the increment button there", async () => {
    const { user, value, increment } = setup({ initialCount: 9, max: 10, step: 3 });
    await user.click(increment);
    expect(value()).toHaveTextContent("10");
    expect(increment).toBeDisabled();
  });

  it("never goes below min and disables the decrement button there", async () => {
    const { user, value, decrement } = setup({ initialCount: 1, min: 0 });
    await user.click(decrement);
    expect(value()).toHaveTextContent("0");
    expect(decrement).toBeDisabled();
  });
});

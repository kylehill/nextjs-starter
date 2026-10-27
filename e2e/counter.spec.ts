import { expect, test } from "@playwright/test";

test.describe("counter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("increments and decrements", async ({ page }) => {
    const value = page.getByRole("status", { name: "Count" });
    const increment = page.getByRole("button", { name: "Increment" });
    const decrement = page.getByRole("button", { name: "Decrement" });

    await expect(value).toHaveText("0");
    await expect(decrement).toBeDisabled();

    await increment.click();
    await increment.click();
    await expect(value).toHaveText("2");

    await decrement.click();
    await expect(value).toHaveText("1");
  });

  test("stops at the maximum of 10", async ({ page }) => {
    const value = page.getByRole("status", { name: "Count" });
    const increment = page.getByRole("button", { name: "Increment" });

    for (let i = 0; i < 10; i++) {
      await increment.click();
    }
    await expect(value).toHaveText("10");
    await expect(increment).toBeDisabled();
  });
});

const { test, expect } = require("@playwright/test");

test("Main Page got accurate format", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Second Project");
  await expect(page.locator("h1")).toHaveText("Second Project");
  await expect(page.locator("h2")).toHaveText("Page Statistics!");
});

test("Can login successfully and redirect to topics", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("h1")).toHaveText("Topics");
});

test("Can register successfully and redirect to login form", async ({ page }) => {
  await page.goto("/auth/register");
  await page.locator("input[type=email]").type("user1@user.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("h1")).toHaveText("Login form");
});

test("Admin can create task successfully", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("h1")).toHaveText("Topics");
  const topicName = "topic 1";
  await page.locator("input[type=text]").type(topicName);
  await page.getByText("Add this topic").click();
  await expect(page.getByTitle("topicName")).toHaveText([
    "Finnish language",
    "topic 1",
  ]);
});
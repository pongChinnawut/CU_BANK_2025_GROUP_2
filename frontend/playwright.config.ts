import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  globalSetup: require.resolve("./global-setup"),
  globalTeardown: require.resolve("./global-teardown"),
  use: {
    baseURL: process.env.TEST_BASE_URL!,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // headless: false
  },
  projects: [
    {
      name: "setup", // runs this common file first
      testMatch: /.*\/common_.*\.spec\.ts$/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      fullyParallel: true,
      testIgnore: /.*\/common_\.spec\.ts$/, // skip this file setup in chromium
      dependencies: ["setup"],
    },
    // { name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'webkit', use: { browserName: 'webkit' } }, // Safari
  ],
  reporter: "html",
});

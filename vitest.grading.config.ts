import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["grader/**/*.grade.test.ts"],
  },
});

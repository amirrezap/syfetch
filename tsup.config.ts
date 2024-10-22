import { defineConfig } from "tsup";

export default defineConfig({
  target: 'es6',
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
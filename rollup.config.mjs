import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/app.ts", // Einstiegspunkt
  output: {
    file: "./dist/bundle.js", // Ausgabe-Datei
    format: "cjs", // Ausgabeformat, z.B. CommonJS
  },
  plugins: [typescript()],
};

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const path = require("path")
console.log(path.resolve(__dirname, "src/"))

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src/"),
      },
    ],
  },
  plugins: [vue()],
})

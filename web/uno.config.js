import { defineConfig } from "unocss";
import { presetWind } from "unocss";
import presetIcons from "@unocss/preset-icons";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
      collections: {
        sw: FileSystemIconLoader("./src/assets/icons"),
      },
    }),
  ],
});

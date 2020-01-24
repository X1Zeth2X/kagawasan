import store from "@/store";
const isDark = "settings/darkMode";

// Highlighter stuff.
import "prismjs";

if (store.getters[isDark]) {
  require("prismjs/themes/prism-tomorrow.css");
} else {
  require("prismjs/themes/prism-solarizedlight.css");
}

// Load languages
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";

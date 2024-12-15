// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

const lightTheme = {
  light: false,
  colors: {
    background: "#ffffff",
    surface: "#eff3f6",
    "primary-bg": "#ffffff",
    "secondary-bg": "#231f20",
    "primary-text": "#231f20",
    "secondary-text": "#ffffff",
    "primary-button-bg": "#231f20",
    "secondary-button-bg": "#ffffff",
    "border-color": "#231f20",
    "pantoneclo-gold": "#ffd48c",
    "pantoneclo-black": "#231f20",
    "pantoneclo-white": "#ffffff",
  },
};

const darkTheme = {
  dark: false,
  colors: {
    background: "#231f20",
    surface: "#ffffff",
    "primary-bg": "#231f20",
    "secondary-bg": "#ffffff",
    "primary-text": "#ffffff",
    "secondary-text": "#231f20",
    "primary-button-bg": "#ffffff",
    "secondary-button-bg": "#231f20",
    "border-color": "#ffffff",
    "pantoneclo-gold": "#ffd48c",
    "pantoneclo-black": "#231f20",
    "pantoneclo-white": "#ffffff",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "lightTheme",
      themes: {
        lightTheme,
        darkTheme,
      },
    },
    components: {},
  });
  app.vueApp.use(vuetify);
});

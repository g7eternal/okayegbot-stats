import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      strict: true,
      paths: {
        base: process.env.NODE_ENV === "production" ? "/okayegbot-stats" : "",
      },
      prerender: {
        handleHttpError: "warn",
      },
    }),
  },
};

export default config;

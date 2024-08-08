// @ts-check
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bbpmusiclib.wpenginepowered.com",
      },
      {
        protocol: "https",
        hostname: "d1hx41nm7bdfp5.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "flagicons.lipis.dev",
      },
    ],
  },
  i18n: {
    locales: ["en", "de", "fr", "sr", "es"],
    defaultLocale: "en",
  },
};

module.exports = withNextIntl(nextConfig);

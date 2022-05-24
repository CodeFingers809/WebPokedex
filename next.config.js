/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: { domains: ["raw.githubusercontent.com"],
  minimumCacheTTL:604800,
},
};

module.exports = nextConfig;

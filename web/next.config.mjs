/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // for Github Pages
  reactStrictMode: false,
  assetPrefix: process.env.BASE_PATH || "",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
  publicRuntimeConfig: {
    root: process.env.BASE_PATH || "",
  },
  optimizeFonts: false,
};

export default nextConfig;

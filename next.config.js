/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;

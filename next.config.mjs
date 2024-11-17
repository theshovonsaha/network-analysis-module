/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woffeot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;

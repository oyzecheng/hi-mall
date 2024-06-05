/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.oouzc.com',
        port: '',
        pathname: '/avatar/**'
      }
    ]
  }
};

export default nextConfig;

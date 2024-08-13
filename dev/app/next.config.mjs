/** @type {import('next').NextConfig} */
const nextConfig = {
         images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: '10.144.119.175',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: '10.144.122.201',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: '10.144.122.201',
            port: '3000',
            pathname: '**',
          },
          {
            protocol: 'http',
            hostname: '10.144.122.201',
            port: '8000',
            pathname: '**',
          },
        ]
      },
};

export default nextConfig;

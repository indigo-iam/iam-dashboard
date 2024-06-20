/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/me",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

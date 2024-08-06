/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/users/me",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

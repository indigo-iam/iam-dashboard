// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: ["iam.test.example"],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // this is evaluated at buildtime only
  images: {
    remotePatterns: [new URL("https://gravatar.com/avatar/*?r=g&d=identicon")],
  },
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

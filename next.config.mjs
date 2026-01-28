// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: ["iam.test.example"],
  basePath: process.env.IAM_DASHBOARD_BASE_PATH,
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

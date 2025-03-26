// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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

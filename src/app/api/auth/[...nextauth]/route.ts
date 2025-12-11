// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { NextRequest } from "next/server";
import { handlers } from "@/auth";
import { settings } from "@/config";

const { IAM_DASHBOARD_BASE_PATH } = settings;

// Workaround to make basePath work
// https://github.com/nextauthjs/next-auth/discussions/12160
function rewriteRequest(request: NextRequest) {
  let { protocol, host, pathname } = request.nextUrl;

  const headers = request.headers;
  // Host rewrite adopted from next-auth/packages/core/src/lib/utils/env.ts:createActionURL
  const detectedHost = headers.get("x-forwarded-host") ?? host;
  const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol;
  const _protocol = detectedProtocol.endsWith(":")
    ? detectedProtocol
    : detectedProtocol + ":";
  const url = new URL(
    `${_protocol}//${detectedHost}${IAM_DASHBOARD_BASE_PATH}${pathname}${request.nextUrl.search}`
  );
  return new NextRequest(url, request);
}

export async function GET(request: NextRequest) {
  return await handlers.GET(rewriteRequest(request));
}

export async function POST(request: NextRequest) {
  return await handlers.POST(rewriteRequest(request));
}

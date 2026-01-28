// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { auth } from "@/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";
import { settings } from "@/config";

const { IAM_DASHBOARD_BASE_URL, IAM_DASHBOARD_BASE_PATH } = settings;
const handlers = toNextJsHandler(auth);

// Workaround to support different basePath
// https://github.com/better-auth/better-auth/issues/4715#issuecomment-3439681277

function rewriteRequest(req: NextRequest) {
  const { search, pathname } = req.nextUrl;
  const url = new URL(
    `${IAM_DASHBOARD_BASE_URL}${IAM_DASHBOARD_BASE_PATH}${pathname}`
  );
  url.search = search;
  return new NextRequest(url, req);
}

export async function GET(req: NextRequest) {
  const modified = rewriteRequest(req);
  return handlers.GET(modified);
}

export async function POST(req: NextRequest) {
  const modified = rewriteRequest(req);
  return handlers.POST(modified);
}

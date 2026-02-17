// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { NextRequest, NextResponse } from "next/server";
import { settings } from "@/config";
import { getSession } from "@/auth";

const { IAM_DASHBOARD_BASE_PATH } = settings;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin).*)"],
};

export async function proxy(request: NextRequest) {
  if (await getSession()) {
    return NextResponse.next();
  }
  const url = new URL(`${IAM_DASHBOARD_BASE_PATH}/signin`, request.url);
  return NextResponse.redirect(url);
}

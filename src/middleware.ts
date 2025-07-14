// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { settings } from "@/config";

const basePath = settings.basePath ?? "";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin|signout).*)"],
};

export default auth(async req => {
  const { nextUrl, auth } = req;
  const cookiesStore = await cookies();
  if ((!auth || auth.expired) && nextUrl.pathname != `${basePath}/signin`) {
    const url = new URL(`${basePath}/signin`, nextUrl.origin);
    return NextResponse.redirect(url);
  }
  if (
    cookiesStore.get("admin-mode")?.value !== "enabled" &&
    nextUrl.pathname !== "/users/me"
  ) {
    const url = new URL(`${basePath}/users/me`, nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

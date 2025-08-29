// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { settings } from "@/config";

const { BASE_PATH } = settings;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin|signout).*)"],
};

export default auth(async req => {
  const { nextUrl, auth } = req;
  if ((!auth || auth.expired) && nextUrl.pathname != `${BASE_PATH}/signin`) {
    const url = new URL(`${BASE_PATH}/signin`, nextUrl.origin);
    return NextResponse.redirect(url);
  }
  const cookiesStore = await cookies();
  const adminMode = cookiesStore.get("admin-mode")?.value;
  if (
    adminMode !== "enabled" &&
    nextUrl.pathname !== "/users/me" &&
    !nextUrl.pathname.startsWith("/clients")
  ) {
    const url = new URL(`${BASE_PATH}/users/me`, nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher:
    "/((?!api/auth|signin|signout|_next/static|_next/image|favicon.ico|fonts).*)",
};

export default auth(req => {
  const session = req.auth;
  const sessionExpired = session && session.expires_at < Date.now();
  if (sessionExpired) {
    console.log("Session expired");
    const newUrl = new URL("/signout", req.nextUrl);
    // use 301 to convert POSTs to GETs. This avoid the server to fail the POST
    // following the redirect
    return NextResponse.redirect(newUrl, 301);
  }
  const sessionNotFound = !session && req.nextUrl.pathname !== "/signin";
  if (sessionNotFound) {
    console.log("Session not found");
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl, 301);
  }
});

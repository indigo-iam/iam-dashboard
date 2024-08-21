import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api/auth|_next/static|_next/image|favicon.ico|fonts).*)",
};

export default auth(req => {
  const session = req.auth;

  const sessionNotFound = !session && req.nextUrl.pathname !== "/signin";
  if (sessionNotFound) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  const expiration = new Date(session?.expires_at ?? 0);
  const now = new Date();
  const sessionExpired = expiration < now;

  if (
    sessionExpired &&
    req.nextUrl.pathname !== "/signout" &&
    req.nextUrl.pathname !== "/signin"
  ) {
    // This is an hack to make redirects on form submit post work.
    // Based on https://github.com/vercel/next.js/blob/0cf0d43a48e04820d081de59176cbd75dd4bf193/packages/next/src/client/components/router-reducer/reducers/server-action-reducer.ts#L82
    // Since it is not reported in the official documentation, consider to
    // revisit this logic in future.
    if (req.method === "POST") {
      const response = new NextResponse();
      response.headers.set("x-action-redirect", "/signout");
      return response;
    } else {
      const newUrl = new URL("/signout", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  return NextResponse.next();
});

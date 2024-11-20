import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth(req => {
  const { pathname } = req.nextUrl;
  if (!req.auth?.access_token && pathname !== "/signin") {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  if (req.auth?.expired && pathname !== "/signout") {
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

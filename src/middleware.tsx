import { auth } from "@/auth";
export const config = {
  matcher:
    "/((?!api/auth|signin|signout|_next/static|_next/image|favicon.ico|fonts).*)",
};

export default auth(req => {
  const session = req.auth;
  const sessionNotFound = !session && req.nextUrl.pathname !== "/signin";
  if (sessionNotFound) {
    console.log("Session not found");
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

import { signOut } from "@/auth";

export const GET = async (req: Request) => {
  console.log("Logout", req.credentials);
  const resp = await fetch(
    new URL("/logout", process.env.IAM_AUTHORITY_URL),
    {
      credentials: "include",
    }
  );
  console.log(resp.status);
  // await signOut();
  return Response.json({ "message": "ciao" });
};

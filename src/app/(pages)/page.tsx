import { fetchGroups } from "@/services/groups";
import { fetchMe } from "@/services/me";
import {
  CertificatesCard,
  GroupRequestsCard,
  GroupsCard,
  LinkedAccountsCard,
  UserCard,
} from "./components";
import { auth, signIn } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (session?.error === "RefreshAccessTokenError") {
    console.error("Failed to refresh token");
    await signIn();
  }
  
  const [me, groups] = await Promise.all([fetchMe(), fetchGroups()]);
  return (
    <div className="w-full p-8 grid grid-cols-2 gap-8">
      <UserCard me={me} />
      <LinkedAccountsCard />
      <GroupsCard me={me} groups={groups} />
      <GroupRequestsCard />
      <CertificatesCard />
    </div>
  );
}

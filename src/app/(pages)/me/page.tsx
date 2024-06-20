import { fetchGroups } from "@/services/groups";
import { fetchMe } from "@/services/me";
import {
  CertificatesCard,
  GroupRequestsCard,
  GroupsCard,
  LinkedAccountsCard,
  UserCard,
} from "./components";

export default async function Home() {
  const [me, groups] = await Promise.all([fetchMe(), fetchGroups()]);
  return (
    <div className="grid w-full grid-cols-1 gap-8 p-8 xl:grid-cols-2">
      <UserCard me={me} />
      <LinkedAccountsCard />
      <GroupsCard me={me} groups={groups} />
      <GroupRequestsCard />
      <CertificatesCard />
    </div>
  );
}

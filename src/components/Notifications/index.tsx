"use server";
import { fetchGroupsRequests } from "@/services/group-requests";
import BellButton from "./BellButton";
import { fetchRegistrationRequests } from "@/services/registration";

function Badge(props: { count: number }) {
  const { count } = props;
  if (count === 0) {
    return null;
  }
  return (
    <div className="absolute end-0 top-0 z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-danger p-2 text-xs text-secondary">
      {count}
    </div>
  );
}

export default async function Notifications() {
  const groupRequests = await fetchGroupsRequests();
  const registrationRequests = await fetchRegistrationRequests();
  const totalRequests =
    groupRequests.totalResults + registrationRequests.length;
  const title = totalRequests
    ? `There are ${totalRequests} pending request(s)`
    : "Notifications";
  return (
    <BellButton title={title}>
      <Badge count={totalRequests} />
    </BellButton>
  );
}

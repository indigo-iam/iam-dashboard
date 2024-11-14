"use server";
import { fetchGroupsRequests } from "@/services/group-requests";
import BellButton from "./BellButton";
import { fetchRegistrationRequests } from "@/services/registration";

type BadgeProps = {
  count: number;
};

function Badge(props: Readonly<BadgeProps>) {
  const { count } = props;
  if (count === 0) {
    return null;
  }
  return (
    <div className="absolute end-1 top-1 z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-danger p-2 text-xs text-secondary">
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

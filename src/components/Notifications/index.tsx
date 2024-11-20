"use server";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/solid";
import { auth } from "@/auth";

type BadgeProps = {
  count: number;
};

function Badge(props: Readonly<BadgeProps>) {
  const { count } = props;
  if (count === 0) {
    return null;
  }
  return (
    <div className="absolute end-0 top-0 z-10 inline-flex size-5 items-center justify-center rounded-full bg-danger p-2 text-xs text-secondary">
      {count}
    </div>
  );
}

export default async function Notifications() {
  const session = await auth();
  let totalRequests = 0;
  if (session?.is_admin) {
    const groupRequests = await fetchGroupsRequests();
    const registrationRequests = await fetchRegistrationRequests();
    totalRequests = groupRequests.totalResults + registrationRequests.length;
  }
  const title = totalRequests
    ? `There are ${totalRequests} pending request(s)`
    : "Notifications";
  return (
    <div className="relative m-auto rounded-full p-2 hover:bg-primary-hover">
      <Link title={title} href="/requests" className="my-auto">
        <BellIcon className="size-6 text-secondary" />
        <Badge count={totalRequests} />
      </Link>
    </div>
  );
}

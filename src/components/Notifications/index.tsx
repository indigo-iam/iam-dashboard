import { fetchGroupsRequests } from "@/services/group-requests";
import BellButton from "./BellButton";

export default function Notifications() {
  const group_request = fetchGroupsRequests();
  return <BellButton />;
}

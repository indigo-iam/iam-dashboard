import { fetchGroupsRequests } from "@/services/group-requests";
import { GroupRequestView } from "./GroupRequest";

export const GroupRequests = async () => {
  const groupRequests = await fetchGroupsRequests();
  if (!groupRequests || groupRequests.Resources.length === 0) {
    return "No requests found.";
  }

  return (
    <>
      {groupRequests.Resources.map(resource => {
        return <GroupRequestView key={resource.uuid} resource={resource} />;
      })}
    </>
  );
};

import { fetchGroupsRequests } from "@/services/group-requests";
import { Card } from "../Card";
import { GroupRequestView } from "./GroupRequest";

export const GroupRequests = async () => {
  const groupRequests = await fetchGroupsRequests();
  if (!groupRequests || groupRequests.Resources.length === 0) {
    return "No Request Found";
  }

  return (
    <div>
      {groupRequests.Resources.map(resource => {
        return (
          <GroupRequestView
            key={resource.uuid}
            resource={resource}
          />
        );
      })}
    </div>
  );
};


export const GroupRequestsCard = (): JSX.Element => {
  return (
    <Card title="Group Requests">
      <GroupRequests />
    </Card>
  );
};

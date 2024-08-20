import { fetchGroupsRequests } from "@/services/group-requests";
import InfoTable from "@/components/InfoTable";

export const GroupRequests = async () => {
  const result = await fetchGroupsRequests();

  if (!result || result.Resources.length === 0) {
    return "No requests found.";
  }

  const groupRequests = result.Resources;
  const data = groupRequests.map(gp => {
    return {
      id: gp.uuid,
      values: [
        { name: "Username", value: gp.username },
        { name: "Full Name", value: gp.userFullName },
        { name: "User ID", value: gp.userUuid },
        { name: "Group Name", value: gp.groupName },
        { name: "Group ID", value: gp.groupUuid },
      ],
    };
  });

  return (
    <>
      {data.map(d => {
        return (
          <div key={d.id}>
            <InfoTable data={d.values} />
            <hr className="last:hidden" />
          </div>
        );
      })}
    </>
  );
};

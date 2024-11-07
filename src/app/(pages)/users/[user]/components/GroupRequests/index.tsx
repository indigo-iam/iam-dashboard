import { fetchGroupsRequests } from "@/services/group-requests";
import InfoTable from "@/components/InfoTable";
import { User } from "@/models/scim";

type GroupRequestProps = {
  user: User;
};

export const GroupRequests = async (props: Readonly<GroupRequestProps>) => {
  const { user } = props;
  const result = await fetchGroupsRequests(user.userName);

  if (!result || result.Resources.length === 0) {
    return "No requests found.";
  }

  const groupRequests = result.Resources;
  const data = groupRequests.map(gp => {
    return {
      id: gp.uuid,
      values: [
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

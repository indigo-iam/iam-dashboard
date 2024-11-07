import { fetchGroupsRequests } from "@/services/group-requests";
import InfoTable from "@/components/InfoTable";
import { User } from "@/models/scim";
import DeleteGroupRequestButton from "./DeleteButton";

type GroupRequestProps = {
  user: User;
  isMe: boolean;
};

export const GroupRequests = async (props: Readonly<GroupRequestProps>) => {
  const { user, isMe } = props;
  const result = await fetchGroupsRequests(user.userName);

  if (!result || result.Resources.length === 0) {
    return "No requests found.";
  }

  const groupRequests = result.Resources;
  const data = groupRequests.map(gp => {
    return {
      id: gp.uuid,
      request: gp,
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
          <section key={d.id}>
            <div className="flex flex-row">
              <InfoTable className="grow" data={d.values} />
              <DeleteGroupRequestButton
                user={user}
                isMe={isMe}
                groupRequest={d.request}
              />
            </div>
            <hr className="mt-2 last:hidden" />
          </section>
        );
      })}
    </>
  );
};

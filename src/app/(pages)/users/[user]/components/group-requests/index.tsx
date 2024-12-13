import { fetchGroupsRequests } from "@/services/group-requests";
import InfoTable from "@/components/info-table";
import { User } from "@/models/scim";
import { Section } from "@/components/layout";
import GroupRequestOptions from "./options";

type GroupRequestProps = {
  user: User;
  isMe: boolean;
};

export default async function GroupRequests(
  props: Readonly<GroupRequestProps>
) {
  const { user, isMe } = props;
  const result = await fetchGroupsRequests(user.userName);

  if (!result || result.Resources.length === 0) {
    return null;
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
    <Section title="Group Requests">
      <table className="w-full table-auto">
        <tbody>
          {data.map(d => {
            return (
              <tr className="tbl-tr" key={d.id}>
                <td className="tbl-td">
                  <InfoTable data={d.values} />
                </td>
                <td className="tbl-td text-center">
                  <GroupRequestOptions
                    user={user}
                    isMe={isMe}
                    groupRequest={d.request}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
}

import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import Link from "@/components/Link";
import { ScimReference } from "@/models/scim";

type MembersProps = {
  group: Group;
  members: ScimReference[];
};
export default async function Members(props: Readonly<MembersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;

  if (members.length === 0) {
    return <p>This group has no members.</p>;
  }

  return (
    <table className="w-full table-auto">
      <tbody>
        {members.map(member => {
          return (
            <tr key={member.value}>
              <td className="tbl-td">
                <Link href={`/users/${member.value}`}>{member.display}</Link>
              </td>
              <td className="tbl-td text-center">
                {/* TODO: implement options */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

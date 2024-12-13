import Link from "@/components/link";
import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import ManagerOptions from "./options";

type MembersTableProps = {
  group: Group;
  managers: User[];
};

export default function ManagersTable(props: Readonly<MembersTableProps>) {
  const { group, managers } = props;

  if (managers.length === 0) {
    return <p>This group has no managers.</p>;
  }

  return (
    <table className="w-full table-auto">
      <tbody>
        {managers.map(m => {
          return (
            <tr className="tbl-tr" key={m.id}>
              <td className="tbl-td text-left">
                <Link href={`/users/${m.id}`}>{m.name?.formatted}</Link>
              </td>
              <td className="tbl-td text-center">
                <ManagerOptions manager={m} group={group} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

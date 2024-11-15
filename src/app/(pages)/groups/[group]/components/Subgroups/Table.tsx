import { Group } from "@/models/groups";
import { fetchSubgroupsPage } from "@/services/groups";
import Link from "@/components/Link";

type SubgroupsTableProps = {
  group: Group;
};

export default async function SubgroupsTable(
  props: Readonly<SubgroupsTableProps>
) {
  const { group } = props;
  // TODO: pagination
  const firstPage = await fetchSubgroupsPage(group.id);
  const subgroups = firstPage.Resources;

  if (subgroups.length === 0) {
    return <p>This group has no subgroups.</p>;
  }

  return (
    <table>
      <tbody>
        {subgroups.map(group => {
          return (
            <tr className="tbl-tr" key={group.value}>
              <td className="tbl-td text-left">
                <Link href={`/groups/${group.value}`}>{group.display}</Link>
              </td>
              <td className="tbl-td text-center">
                {/* <DeleteGroupButton group={group} /> */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

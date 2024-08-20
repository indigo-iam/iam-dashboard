import { Group } from "@/models/groups";
import { fetchSubgroupsPage } from "@/services/groups";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/Table";
import Link from "next/link";
import DeleteGroupButton from "../../../components/DeleteGroupButton";

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
    <Table>
      <TableHeader>
        <TableHeaderCell>Group</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {subgroups.map(group => {
          return (
            <TableRow key={group.value}>
              <TableCell>
                <Link
                  href={`/groups/${group.value}`}
                  className="text-primary-800 underline"
                >
                  {group.display}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <DeleteGroupButton group={group} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

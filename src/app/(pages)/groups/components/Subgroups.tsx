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

type SubgroupsProps = {
  group: Group;
};

export default async function Subgroups(props: Readonly<SubgroupsProps>) {
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
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {subgroups.map(group => {
          return (
            <TableRow key={group.value}>
              <TableCell>
                <Link
                  href={`/groups/${group.value}`}
                  className="text-primary-600 underline"
                >
                  {group.display}
                </Link>
              </TableCell>
              <TableCell>Unlink button here</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import { User } from "@/models/scim";
import { fetchAttributes } from "@/services/users";
import DeleteAttributeButton from "./DeleteButton";

type TableProps = {
  user: User;
};

export default async function AttributesTable(props: Readonly<TableProps>) {
  const { user } = props;
  const attributes = await fetchAttributes(user.id);

  if (!attributes || attributes.length === 0) {
    return <p>No Attributes found</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Value</TableHeaderCell>
        <TableHeaderCell className="w-1/12 text-center">
          Actions
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        {attributes.map(attr => {
          return (
            <TableRow key={attr.name}>
              <TableCell>{attr.name}</TableCell>
              <TableCell>{attr.value}</TableCell>
              <TableCell className="w-1/12 text-center">
                <DeleteAttributeButton user={user} attr={attr} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import { Scope } from "@/models/client";
import DeleteButton from "./DeleteButton";
import ScopeTypeSelect from "./ScopeTypeSelect";
import InputDescription from "./InputDescription";

type RowProps = {
  scope: Scope;
};

function Row(props: Readonly<RowProps>) {
  const { scope } = props;
  return (
    <TableRow>
      <TableCell className="max-w-24 truncate font-medium">
        {scope.value}
      </TableCell>
      <TableCell className="max-w-8">
        <ScopeTypeSelect key={scope.id} scope={scope} />
      </TableCell>
      <TableCell className="grow">
        <InputDescription key={scope.id} scope={scope} />
      </TableCell>
      <TableCell className="w-4 text-center">
        <DeleteButton scope={scope} />
      </TableCell>
    </TableRow>
  );
}

type ScopesTableProps = {
  scopes: Scope[];
};

export default function ScopesTable(props: Readonly<ScopesTableProps>) {
  const { scopes } = props;
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell className="text-left">Scope</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        <TableHeaderCell className="text-left">Description</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {scopes.map(scope => (
          <Row key={scope.id} scope={scope} />
        ))}
      </TableBody>
    </Table>
  );
}

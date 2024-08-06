type TableHeaderProps = {
  children: React.ReactNode;
};

export function TableHeader(props: Readonly<TableHeaderProps>) {
  const { children } = props;
  return (
    <thead className="border-b bg-transparent">
      <tr>{children}</tr>
    </thead>
  );
}

type TableHeaderCellProps = {
  children?: React.ReactNode;
};
export function TableHeaderCell(props: Readonly<TableHeaderCellProps>) {
  const { children } = props;
  return <th>{children}</th>;
}

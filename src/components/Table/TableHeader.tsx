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
  className?: string;
  children?: React.ReactNode;
};
export function TableHeaderCell(props: Readonly<TableHeaderCellProps>) {
  const { className, children } = props;
  return (
    <th className={`${className ? className : "text-left"} p-2`}>{children}</th>
  );
}

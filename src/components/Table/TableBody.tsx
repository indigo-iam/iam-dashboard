type TableBodyProps = {
  children: React.ReactNode;
};
export function TableBody(props: Readonly<TableBodyProps>) {
  const { children } = props;
  return <tbody className="before:block before:leading-4">{children}</tbody>;
}

type TableRowProps = {
  children: React.ReactNode;
};
export function TableRow(props: Readonly<TableRowProps>) {
  const { children } = props;
  return (
    <tr className="odd:bg-secondary-100 hover:bg-secondary-200">{children}</tr>
  );
}

type TableCellProps = {
  children?: React.ReactNode;
  className?: string;
};
export function TableCell(props: Readonly<TableCellProps>) {
  const { children, className } = props;
  return <td className={`p-2 ${className}`}>{children}</td>;
}

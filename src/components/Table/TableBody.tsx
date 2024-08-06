type TableBodyProps = {
  children: React.ReactNode;
};
export function TableBody(props: Readonly<TableBodyProps>) {
  const { children } = props;
  return <tbody>{children}</tbody>;
}

type TableRowProps = {
  children: React.ReactNode;
};
export function TableRow(props: Readonly<TableRowProps>) {
  const { children } = props;
  return <tr>{children}</tr>;
}

type TableCellProps = {
  children?: React.ReactNode;
};
export function TableCell(props: Readonly<TableCellProps>) {
  const { children } = props;
  return <td>{children}</td>;
}

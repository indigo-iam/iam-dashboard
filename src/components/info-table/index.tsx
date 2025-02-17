type RowProps = {
  name: string;
  value?: string | React.ReactNode;
};
function Row(props: Readonly<RowProps>) {
  const { name, value } = props;
  return (
    <tr>
      <td className="text-nowrap px-2 py-0.5">
        <b>{name}</b>
      </td>
      <td className="break-all">{value}</td>
    </tr>
  );
}

export type InfoTableData = { name: string; value?: string | React.ReactNode };

export type InfoTableProps = {
  data: InfoTableData[];
  className?: string;
};

export default function InfoTable(props: Readonly<InfoTableProps>) {
  const { data, className } = props;
  return (
    <div className={className}>
      <table className="table-auto">
        <tbody>
          {data.map(el => (
            <Row {...el} key={el.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

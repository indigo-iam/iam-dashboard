type RowProps = {
  name: string;
  value?: string | React.ReactNode;
};
function Row(props: Readonly<RowProps>) {
  const { name, value } = props;
  return (
    <tr className="!bg-secondary text-sm">
      <td className="px-2 py-0.5">
        <b>{name}</b>
      </td>
      <td>{value}</td>
    </tr>
  );
}

type InfoTableProps = {
  data: { name: string; value?: string | React.ReactNode }[];
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

type RowProps = {
  name: string;
  value: string;
};
function Row(props: Readonly<RowProps>) {
  const { name, value } = props;
  return (
    <tr className="!bg-secondary text-sm">
      <td className="min-w-36 p-1">
        <b>{name}</b>
      </td>
      <td>{value}</td>
    </tr>
  );
}

type InfoTableProps = {
  data: { name: string; value: string }[];
};

export default function InfoTable(props: Readonly<InfoTableProps>) {
  const { data } = props;
  return (
    <table className="table-auto">
      <tbody>
        {data.map(el => (
          <Row {...el} key={el.name} />
        ))}
      </tbody>
    </table>
  );
}

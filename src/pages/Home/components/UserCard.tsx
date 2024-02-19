import { IamUser } from "../../../services/IAM";
import { useIam } from "../../../services/IAM";

export const UserCard = (): JSX.Element => {
  const iam = useIam();

  if (!iam.user) {
    return <></>;
  }
  const User = (props: { user: IamUser }) => {
    const { user } = props;
    const data = [
      {
        key: "Email",
        value: user.emails[0].value,
      },
      {
        key: "Status",
        value: user.active ? "active" : "disabled",
      },
      {
        key: "Created",
        value: user.meta.created,
      },
      {
        key: "Last Modified",
        value: user.meta.lastModified,
      },
    ];

    const Row = (props: { title: string; value: string | undefined }) => {
      return (
        <tr>
          <td>
            <b>{props.title}</b>
          </td>
          <td>{props.value}</td>
        </tr>
      );
    };

    return (
      <table className="w-100">
        <tbody>
          {data.map(row => (
            <Row key={row.key} title={row.key} value={row.value} />
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div className="infn-card h-100">
      <div className="infn-title text-center mb-4">
        {iam.user.name.formatted}
      </div>
      <User user={iam.user} />
    </div>
  );
};

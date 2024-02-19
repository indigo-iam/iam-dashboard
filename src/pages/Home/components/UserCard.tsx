import { Button } from "../../../components";
import { IamUser } from "../../../services/IAM";
import { useIam } from "../../../services/IAM";
import { PencilIcon, KeyIcon } from "@heroicons/react/16/solid";

export const UserCard = (): JSX.Element => {
  const iam = useIam();

  if (!iam.user) {
    return <></>;
  }
  const User = (props: { user: IamUser }) => {
    const { user } = props;
    const data = [
      ["User Id", user.id],
      ["Email", user.emails[0].value],
      ["Status", user.active ? "active" : "disabled"],
      ["Created", user.meta.created ?? "N/A"],
      ["Last Modified", user.meta.lastModified ?? "N/A"],
    ];

    const Row = (props: { data: string[] }) => {
      return (
        <tr>
          <td>
            <b>{props.data[0]}</b>
          </td>
          <td>{props.data[1]}</td>
        </tr>
      );
    };

    return (
      <div>
        <table className="w-100">
          <tbody>
            {data.map(row => (
              <Row key={row[0]} data={row} />
            ))}
          </tbody>
        </table>
        <div className="container justify-content-center mt-4">
          <div className="row align-items-center">
            <div className="col">
              <Button className="mx-auto" icon={<PencilIcon />}>
                Edit Details
              </Button>
            </div>
            <div className="col">
              <Button className="mx-auto" icon={<KeyIcon />} color="success">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
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

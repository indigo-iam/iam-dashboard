import { IamUser } from "../../../services/IAM";
import { useIam } from "../../../services/IAM";

export const UserCard = (): JSX.Element => {
  const iam = useIam();

  if (!iam.user) {
    return <></>;
  }
  const User = (props: { user: IamUser }) => {
    const { user } = props;
    return (
      <ul>
        <li>
          <b>Email</b> {user.emails[0].value}
        </li>
        <li>
          <b>Status</b> {user.active ? "active" : "disabled"}
        </li>
        <li>
          <b>Created</b> {user.meta.created}
        </li>
        <li>
          <b>Last Modified</b> {user.meta.lastModified}
        </li>
      </ul>
    );
  };
  return (
    <div className="infn-card h-100">
      <div className="infn-title">{iam.user.name.formatted}</div>
      <User user={iam.user} />
    </div>
  );
};

import { useIam } from "../../../services/IAM";

export const GroupsCard = (): JSX.Element => {
  const iam = useIam();
  const Groups = () => {
    if (!iam.user) {
      return null;
    }
    const { groups } = iam.user;
    return (
      <div>
        <p>{groups ? groups : "No groups found"}</p>
      </div>
    );
  };
  return (
    <div className="infn-card">
      <div className="infn-title">Groups</div>
      <Groups />
    </div>
  );
};

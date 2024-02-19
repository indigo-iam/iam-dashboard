import { Button } from "../../../components";
import { useIam } from "../../../services/IAM";
import { UserPlusIcon } from "@heroicons/react/16/solid";

export const GroupsCard = (): JSX.Element => {
  const iam = useIam();
  const Groups = () => {
    if (!iam.user) {
      return null;
    }
    const { groups } = iam.user;
    if (!groups) {
      return <p>No groups found</p>;
    }

    const Row = (props: { title: string }) => {
      return (
        <tr>
          <td>
            <b>{props.title}</b>
          </td>
          <td className="d-flex flex-row-reverse">
            <Button color="danger" style={{ height: "32px" }}>
              Delete
            </Button>
          </td>
        </tr>
      );
    };

    return (
      <div>
        <table>
          <tbody>
            {groups.map(group => {
              return <Row key={group.display} title={group.display} />;
            })}
          </tbody>
        </table>
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <Button icon={<UserPlusIcon />} color="success">
                Add Group
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="infn-card">
      <div className="infn-title text-center mb-2">Groups</div>
      <Groups />
    </div>
  );
};

import { useIam, IamGroupRequestResource } from "@services/IAM";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "@components";
import { Card } from "../Card";

export const GroupRequestsCard = (): JSX.Element => {
  const { groupRequests } = useIam();

  const GroupRequests = () => {
    if (!groupRequests) {
      return "No requests found";
    }

    const GroupRequest = (props: { resource: IamGroupRequestResource }) => {
      const { resource } = props;
      const { userFullName, username, uuid, groupName, groupUuid } = resource;

      const Row = (props: { title: string; value: string }) => {
        const { title, value } = props;
        return (
          <div className="row">
            <div className="col-2">
              <b>{title}</b>
            </div>
            <div className="col">{value}</div>
          </div>
        );
      };

      return (
        <div className="container border-bottom p-2 mt-2">
          <div className="row">
            <div className="col">
              <Row title="Username" value={userFullName ?? username} />
              <Row title="User ID" value={uuid} />
              <Row title="Group" value={groupName} />
              <Row title="Group ID" value={groupUuid} />
            </div>
            <div className="col-auto d-flex flex-row-reverse">
              <Button
                color="danger"
                className="my-auto"
                icon={<XCircleIcon />}
                small={true}
              >
                Unlink
              </Button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        {groupRequests.Resources.map((resource, i) => {
          return (
            <GroupRequest key={`group-request-${i}`} resource={resource} />
          );
        })}
      </div>
    );
  };
  return (
    <Card title="Group Requests">
      <GroupRequests />
    </Card>
  );
};

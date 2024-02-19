import { XCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "../../../components";
import { useIam } from "../../../services/IAM";
import { IamGroupRequestResource } from "../../../services/IAM/models/GroupRequest";
import { Card } from "./Card";

export const GroupRequestsCard = (): JSX.Element => {
  const { groupRequests } = useIam();

  const GroupRequests = () => {
    if (!groupRequests) {
      return "No requests found";
    }

    const GroupRequest = (props: { resource: IamGroupRequestResource }) => {
      const { resource } = props;
      const { userFullName, username, uuid, groupName, groupUuid } = resource;
      return (
        <div className="container border-bottom p-2 mt-2">
          <div className="row">
            <div className="col col-md-auto">
              <b>Username</b> {userFullName ?? username} <br />
              <b>User Id</b> {uuid} <br />
              <b>Group</b> {groupName} <br />
              <b>Group Id</b> {groupUuid}
            </div>
            <div className="col d-flex flex-row-reverse">
              <Button
                color="danger"
                className="my-auto"
                icon={<XCircleIcon />}
                style={{ height: "32px" }}
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

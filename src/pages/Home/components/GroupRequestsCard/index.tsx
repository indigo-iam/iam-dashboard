import { useIam, IamGroupRequestResource } from "@services/IAM";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "@components";
import { Card } from "../Card";
import { IamGroupRequests } from "src/services/IAM/models/GroupRequest";

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

const GroupRequest = (props: { resource: IamGroupRequestResource }) => {
  const { resource } = props;
  const { userFullName, username, uuid, groupName, groupUuid } = resource;

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

const GroupRequests = (props: { groupRequests: IamGroupRequests }) => {
  const { groupRequests } = props;
  return (
    <div>
      {groupRequests.Resources.map(resource => {
        return <GroupRequest key={resource.uuid} resource={resource} />;
      })}
    </div>
  );
};

export const GroupRequestsCard = (): JSX.Element => {
  const { groupRequests } = useIam();
  if (!groupRequests) {
    return <Card title="Group Requests">No Request Found</Card>;
  }

  return (
    <Card title="Group Requests">
      <GroupRequests groupRequests={groupRequests} />
    </Card>
  );
};

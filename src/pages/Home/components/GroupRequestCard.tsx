import { Card } from "./Card";

export const GroupRequestsCard = (): JSX.Element => {
  const RequestsCard = () => {
    return "No requests found";
  };
  return (
    <Card title="Group Requests">
      <RequestsCard />
    </Card>
  );
};

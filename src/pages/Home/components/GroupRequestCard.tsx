export const GroupRequestsCard = (): JSX.Element => {
  const RequestsCard = () => {
    return "No requests found";
  };
  return (
    <div className="infn-card">
      <div className="infn-title">Group Requests</div>
      <RequestsCard />
    </div>
  );
};

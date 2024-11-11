import { TabPanel } from "@/components/Tabs";
import { GroupRequest } from "@/models/group-requests";
import { Request } from "./Request";

type groupRequestProps = {
  requests: GroupRequest[];
};

export default function GroupRequests(props: Readonly<groupRequestProps>) {
  const { requests } = props;
  return (
    <TabPanel className="flex flex-col gap-4 divide-y">
      {requests.length > 0
        ? requests.map(r => <Request key={r.uuid} request={r} />)
        : "There are no pending requests."}
    </TabPanel>
  );
}

import { TabPanel } from "@/components/Tabs";
import { GroupRequest } from "@/models/group-requests";
import { Request } from "./Request";

type groupRequestProps = {
  requests: GroupRequest[];
};

export default function GroupRequests(props: Readonly<groupRequestProps>) {
  const { requests } = props;
  return (
    <TabPanel className="flex flex-col gap-4">
      {requests.length > 0
        ? requests.map(r => (
            <>
              <Request request={r} />
              <hr className="last:hidden" />
            </>
          ))
        : "There are no pending requests."}
    </TabPanel>
  );
}

import { TabPanel } from "@/components/Tabs";
import { Registration } from "@/models/registration";
import { Request } from "./Request";

type RegistrationRequestsProps = {
  requests: Registration[];
};

export default function RegistrationRequests(
  props: Readonly<RegistrationRequestsProps>
) {
  const { requests } = props;
  return (
    <TabPanel className="flex flex-col gap-4">
      {requests.length > 0
        ? requests.map(r => (
            <>
              <Request key={r.uuid} request={r} />
              <hr className="last:hidden" />
            </>
          ))
        : "There are no pending requests."}
    </TabPanel>
  );
}

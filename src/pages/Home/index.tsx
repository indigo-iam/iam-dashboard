import { Page } from "../../components";
import { CertificatesCard } from "./components/CertificatesCard";
import { GroupRequestsCard } from "./components/GroupRequestCard";
import { GroupsCard } from "./components/GroupsCard";
import { LinkedAccountsCard } from "./components/LinkedAccountsCard";
import { UserCard } from "./components/UserCard";

export const Home = () => {
  return (
    <Page id="home">
      <div className="w-100 container">
        <div className="row p-4">
          <div className="col mt-0">
            <UserCard />
          </div>
          <div className="col">
            <div className="row p-2">
              <GroupsCard />
            </div>
            <div className="row p-2">
              <GroupRequestsCard />
            </div>
          </div>
        </div>
        <div className="row p-4">
          <div className="col">
            <LinkedAccountsCard />
          </div>
          <div className="col">
            <CertificatesCard />
          </div>
        </div>
      </div>
    </Page>
  );
};

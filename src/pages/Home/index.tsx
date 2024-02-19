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
        <div className="row">
          <div className="col p-4">
            <div className="row mb-4">
              <UserCard />
            </div>
            <div className="row">
              <LinkedAccountsCard />
            </div>
          </div>
          <div className="col p-4">
            <div className="row mb-4">
              <GroupsCard />
            </div>
            <div className="row mb-4">
              <GroupRequestsCard />
            </div>
            <div className="row mb-4">
              <CertificatesCard />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

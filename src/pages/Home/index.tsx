import { Page } from "@components";
import {
  CertificatesCard,
  GroupRequestsCard,
  GroupsCard,
  LinkedAccountsCard,
  UserCard,
} from "./components";

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

import Page from "@/components/Page";
import { fetchUser } from "@/services/users";
import Panel from "@/components/Panel";
import UserInfo from "./components/Info";
import { Certificates } from "./components/Certificates";
import { GroupRequests } from "./components/GroupRequests";
import { Groups } from "./components/Groups";
import { LinkedAccounts } from "./components/LinkedAccounts";
import { fetchMe } from "@/services/me";
import Section from "@/components/Section";
import SSHKeys from "./components/SSHKeys";

type UserPageProps = {
  params: { user: string };
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const { params } = props;
  const userID = params.user;
  const user = userID === "me" ? await fetchMe() : await fetchUser(userID);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <Page title={user.name?.formatted}>
      <Panel>
        <Section title="General">
          <UserInfo user={user} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Groups">
          <Groups user={user} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Group Requests">
          <GroupRequests />
        </Section>
      </Panel>
      <Panel>
        <Section title="Linked Accounts">
          <LinkedAccounts user={user} />
        </Section>
      </Panel>
      <Panel>
        <Section title="X509 Certificates">
          <Certificates user={user} />
        </Section>
      </Panel>
      <Panel>
        <Section title="SSH Keys">
          <SSHKeys user={user} />
        </Section>
      </Panel>
      <Panel>
        <Section title="Attributes">
          <p>To be implemented</p>
        </Section>
      </Panel>
    </Page>
  );
}

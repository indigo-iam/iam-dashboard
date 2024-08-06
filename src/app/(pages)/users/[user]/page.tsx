import Page from "@/components/Page";
import { fetchUser } from "@/services/users";
import Panel from "@/components/Panel";
import UserInfo from "@/components/User/Info";
import { GroupRequests, Groups, LinkedAccounts } from "@/components/User";
import { Certificates } from "@/components/User/Certificates";
import { fetchMe } from "@/services/me";
import Section from "@/components/Section";

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
          <p>To be implemented</p>
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

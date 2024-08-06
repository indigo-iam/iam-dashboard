import Page from "@/components/Page";
import { fetchUser } from "@/services/users";
import Panel from "@/components/Panel";
import UserInfo from "@/components/User/Info";
import Section from "@/components/Section";
import { GroupRequests, Groups, LinkedAccounts } from "@/components/User";
import { Certificates } from "@/components/User/Certificates";

type UserPageProps = {
  params: { user: string };
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const { params } = props;
  const userId = params.user;
  const user = await fetchUser(userId);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <Page title={user.name?.formatted}>
      <Panel>
        <Section title="General">
          <UserInfo user={user} />
        </Section>
        <Section title="Groups">
          <Groups user={user} />
        </Section>
        <Section title="Group Requests">
          <GroupRequests />
        </Section>
        <Section title="Linked Accounts">
          <LinkedAccounts user={user} />
        </Section>
        <Section title="X509 Certificates">
          <Certificates user={user} />
        </Section>
      </Panel>
    </Page>
  );
}

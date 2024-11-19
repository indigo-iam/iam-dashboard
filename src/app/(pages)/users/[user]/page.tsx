import { auth } from "@/auth";
import { Page, Panel, Section } from "@/components/Layout";
import { fetchMe } from "@/services/me";
import { fetchUser } from "@/services/users";
import UserInfo from "./components/Info";
import { Certificates } from "./components/Certificates";
import { GroupRequests } from "./components/GroupRequests";
import { Groups } from "./components/Groups";
import { LinkedAccounts } from "./components/LinkedAccounts";
import SSHKeys from "./components/SSHKeys";
import Attributes from "./components/Attributes";

type UserPageProps = {
  params: { user: string };
};

export default async function UserPage(props: Readonly<UserPageProps>) {
  const { params } = props;
  const userId = params.user;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;
  const isMe = userId === "me";
  const user = isMe ? await fetchMe() : await fetchUser(userId);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <Page title={user.name?.formatted}>
      <Panel>
        <Section title="General">
          <UserInfo user={user} isMe={isMe} />
        </Section>
        <Section title="Groups">
          <Groups user={user} isAdmin={isAdmin} />
        </Section>
        <Section title="Group Requests">
          <GroupRequests user={user} isMe={isMe} />
        </Section>
        <Section title="Linked Accounts">
          <LinkedAccounts user={user} />
        </Section>
        <Section title="X509 Certificates">
          <Certificates user={user} />
        </Section>
        <Section title="SSH Keys">
          <SSHKeys user={user} />
        </Section>
        <Section title="Attributes">
          <Attributes user={user} />
        </Section>
      </Panel>
    </Page>
  );
}

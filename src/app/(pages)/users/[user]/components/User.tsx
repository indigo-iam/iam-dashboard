import { ScimUser } from "@/models/scim";
import UserInfo from "./UserInfo";

type UserProps = {
  user: ScimUser;
};

export default function User(props: Readonly<UserProps>) {
  const { user } = props;
  return (
    <>
      <UserInfo user={user} />
    </>
  );
}

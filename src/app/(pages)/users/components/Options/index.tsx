import Options from "@/components/Options";
import { User } from "@/models/scim";
import DeleteUser from "./DeleteUser";

type UserOptions = {
  user: User;
};

export default function UserOptions(props: Readonly<UserOptions>) {
  const { user } = props;
  return (
    <Options>
      <DeleteUser user={user} />
    </Options>
  );
}

import Options from "@/components/Options";
import { User } from "@/models/scim";
import DeleteUser from "./DeleteUser";
import ToggleUserStatus from "./ToggleUserStatus";

type UserOptions = {
  user: User;
};

export default function UserOptions(props: Readonly<UserOptions>) {
  const { user } = props;
  return (
    <Options>
      <ToggleUserStatus user={user} />
      <DeleteUser user={user} />
    </Options>
  );
}

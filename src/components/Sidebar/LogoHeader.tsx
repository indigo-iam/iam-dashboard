import { UserCircleIcon } from "@heroicons/react/24/solid";
import { DrawerButtons } from "../Drawer/Buttons";
import { fetchMe } from "@/services/me";

const UserLogo = (props: { username: string }) => {
  const { username } = props;
  return (
    <div className="flex justify-center px-2">
      <UserCircleIcon className="w-12" />
      <h2 className="my-auto px-4">{username}</h2>
    </div>
  );
};

export default async function LogoHeader() {
  const me = await fetchMe();
  let username = me.name?.formatted ? me.name.formatted : "Unknown User";
  return (
    <div id="logo-header" className="mt-8 w-full p-2">
      <UserLogo username={username} />
      <DrawerButtons />
      <hr className="bg-secondary" />
    </div>
  );
}

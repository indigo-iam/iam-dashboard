import { UserCircleIcon } from "@heroicons/react/24/solid";
import { DrawerButtons } from "./Drawer/Buttons";
import { fetchMe } from "@/services/me";



const UserLogo = (props: { username: string }) => {
  const { username } = props;
  return (
    <div className="flex">
      <UserCircleIcon className="w-16" />
      <h2 className="my-auto px-4">{username}</h2>
    </div>
  );
};

export const LogoHeader = async () => {
  const me = await fetchMe();
  let username = me.name.formatted ? me.name.formatted : "Unknown User";
  return (
    <div id="logo-header" className="w-full p-2">
      <UserLogo username={username} />
      <DrawerButtons />
      <hr className="bg-secondary" />
    </div>
  );
};

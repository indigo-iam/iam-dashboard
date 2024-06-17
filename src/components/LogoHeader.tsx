import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { DrawerButtons } from "./DrawerButtons";
import { fetchMe } from "@/services/me";

const LogoIam = () => {
  return (
    <div className="flex">
      <Image
        src="/cloud.png"
        width="0"
        height="0"
        sizes="100vw"
        className="my-auto w-28"
        alt="INFN Cloud"
        priority={true}
      />
      <div className="px-4 py-2 text-2xl font-bold text-secondary">
        INDIGO IAM for <br /> cnafsd
      </div>
    </div>
  );
};

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
      <LogoIam />
      <UserLogo username={username} />
      <DrawerButtons />
      <hr className="bg-secondary" />
    </div>
  );
};

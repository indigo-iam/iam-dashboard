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
        className="w-28 my-auto"
        alt="INFN Cloud"
        priority={true}
      />
      <div className="infn-subtitle infn-txt-secondary px-4 py-2">
        INDIGO IAM for <br /> cnafsd
      </div>
    </div>
  );
};

const UserLogo = (props: { username: string }) => {
  const { username } = props;
  return (
    <div className="infn-logo-user">
      <div style={{ width: "48px", display: "flex" }}>
        <UserCircleIcon />
      </div>
      <div className="h5 px-4 my-auto">{username}</div>
    </div>
  );
};

const Divider = () => {
  return <div className="infn-divider" />;
};

export const LogoHeader = async () => {
  const me = await fetchMe();

  if (!me) {
    return (
      <div id="logo-header" className="w-full p-2">
        <LogoIam />
        <UserLogo username={"Unknown User"} />
        <DrawerButtons />
        <Divider />
      </div>
    );
  }

  const username = await (async () => {
    const { name } = me;
    return name.formatted ?? "Unknown User";
  })();
  return (
    <div id="logo-header" className="w-full p-2">
      <LogoIam />
      <UserLogo username={username} />
      <DrawerButtons />
      <Divider />
    </div>
  );
};

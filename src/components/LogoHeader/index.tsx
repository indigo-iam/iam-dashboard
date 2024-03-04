import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  UserCircleIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import indigoLogo from "@assets/cloud.png";
import { useIam } from "@services/IAM";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-context";

const LogoIam = () => {
  return (
    <div className="d-flex">
      <img
        alt="INDIGO IAM Logo"
        src={indigoLogo}
        className="infn-logo-indigo"
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

interface ItemButtonProps {
  icon: ReactNode;
  title?: string;
  onClick: () => void;
}

const ItemButton = (props: ItemButtonProps) => {
  const { icon, title, onClick } = props;
  return (
    <button
      className="infn-btn icon infn-btn-primary"
      onClick={onClick}
      title={title}
    >
      <div style={{ width: "24px", height: "24px" }}>{icon}</div>
    </button>
  );
};

const Buttons = (props: { logout: () => void }) => {
  const { logout } = props;
  return (
    <div className="d-flex justify-content-around px-4 pb-1">
      <ItemButton icon={<BellIcon />} title="Notifications" onClick={logout} />
      <ItemButton icon={<WrenchIcon />} title="Settings" onClick={logout} />
      <ItemButton
        icon={<ArrowRightEndOnRectangleIcon />}
        title="Logout"
        onClick={logout}
      />
    </div>
  );
};

export const LogoHeader = (): JSX.Element => {
  const auth = useAuth();
  const iam = useIam();
  const username = auth.user?.profile.name ?? "Unknown User";

  const logout = async () => {
    await iam.logout();
    auth.removeUser();
  };

  return (
    <div id="logo-header">
      <LogoIam />
      <UserLogo username={username} />
      <Buttons logout={logout} />
      <Divider />
    </div>
  );
};

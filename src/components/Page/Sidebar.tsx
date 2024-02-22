import { Button, Drawer, DrawerLink, DrawerSection, LogoHeader } from "..";
import {
  HomeIcon,
  KeyIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "react-oidc-context";
import { useIam } from "@services/IAM";

const AccountManagement = () => {
  return (
    <DrawerSection title="Account Management">
      <DrawerLink title="Home" icon={<HomeIcon />} />
    </DrawerSection>
  );
};

const OrganizationManagement = () => {
  return (
    <DrawerSection title="Organization Management">
      <DrawerLink title="Users" icon={<UserIcon />} />
      <DrawerLink title="Groups" icon={<UserGroupIcon />} />
      <DrawerLink title="Clients" icon={<RocketLaunchIcon />} />
      <DrawerLink title="Tokens" icon={<KeyIcon />} />
    </DrawerSection>
  );
};

export interface SidebarProps {
  width: string;
}

export const Sidebar = (props: SidebarProps) => {
  const { width } = props;
  const auth = useAuth();
  const iam = useIam();
  const username = auth.user?.profile.name ?? "Unknown User";

  const Logout = () => {
    const logout = async () => {
      await iam.logout();
      auth.removeUser();
    };
    return (
      <Button
        className="mt-auto mb-2 mx-auto"
        color="secondary"
        onClick={logout}
      >
        Logout
      </Button>
    );
  };

  return (
    <Drawer width={width}>
      <LogoHeader username={username} />
      <AccountManagement />
      <OrganizationManagement />
      <Logout />
    </Drawer>
  );
};

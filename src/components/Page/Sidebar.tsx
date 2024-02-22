import { Drawer, DrawerLink, DrawerSection, LogoHeader } from "..";
import {
  HomeIcon,
  KeyIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

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

  return (
    <Drawer width={width}>
      <LogoHeader />
      <AccountManagement />
      <OrganizationManagement />
    </Drawer>
  );
};

import { withAuthenticationRequired } from "react-oidc-context";
import { Drawer, DrawerLink, DrawerSection } from "..";
import {
  HomeIcon,
  KeyIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const drawerWidth = "320px";

export interface PageProps {
  id?: string;
  children?: React.ReactNode;
}

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

const Sidebar = () => {
  return (
    <Drawer drawerWidth={drawerWidth}>
      <AccountManagement />
      <OrganizationManagement />
    </Drawer>
  );
};

export const Page = withAuthenticationRequired(
  (props: PageProps): JSX.Element => {
    const { id, children } = props;
    return (
      <div className="d-flex">
        <Sidebar />
        <div
          id={id}
          className="w-100 h-100 p-4"
          style={{ marginLeft: drawerWidth }}
        >
          <div className="d-flex align-items-start flex-column">{children}</div>
        </div>
      </div>
    );
  },
  {
    OnRedirecting: () => {
      return <div>Redirecting to login page...</div>;
    },
  }
);

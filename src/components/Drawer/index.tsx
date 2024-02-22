import { Button } from "@components";
import { LogoHeader } from "..";
import { useAuth } from "react-oidc-context";
import { useIam } from "@services/IAM";
import { ReactNode } from "react";
export const DrawerLink = (props: { title: string; icon: JSX.Element }) => {
  const { title, icon } = props;
  return (
    <button className="infn-drawer-link row">
      <div className="d-flex">
        <div className="me-2" style={{ width: "20px" }}>
          {icon}
        </div>
        {title}
      </div>
    </button>
  );
};

interface DrawerSectionProps {
  title: string;
  children?: ReactNode;
}

export const DrawerSection = (props: DrawerSectionProps) => {
  const { title, children } = props;
  return (
    <div className="infn-drawer-section">
      <div className="infn-section-subtitle infn-txt-secondary p-4">
        {title}
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
};

interface DrawerBodyProps {
  children?: ReactNode;
}

const DrawerBody = (props: DrawerBodyProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export interface DrawerProps {
  drawerWidth: string;
  children: ReactNode;
}
export const Drawer = (props: DrawerProps): JSX.Element => {
  const { drawerWidth, children } = props;
  const auth = useAuth();
  const iam = useIam();

  const Logout = () => {
    return (
      <Button
        className="mt-auto mb-2 mx-auto"
        color="secondary"
        onClick={async () => {
          await iam.logout();
          auth.removeUser();
        }}
      >
        Logout
      </Button>
    );
  };

  return (
    <div id="drawer" className="infn-drawer" style={{ width: drawerWidth }}>
      <div className={"h-100 d-flex align-items-start flex-column"}>
        <LogoHeader username={auth.user?.profile.name ?? "Unknown User"} />
        <DrawerBody>{children}</DrawerBody>
        <Logout />
      </div>
    </div>
  );
};

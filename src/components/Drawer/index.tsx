import { Button } from "../../components";
import { LogoHeader } from "..";
import { useAuth } from "react-oidc-context";
import { useIam } from "../../services/IAM";

export interface DrawerProps {
  drawerWidth: string;
}

export const Drawer = (props: DrawerProps): JSX.Element => {
  const { drawerWidth } = props;
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

  const elements = ["Users", "Groups", "Clients", "Tokens"];
  const Elements = () => {
    return (
      <div>
        {elements.map(e => {
          return (
            <div style={{ height: "32px" }} key={e}>
              {e}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      id="drawer"
      className="z-1 left-0 top-0 bottom-0 position-fixed"
      style={{ width: drawerWidth }}
    >
      <div
        className={
          "infn-bg-primary infn-txt-secondary h-100 d-flex align-items-start " +
          "flex-column p-2"
        }
      >
        <LogoHeader username={auth.user?.profile.name ?? "Unknown User"} />
        <Elements />
        <Logout />
      </div>
    </div>
  );
};

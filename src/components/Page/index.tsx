import { useAuth } from "react-oidc-context";
import { Drawer } from "..";

export interface PageProps {
  id?: string;
  children?: React.ReactNode;
}

export const Page = (props: PageProps): JSX.Element => {
  const { id, children } = props;
  const auth = useAuth();
  const drawerWidth = "240px";

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="d-flex">
        <Drawer drawerWidth={drawerWidth} />
        <div
          id={id}
          className="w-100 h-100 p-4"
          style={{ marginLeft: drawerWidth }}
        >
          <div className="d-flex align-items-start flex-column">{children}</div>
        </div>
      </div>
    );
  }

  auth.signinRedirect();
  return <div>{"Oops... Don't know what to do :("}</div>;
};

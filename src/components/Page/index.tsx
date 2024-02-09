import { withAuthenticationRequired } from "react-oidc-context";
import { Drawer } from "..";

export interface PageProps {
  id?: string;
  children?: React.ReactNode;
}

export const Page = withAuthenticationRequired(
  (props: PageProps): JSX.Element => {
    const { id, children } = props;
    const drawerWidth = "240px";
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
  },
  {
    OnRedirecting: () => {
      return <div>Redirecting to login page...</div>;
    },
  }
);

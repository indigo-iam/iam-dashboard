import { withAuthenticationRequired } from "react-oidc-context";
import { Sidebar } from "./Sidebar";

const drawerWidth = "320px";

export interface PageProps {
  id?: string;
  children?: React.ReactNode;
}

export const Page = withAuthenticationRequired(
  (props: PageProps): JSX.Element => {
    const { id, children } = props;
    return (
      <div className="d-flex">
        <Sidebar width={drawerWidth} />
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

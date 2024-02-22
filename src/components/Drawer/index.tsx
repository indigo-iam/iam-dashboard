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
  return <div className="infn-drawer-body">{children}</div>;
};

export interface DrawerProps {
  width: string;
  children: ReactNode;
}
export const Drawer = (props: DrawerProps): JSX.Element => {
  const { width, children } = props;
  return (
    <div id="drawer" className="infn-drawer" style={{ width: width }}>
      <DrawerBody>{children}</DrawerBody>
    </div>
  );
};

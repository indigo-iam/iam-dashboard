import { ReactNode } from "react";

const DrawerLinkBase = (props: {
  title: string;
  icon: JSX.Element;
  extraClass: string;
}) => {
  const { title, icon, extraClass } = props;
  return (
    <button className={"infn-drawer-link " + extraClass}>
      <div className="flex">
        <div className="me-2" style={{ width: "20px" }}>
          {icon}
        </div>
        {title}
      </div>
    </button>
  );
};

export const DrawerLink = (props: { title: string; icon: JSX.Element }) => {
  const { title, icon } = props;
  return <DrawerLinkBase title={title} icon={icon} extraClass="row" />;
};

export const DrawerFooterLink = (props: {
  title: string;
  icon: JSX.Element;
}) => {
  const { title, icon } = props;
  return (
    <DrawerLinkBase
      title={title}
      icon={icon}
      extraClass="infn-drawer-footer-link"
    />
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
      <div className="infn-section-subtitle infn-txt-secondary p-4 pb-2">
        {title}
      </div>
      <div className="infn-drawer-section-list">{children}</div>
    </div>
  );
};

interface DrawerBodyProps {
  children?: ReactNode;
}

export const DrawerBody = (props: DrawerBodyProps) => {
  const { children } = props;
  return <div className="infn-drawer-body">{children}</div>;
};

interface DrawerFooterProps {
  children?: ReactNode;
}

export const DrawerFooter = (props: DrawerFooterProps) => {
  const { children } = props;
  return <div className="infn-drawer-footer">{children}</div>;
};

export interface DrawerProps {
  width: string;
  children: ReactNode;
}
export const Drawer = (props: DrawerProps): JSX.Element => {
  const { width, children } = props;
  return (
    <div id="drawer" className="infn-drawer" style={{ width: width }}>
      {children}
    </div>
  );
};

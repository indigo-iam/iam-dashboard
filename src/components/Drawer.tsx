import Link from "next/link";
import { ReactNode } from "react";

export const DrawerLink = (props: {
  title: string;
  icon: JSX.Element;
  href: string;
}) => {
  const { title, href, icon } = props;
  return (
    <Link
      className="hover:bg-primary-hover flex rounded-lg p-2 transition ease-in-out"
      href={href}
    >
      <div className="me-2 w-6">{icon}</div>
      {title}
    </Link>
  );
};

interface DrawerSectionProps {
  title: string;
  children?: ReactNode;
}

export const DrawerSection = (props: DrawerSectionProps) => {
  const { title, children } = props;
  return (
    <>
      <p className="p-4 pb-2 text-lg font-bold uppercase text-secondary">
        {title}
      </p>
      <div className="px-4 text-lg">{children}</div>
    </>
  );
};

interface DrawerBodyProps {
  children?: ReactNode;
}

export const DrawerBody = (props: DrawerBodyProps) => {
  const { children } = props;
  return <div className="h-full">{children}</div>;
};

interface DrawerFooterProps {
  children?: ReactNode;
}

export const DrawerFooter = (props: DrawerFooterProps) => {
  const { children } = props;
  return <div className="absolute bottom-0 w-full">{children}</div>;
};

export interface DrawerProps {
  width: string;
  children: ReactNode;
}
export const Drawer = (props: DrawerProps): JSX.Element => {
  const { width, children } = props;
  return (
    <div
      id="drawer"
      className="fixed inset-0 z-10 bg-primary text-secondary"
      style={{ width: width }} // FIXME: use responsive layout
    >
      {children}
    </div>
  );
};

import { ReactNode } from "react";
import Header from "./header";
import "./drawer.css";
import DismissButton from "./dismiss-button";

interface DrawerSectionProps {
  title: string;
  children?: ReactNode;
}

export const DrawerSection = (props: DrawerSectionProps) => {
  const { title, children } = props;
  return (
    <>
      <p className="text-md p-4 pb-2 font-bold uppercase text-secondary">
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
  children: ReactNode;
  id: string;
}

export default function Drawer(props: Readonly<DrawerProps>) {
  const { children, id } = props;
  return (
    <>
      <Header drawerId={id} />
      <aside
        id={id}
        className="fixed inset-0 z-50 mt-16 w-80 -translate-x-full bg-primary text-secondary transition-transform lg:translate-x-0 dark:bg-primary-dark"
      >
        {children}
      </aside>
      <DismissButton drawerId={id} />
    </>
  );
}

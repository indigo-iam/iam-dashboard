import { ReactNode } from "react";
import Header from "./Header";
import "./drawer.css";
import DismissButton from "./DismissButton";

interface DrawerSectionProps {
  title: string;
  children?: ReactNode;
}

export const DrawerSection = (props: DrawerSectionProps) => {
  const { title, children } = props;
  return (
    <>
      <p className="p-4 pb-2 text-md font-bold uppercase text-secondary">
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

export default function Drawer(props: Readonly<DrawerProps>): JSX.Element {
  const { children, id } = props;
  return (
    <>
      <Header drawerId={id} />
      <aside
        id={id}
        className="fixed inset-0 z-30 mt-16 w-80 -translate-x-full bg-primary text-secondary transition-transform lg:translate-x-0"
      >
        {children}
      </aside>
      <DismissButton drawerId={id} />
    </>
  );
}

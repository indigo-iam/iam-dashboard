// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ReactNode } from "react";
import Header from "./header";
import DismissButton from "./dismiss-button";
import "./drawer.css";

interface DrawerSectionProps {
  title: string;
  children?: ReactNode;
}

export const DrawerSection = (props: DrawerSectionProps) => {
  const { title, children } = props;
  return (
    <>
      <p className="text-md text-secondary p-4 pb-2 font-bold uppercase">
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
        className="bg-infn text-secondary fixed inset-0 z-10 mt-16 w-80 -translate-x-full transition-transform lg:translate-x-0"
      >
        {children}
      </aside>
      <DismissButton drawerId={id} />
    </>
  );
}

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Image from "next/image";
import BurgerButton from "./burger-button";

const LogoIam = () => (
  <div className="flex">
    <Image
      src="/cloud.png"
      width="0"
      height="0"
      sizes="100vw"
      className="my-auto w-20"
      alt="INFN Cloud"
      priority={true}
    />
    <div className="text-secondary my-auto px-4 py-1 text-2xl font-bold">
      INDIGO IAM for cnafsd
    </div>
  </div>
);

export default function Header(props: Readonly<{ drawerId: string }>) {
  const { drawerId } = props;
  return (
    <header className="bg-infn fixed top-0 left-0 z-30 h-16 w-screen lg:w-80">
      <div className="flex h-full justify-between px-4">
        <LogoIam />
        <BurgerButton drawerId={drawerId} />
      </div>
    </header>
  );
}

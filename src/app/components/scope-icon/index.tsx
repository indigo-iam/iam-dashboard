// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Scope } from "@/models/client";
import {
  ClockIcon,
  EnvelopeIcon,
  HomeIcon,
  ListBulletIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

type ScopeIconProps = {
  scope: Scope;
  className?: string;
};

export default function ScopeIcon(props: Readonly<ScopeIconProps>) {
  const { scope, className } = props;
  switch (scope.icon) {
    case "user":
      return <UserIcon className={className} />;
    case "list-alt":
      return <ListBulletIcon className={className} />;
    case "envelope":
      return <EnvelopeIcon className={className} />;
    case "home":
      return <HomeIcon className={className} />;
    case "bell":
      return <PhoneIcon className={className} />;
    case "time":
      return <ClockIcon className={className} />;
    default:
      null;
  }
}

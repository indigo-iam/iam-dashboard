// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import {
  Carousel,
  CarouselList,
  CarouselTab,
  CarouselPanels,
} from "@/components/carousel";
import GeneralSettings from "./general-settings";
import OIDCSettings from "./oidc-settings";
import OtherSettings from "./other-settings";
import { useState } from "react";
import { Scope } from "@/models/client";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import { Stepper } from "@/components/stepper";

const TOTAL_PAGES = 3;

type NewClientCarouselProps = {
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

export function NewClientCarousel(props: Readonly<NewClientCarouselProps>) {
  const { systemScopes } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const back = () => setCurrentPage(Math.max(0, currentPage - 1));
  const next = () => setCurrentPage(Math.min(currentPage + 1, TOTAL_PAGES));

  const title = [
    "General Settings",
    "OpenID Connect - OAuth2",
    "Other Settings",
  ][currentPage];

  return (
    <div className="flex">
      <Stepper currentPage={currentPage} totalPages={TOTAL_PAGES} />
      <div className="panel flex grow flex-col gap-4">
        <h2>{title}</h2>
        <Carousel selectedIndex={currentPage}>
          <CarouselList>
            <CarouselTab>General Settings</CarouselTab>
            <CarouselTab>OIDC/OAuth2</CarouselTab>
            <CarouselTab>Other Info</CarouselTab>
          </CarouselList>
          <CarouselPanels>
            <GeneralSettings goBack={back} goNext={next} />
            <OIDCSettings
              systemScopes={systemScopes}
              goBack={back}
              goNext={next}
            />
            <OtherSettings goBack={back} />
          </CarouselPanels>
        </Carousel>
      </div>
    </div>
  );
}

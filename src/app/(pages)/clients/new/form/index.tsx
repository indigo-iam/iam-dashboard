// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import {
  Carousel,
  CarouselList,
  CarouselNavigator,
  CarouselTab,
  CarouselPanels,
} from "@/components/carousel";
import GeneralSettings from "./general-settings";
import OIDCSettings from "./oidc-settings";
import OtherSettings from "./other-settings";
import { useReducer } from "react";
import { Scope } from "@/models/client";
import { OpenIdConfiguration } from "@/models/openid-configuration";
import { FormStatusProvider, useFormStatus } from "@/utils/forms";
import { Stepper } from "@/components/stepper";
import { Section } from "@/components/layout";

const TOTAL_PAGES = 3;

type NewClientFormProps = {
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

type Action = { type: "NEXT_PAGE" } | { type: "PREVIOUS_PAGE" };

type CarouselState = {
  currentPage: number;
  nextButtonTitle: string;
};

const initialState: CarouselState = {
  currentPage: 0,
  nextButtonTitle: "Continue",
};

function reducer(state: CarouselState, action: Action) {
  switch (action.type) {
    case "NEXT_PAGE": {
      const lastPage = TOTAL_PAGES - 1;
      const currentPage = Math.min(lastPage, state.currentPage + 1);
      const nextButtonTitle = currentPage === lastPage ? "Save" : "Continue";
      return { ...state, currentPage, nextButtonTitle };
    }
    case "PREVIOUS_PAGE": {
      const currentPage = Math.max(0, state.currentPage - 1);
      const nextButtonTitle = "Continue";
      return { ...state, currentPage, nextButtonTitle };
    }
    default:
      return state;
  }
}

export function NewClientCarousel(props: Readonly<NewClientFormProps>) {
  const { systemScopes, openIdConfiguration } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formStatus } = useFormStatus();

  const back = () => dispatch({ type: "PREVIOUS_PAGE" });
  const next = () => dispatch({ type: "NEXT_PAGE" });

  const canNavigateBack = state.currentPage > 0;
  const canNavigateNext =
    (state.currentPage === 0 && formStatus["generalSettings"]) ||
    (state.currentPage === 1 && formStatus["oidcSettings"]) ||
    (state.currentPage === 2 && formStatus["otherSettings"]);
  const titles = [
    "General Settings",
    "OpenID Connect - OAuth2",
    "Other Settings",
  ];
  return (
    <div className="flex">
      <Stepper currentPage={state.currentPage} totalPages={TOTAL_PAGES} />
      <div className="flex grow flex-col gap-4">
        <Section title={titles[state.currentPage]}>
          <Carousel selectedIndex={state.currentPage}>
            <CarouselList>
              <CarouselTab>General Settings</CarouselTab>
              <CarouselTab>OIDC/OAuth2</CarouselTab>
              <CarouselTab>Other Info</CarouselTab>
            </CarouselList>
            <CarouselPanels>
              <GeneralSettings id="generalSettings" />
              <OIDCSettings
                systemScopes={systemScopes}
                openIdConfiguration={openIdConfiguration}
                id="oidcSettings"
              />
              <OtherSettings id="otherSettings" />
            </CarouselPanels>
          </Carousel>
          <CarouselNavigator
            currentPage={state.currentPage}
            totalPages={TOTAL_PAGES}
            onBack={back}
            onNext={next}
            backButtonTitle="Back"
            nextButtonTitle={state.nextButtonTitle}
            backButtonDisabled={!canNavigateBack}
            nextButtonDisabled={!canNavigateNext}
          />
        </Section>
      </div>
    </div>
  );
}

export function NewClientForm(props: Readonly<NewClientFormProps>) {
  return (
    <FormStatusProvider>
      <NewClientCarousel {...props} />
    </FormStatusProvider>
  );
}

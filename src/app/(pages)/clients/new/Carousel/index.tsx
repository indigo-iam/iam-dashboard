"use client";
import {
  Carousel,
  CarouselList,
  CarouselNavigator,
  CarouselTab,
} from "@/components/Carousel";
import CarouselPanels from "@/components/Carousel/CarouselPanels";
import GeneralSettings from "./GeneralSettings";
import OIDCSettings from "./OIDCSettings";
import OtherInfo from "./OtherInfo";
import { useReducer } from "react";
import { Scope } from "@/models/client";
import { OpenIdConfiguration } from "@/models/openid-configuration";

const TOTAL_PAGES = 3;

type NewClientCarouselProps = {
  systemScopes: Scope[];
  openIdConfiguration: OpenIdConfiguration;
};

type Action =
  | { type: "NEXT_PAGE" }
  | { type: "PREVIOUS_PAGE" }
  | { type: "GENERAL_SETTINGS_FULFILLED"; fulfilled: boolean }
  | { type: "OIDC_SETTINGS_FULFILLED"; fulfilled: boolean }
  | { type: "OTHER_SETTINGS_FULFILLED"; fulfilled: boolean };

type CarouselState = {
  currentPage: number;
  nextButtonTitle: string;
  nextButtonType: string;
  generalSettingsFulFilled: boolean;
  oidcSettingsFulfilled: boolean;
  otherSettingsFulfilled: boolean;
};

const initialState: CarouselState = {
  currentPage: 0,
  nextButtonTitle: "Next",
  nextButtonType: "button",
  generalSettingsFulFilled: false,
  // since authorization_code is the default value, redirect_uris must be fulfilled
  oidcSettingsFulfilled: false,
  otherSettingsFulfilled: true,
};

function reducer(state: CarouselState, action: Action) {
  switch (action.type) {
    case "NEXT_PAGE": {
      const lastPage = TOTAL_PAGES - 1;
      const currentPage = Math.min(lastPage, state.currentPage + 1);
      const nextButtonType = currentPage === lastPage ? "submit" : "button";
      const nextButtonTitle = currentPage === lastPage ? "Save" : "Next";
      return { ...state, currentPage, nextButtonType, nextButtonTitle };
    }
    case "PREVIOUS_PAGE": {
      const currentPage = Math.max(0, state.currentPage - 1);
      const nextButtonType = "button";
      const nextButtonTitle = "Next";
      return { ...state, currentPage, nextButtonType, nextButtonTitle };
    }
    case "GENERAL_SETTINGS_FULFILLED": {
      const generalSettingsFulFilled = action.fulfilled;
      return { ...state, generalSettingsFulFilled };
    }
    case "OIDC_SETTINGS_FULFILLED": {
      const oidcSettingsFulfilled = action.fulfilled;
      return { ...state, oidcSettingsFulfilled };
    }
    case "OTHER_SETTINGS_FULFILLED": {
      const otherSettingsFulfilled = action.fulfilled;
      return { ...state, otherSettingsFulfilled };
    }
    default:
      return state;
  }
}

export default function NewClientCarousel(
  props: Readonly<NewClientCarouselProps>
) {
  const { systemScopes, openIdConfiguration } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const back = () => dispatch({ type: "PREVIOUS_PAGE" });
  const next = () => dispatch({ type: "NEXT_PAGE" });

  const handleGeneralSettingsFulfilled = (fulfilled: boolean) => {
    dispatch({ type: "GENERAL_SETTINGS_FULFILLED", fulfilled });
  };

  const handleOIDCSettingsFulFilled = (fulfilled: boolean) => {
    dispatch({ type: "OIDC_SETTINGS_FULFILLED", fulfilled });
  };

  const canNavigateBack = state.currentPage > 0;
  const canNavigateNext =
    (state.currentPage === 0 && state.generalSettingsFulFilled) ||
    (state.currentPage === 1 && state.oidcSettingsFulfilled) ||
    (state.currentPage === 2 && state.otherSettingsFulfilled);

  return (
    <>
      <Carousel selectedIndex={state.currentPage}>
        <CarouselList>
          <CarouselTab>General Settings</CarouselTab>
          <CarouselTab>OIDC/OAuth2</CarouselTab>
          <CarouselTab>Other Info</CarouselTab>
        </CarouselList>
        <CarouselPanels>
          <GeneralSettings onChange={handleGeneralSettingsFulfilled} />
          <OIDCSettings
            systemScopes={systemScopes}
            openIdConfiguration={openIdConfiguration}
            onChange={handleOIDCSettingsFulFilled}
          />
          <OtherInfo />
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
    </>
  );
}

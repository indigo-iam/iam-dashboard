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
import { useState } from "react";
import { Scope } from "@/models/client";

type NewClientCarouselProps = {
  systemScopes: Scope[];
};

export default function NewClientCarousel(
  props: Readonly<NewClientCarouselProps>
) {
  const { systemScopes } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const back = (newIndex: number) => setSelectedIndex(Math.max(0, newIndex));
  const next = (newIndex: number) => setSelectedIndex(Math.min(2, newIndex));

  const backButtonTitle = "Back";
  const nextButtonTitle = selectedIndex < 2 ? "Next" : "Save";

  return (
    <>
      <Carousel selectedIndex={selectedIndex}>
        <CarouselList>
          <CarouselTab>General Settings</CarouselTab>
          <CarouselTab>OIDC/OAuth2</CarouselTab>
          <CarouselTab>Other Info</CarouselTab>
        </CarouselList>
        <CarouselPanels>
          <GeneralSettings />
          <OIDCSettings systemScopes={systemScopes} />
          <OtherInfo />
        </CarouselPanels>
      </Carousel>
      <CarouselNavigator
        index={selectedIndex}
        onBack={back}
        onNext={next}
        backButtonTitle={backButtonTitle}
        nextButtonTitle={nextButtonTitle}
      />
    </>
  );
}

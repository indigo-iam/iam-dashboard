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

export default function NewClientCarousel() {
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
          <OIDCSettings />
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

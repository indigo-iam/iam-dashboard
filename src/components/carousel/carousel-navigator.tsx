// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { useState } from "react";

type CarouselNavigatorProps = {
  currentPage: number;
  totalPages: number;
  onBack: () => void;
  onNext: () => void;
  backButtonTitle?: string;
  nextButtonTitle?: string;
  nextButtonDisabled?: boolean;
  backButtonDisabled?: boolean;
};

export default function CarouselNavigator(
  props: Readonly<CarouselNavigatorProps>
) {
  const {
    currentPage,
    totalPages,
    onBack,
    onNext,
    backButtonTitle,
    nextButtonTitle,
    nextButtonDisabled,
    backButtonDisabled,
  } = props;

  const [buttonType, setButtonType] = useState<"button" | "submit">("button");

  const back = () => {
    setButtonType("button");
    onBack();
  };
  const next = () => {
    setButtonType(currentPage === totalPages - 1 ? "submit" : "button");
    onNext();
  };

  return (
    <div className="flex flex-row justify-end gap-2">
      <Button
        className="btn-tertiary"
        onClick={back}
        type="button"
        disabled={backButtonDisabled}
      >
        {backButtonTitle}
      </Button>
      <Button
        className="btn-primary"
        onClick={next}
        type={buttonType}
        disabled={nextButtonDisabled}
      >
        {nextButtonTitle}
      </Button>
    </div>
  );
}

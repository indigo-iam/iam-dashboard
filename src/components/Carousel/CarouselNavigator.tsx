import { useState } from "react";
import { Button } from "../Buttons";

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
    <div className="flex flex-row gap-2">
      <Button
        onClick={back}
        type="button"
        action="primary-outline"
        disabled={backButtonDisabled}
      >
        {backButtonTitle}
      </Button>
      <Button onClick={next} type={buttonType} disabled={nextButtonDisabled}>
        {nextButtonTitle}
      </Button>
    </div>
  );
}

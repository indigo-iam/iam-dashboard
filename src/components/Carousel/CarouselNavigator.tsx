import { Button } from "../Buttons";

type CarouselNavigatorProps = {
  index: number;
  onBack: (index: number) => void;
  onNext: (index: number) => void;
  backButtonTitle?: string;
  nextButtonTitle?: string;
};

export default function CarouselNavigator(
  props: Readonly<CarouselNavigatorProps>
) {
  const { index, onBack, onNext, backButtonTitle, nextButtonTitle } = props;
  const back = () => onBack(index - 1);
  const next = () => onNext(index + 1);
  return (
    <div className="flex flex-row gap-2">
      <Button onClick={back} type="button" action="primary-outline">
        {backButtonTitle}
      </Button>
      <Button onClick={next} type="button">
        {nextButtonTitle}
      </Button>
    </div>
  );
}

import CarouselGroup from "./CarouselGroup";

type CarouselProps = {
  selectedIndex?: number;
  onChange?: (index: number) => void;
  children?: React.ReactNode;
};

export default function Carousel(props: Readonly<CarouselProps>) {
  const { selectedIndex, onChange, children } = props;
  return (
    <>
      <CarouselGroup selectedIndex={selectedIndex} onChange={onChange}>
        {children}
      </CarouselGroup>
    </>
  );
}

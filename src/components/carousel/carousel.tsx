// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import CarouselGroup from "./carousel-group";

type CarouselProps = {
  selectedIndex?: number;
  onChange?: (index: number) => void;
  children?: React.ReactNode;
};

export default function Carousel(props: Readonly<CarouselProps>) {
  const { selectedIndex, onChange, children } = props;
  return (
    <CarouselGroup selectedIndex={selectedIndex} onChange={onChange}>
      {children}
    </CarouselGroup>
  );
}

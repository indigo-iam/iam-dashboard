// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

export function usePaginator(totalResults: number) {
  const [count, setCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = Math.ceil(totalResults / count);
  const onFirst = () => setCurrentPage(1);
  const onPrevious = () => setCurrentPage(Math.max(0, currentPage - 1));
  const onNext = () => setCurrentPage(Math.min(currentPage + 1, numberOfPages));
  const onLast = () => setCurrentPage(numberOfPages);
  const onCountChange = (n: number) => {
    setCount(n);
    setCurrentPage(1);
  };
  const start = (currentPage - 1) * count;
  const end = start + count;
  return {
    currentPage,
    count,
    onFirst,
    onPrevious,
    onNext,
    onLast,
    onCountChange,
    numberOfPages,
    start,
    end,
  };
}

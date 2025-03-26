// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type Paginated<T> = {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: T[];
};

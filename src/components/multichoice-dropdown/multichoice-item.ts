// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type MultiChoiceItemI = {
  key: string;
  title: string;
  subtitle?: string | null;
  onSelect?: (item: MultiChoiceItemI) => void;
  select: () => void;
};

export class MultiChoiceItem implements MultiChoiceItemI {
  key: string;
  title: string;
  subtitle?: string | null;
  onSelect?: (item: MultiChoiceItemI) => void;

  constructor(
    key: string,
    title: string,
    subtitle?: string | null,
    onSelect?: (item: MultiChoiceItemI) => void
  ) {
    this.key = key;
    this.title = title;
    this.subtitle = subtitle;
    this.onSelect = onSelect;
  }
  select() {
    this.onSelect?.(this);
  }
}

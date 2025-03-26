// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { createContext } from "react";

type FormStatus = { [k: string]: boolean };

export type FormStatusContextProps = {
  formStatus: FormStatus;
  updateFormStatus: (id: string, value: boolean) => void;
};

export const FormStatusContext = createContext<
  FormStatusContextProps | undefined
>(undefined);

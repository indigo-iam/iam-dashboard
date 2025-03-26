// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useContext } from "react";
import {
  FormStatusContext,
  FormStatusContextProps,
} from "./form-status-context";

export function useFormStatus(): FormStatusContextProps {
  const context = useContext(FormStatusContext);
  if (!context) {
    throw new Error(
      "FormStatusContext is undefined. Please verify you are calling 'useFormStatus' as a child of <FormStatusProvider> component."
    );
  }
  return context;
}

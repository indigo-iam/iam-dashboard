import { useCallback, useMemo, useState } from "react";
import {
  FormStatusContext,
  FormStatusContextProps,
} from "./form-status-context";

type FormStatus = { [k: string]: boolean };

export function FormStatusProvider(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;
  const [formStatus, setFormStatus] = useState<FormStatus>({});

  const updateFormStatus = useCallback(
    (id: string, value: boolean) => {
      const newStatus = { ...formStatus };
      newStatus[id] = value;
      setFormStatus(newStatus);
    },
    [formStatus]
  );

  const value: FormStatusContextProps = useMemo(() => {
    return { formStatus, updateFormStatus };
  }, [formStatus, updateFormStatus]);

  return (
    <FormStatusContext.Provider value={value}>
      {children}
    </FormStatusContext.Provider>
  );
}

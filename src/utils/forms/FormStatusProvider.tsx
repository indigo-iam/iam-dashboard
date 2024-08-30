import { useMemo, useState } from "react";
import { FormStatusContext, FormStatusContextProps } from "./FormStatusContext";

type FormStatus = { [k: string]: boolean };

export function FormStatusProvider(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;
  const [formStatus, setFormStatus] = useState<FormStatus>({});

  const updateFormStatus = (id: string, value: boolean) => {
    const newStatus = { ...formStatus };
    newStatus[id] = value;
    setFormStatus(newStatus);
    console.log(newStatus);
  };

  const value: FormStatusContextProps = useMemo(() => {
    return { formStatus, updateFormStatus };
  }, [formStatus]);

  return (
    <FormStatusContext.Provider value={value}>
      {children}
    </FormStatusContext.Provider>
  );
}

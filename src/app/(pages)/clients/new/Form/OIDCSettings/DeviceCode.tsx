import { useFormStatus } from "@/utils/forms";
import { useEffect } from "react";

type DeviceCodeProps = {
  formComponentId: string;
};

export default function DeviceCode(props: Readonly<DeviceCodeProps>) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    updateFormStatus(formComponentId, true);
  }, [formComponentId]);

  return null;
}

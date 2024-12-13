import { useEffect } from "react";

type DeviceCodeProps = {
  onStatusChange: (status: boolean) => void;
};

export default function DeviceCode(props: Readonly<DeviceCodeProps>) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange(true), [onStatusChange]);

  return null;
}

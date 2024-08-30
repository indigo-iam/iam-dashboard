import { useEffect } from "react";

type ClientCredentialsProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientCredentials(
  props: Readonly<ClientCredentialsProps>
) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange(true), []);

  return null;
}

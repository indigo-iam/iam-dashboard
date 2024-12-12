import { useEffect } from "react";

type ClientSecretBasicProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientSecretBasic(
  props: Readonly<ClientSecretBasicProps>
) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange(true), [onStatusChange]);
  return <p>Client Secret Basic Here</p>;
}

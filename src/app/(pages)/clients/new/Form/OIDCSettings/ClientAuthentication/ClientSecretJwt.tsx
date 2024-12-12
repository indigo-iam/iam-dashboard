type ClientSecretJwtProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientSecretJwt(props: Readonly<ClientSecretJwtProps>) {
  const { onStatusChange } = props;
  onStatusChange(true);
  return <p>Client Secret JWT here</p>;
}

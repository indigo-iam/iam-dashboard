type ClientSecretJwtProps = {
  onStatusChange: (status: boolean) => void
};

export default function ClientSecretJwt(props: Readonly<ClientSecretJwtProps>) {
  const { onStatusChange } = props;
  onStatusChange(true);
  return null;
}

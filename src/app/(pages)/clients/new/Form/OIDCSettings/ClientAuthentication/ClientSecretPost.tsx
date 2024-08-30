type ClientSecretPostProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientSecretPost(
  props: Readonly<ClientSecretPostProps>
) {
  const { onStatusChange } = props;
  onStatusChange(true);
  return null;
}

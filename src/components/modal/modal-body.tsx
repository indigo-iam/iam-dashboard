export const ModalBody = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <div className="space-y-4 p-4">{children}</div>;
};

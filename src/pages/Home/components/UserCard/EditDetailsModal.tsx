import { Modal } from "@components";

export const EditDetailsModal = (props: {
  show: boolean;
  onClose: () => void;
}) => {
  const { show, onClose } = props;
  const Body = () => {
    return <div></div>;
  };

  const Footer = () => {
    return <div></div>;
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Edit Details"
      body={<Body />}
      footer={<Footer />}
    />
  );
};

import { Input, Modal } from "antd";
import { AttachmentConfirmationMessages } from "constants/index";
import "./attachment-confirmation.css";

interface AttachmentConfirmationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  handleOk: any;
  type: string;
}

function AttachmentConfirmationModal(props: AttachmentConfirmationModalProps) {
  const { type, isModalOpen, setIsModalOpen, handleOk } = props;
  const onOkClick = () => {
    handleOk();
  };
  return (
    <Modal
      className="attach-document"
      title="Attach Document"
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      okText="Attach"
      onOk={onOkClick}
    >
      <p className="attachment-heading">
        {AttachmentConfirmationMessages.heading.replace("{type}", type)}
      </p>
      <p className="attachment-sub-heading">
        {AttachmentConfirmationMessages.subHeading.replace("{type}", type)}
      </p>
      <p>
        <Input type="checkbox" style={{ width: "auto" }} />
        <span className="annotation-text">Remove all annotations</span>
      </p>
    </Modal>
  );
}

export default AttachmentConfirmationModal;

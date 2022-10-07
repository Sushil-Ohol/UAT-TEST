import { Modal } from "antd";
import { CopyDocumentModalContent } from "constants/index";

interface CopyDocumentModalProps {
  isCopyDocumentModalOpen: boolean;
  handleCancel: any;
  handleOk: any;
  isCopyDocumentModalTitle: string;
  selectedData: any[];
}

function CopyDocumentModal(props: CopyDocumentModalProps) {
  const {
    isCopyDocumentModalOpen,
    handleCancel,
    handleOk,
    isCopyDocumentModalTitle,
    selectedData
  } = props;
  return (
    <Modal
      className="disucssion-doc-modal"
      centered
      title={isCopyDocumentModalTitle}
      visible={isCopyDocumentModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirm"
    >
      <div className="heading"> {CopyDocumentModalContent.Confirm} </div>
      <b>
        {" "}
        {selectedData.length === 1 && selectedData[0]?.id} :{" "}
        {selectedData.length === 1 && selectedData[0].submittal}
      </b>{" "}
      <br />
      <br />
      <div className="content"> {CopyDocumentModalContent.General}</div>
    </Modal>
  );
}

export default CopyDocumentModal;

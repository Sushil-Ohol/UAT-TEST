import { Modal } from "antd";
import { CopyDocumentModalContent } from "constants/index";
import React, { useEffect } from "react";

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
  const [text, setText] = React.useState<any>("");
  useEffect(
    () =>
      setText(
        selectedData.length === 1 &&
          `${selectedData[0]?.id}: ${selectedData[0].submittal}`
      ),
    [selectedData]
  );
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
      <b>{text}?</b>
      <br />
      <div className="content"> {CopyDocumentModalContent.General}</div>
    </Modal>
  );
}

export default CopyDocumentModal;

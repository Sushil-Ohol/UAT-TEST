/* eslint-disable react/require-default-props */

import { Modal } from "antd";
import { SubmittalLog } from "models/submittal-log";

type Props = {
  isOnlyStatusChange: boolean;
  onStatusChange: () => void;
  onCancel: () => void;
  updatedData: SubmittalLog;
  className?: string;
};

function StatusChangeConfirmation(props: Props) {
  const {
    isOnlyStatusChange,
    onStatusChange,
    onCancel,
    updatedData,
    className
  } = props;

  return (
    <Modal
      title={isOnlyStatusChange ? "Pass edit access" : "Update Status"}
      visible={isOnlyStatusChange}
      onOk={onStatusChange}
      onCancel={onCancel}
      okText="Update status"
      cancelText="Back"
      className={className}
    >
      <p>Update submittal status to &quot;{updatedData.status}&quot;?</p>
      <p>
        You are about to update the submittal status to{" "}
        <b>
          &quot;
          {updatedData.status}&quot;
        </b>
        .
      </p>
    </Modal>
  );
}

export default StatusChangeConfirmation;

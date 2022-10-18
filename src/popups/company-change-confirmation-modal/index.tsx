/* eslint-disable react/require-default-props */

import { Modal } from "antd";
import { LockIcon } from "components/svg-icons";
import { SubmittalLog } from "models/submittal-log";

type Props = {
  isCompanyAssigneeChange: boolean;
  onCompanyAssigneeChange: () => void;
  onCancel: () => void;
  updatedData: SubmittalLog;
  className?: string;
};

function CompanyChangeConfirmation(props: Props) {
  const {
    isCompanyAssigneeChange,
    onCompanyAssigneeChange,
    onCancel,
    updatedData,
    className
  } = props;
  return (
    <Modal
      title="Pass edit access"
      visible={isCompanyAssigneeChange}
      onOk={onCompanyAssigneeChange}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Back"
      className={className}
    >
      <>
        <p>This will:</p>
        <p>
          Pass edit access to <b>{updatedData.assigned.email}</b> from{" "}
          <b>{updatedData.company.name}</b> with the status{" "}
          <b>{updatedData.status}</b>
        </p>
        <p>
          <LockIcon /> You will not be able to edit the submittal or reply to
          discussions, until the review is finished.
        </p>
      </>
    </Modal>
  );
}

export default CompanyChangeConfirmation;

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
          Pass edit access to {updatedData.assigned.email} from{" "}
          {updatedData.company.name} with the status {updatedData.status}
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

import { Button, Modal } from "antd";
import { LockIcon } from "components/svg-icons";
import { SubmittalLog } from "models/submittal-log";
import "./confirmation-modal.css";

type Props = {
  onClick: () => void;
  isCompanyAssigneeChange: boolean;
  showConfirmationModal: boolean;
  onStatusChange: () => void;
  onCompanyAssigneeChange: () => void;
  onCancel: () => void;
  updatedData: SubmittalLog;
};

function ConfirmationModal(props: Props) {
  const {
    onClick,
    isCompanyAssigneeChange,
    showConfirmationModal,
    onStatusChange,
    onCompanyAssigneeChange,
    onCancel,
    updatedData
  } = props;

  return (
    <>
      <Button
        style={{
          float: "right",
          backgroundColor: "#FFFFFF",
          color: "#007AFF",
          borderColor: "#007AFF"
        }}
        type="primary"
        onClick={onClick}
      >
        Save
      </Button>
      <Modal
        title={isCompanyAssigneeChange ? "Pass edit access" : "Update Status"}
        visible={showConfirmationModal}
        onOk={
          isCompanyAssigneeChange ? onCompanyAssigneeChange : onStatusChange
        }
        onCancel={onCancel}
        okText={isCompanyAssigneeChange ? "Confirm" : "Update status"}
        cancelText="Back"
        className="confirmationModal"
      >
        {isCompanyAssigneeChange ? (
          <>
            <p>This will:</p>
            <p>
              Pass edit access to {updatedData.assigned.email} from{" "}
              {updatedData.company.name} with the status {updatedData.status}
            </p>
            <p>
              <LockIcon /> You will not be able to edit the submittal or reply
              to discussions, until the review is finished.
            </p>
          </>
        ) : (
          <>
            <p>Update submittal status to &quot;{updatedData.status}&quot;?</p>
            <p>
              You are about to update the submittal status to &quot;
              {updatedData.status}&quot;.
            </p>
          </>
        )}
      </Modal>
    </>
  );
}

export default ConfirmationModal;

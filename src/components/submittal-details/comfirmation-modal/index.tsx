import { Button, Modal } from "antd";
import { LockIcon } from "components/svg-icons";
import { SubmittalLog } from "models/submittal-log";
import "./comfirmation-modal.css";

type Props = {
  onClick: () => void;
  isOnlyStatusChange: boolean;
  isCompanyAssigneeChange: boolean;
  showModal: boolean;
  onStatusChange: () => void;
  onCompanyAssigneeChange: () => void;
  onCancel: () => void;
  updatedData: SubmittalLog;
};

function ComfirmationModal(props: Props) {
  const {
    onClick,
    isOnlyStatusChange,
    isCompanyAssigneeChange,
    showModal,
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
        title="Update Status"
        visible={isOnlyStatusChange && showModal}
        onOk={onStatusChange}
        onCancel={onCancel}
        okText="Update status"
        cancelText="Back"
        className="comfirmationModal"
      >
        <p>Update submittal status to &quot;{updatedData.status}&quot;?</p>
        <p>
          You are about to update the submittal status to &quot;
          {updatedData.status}&quot;.
        </p>
      </Modal>
      <Modal
        title="Pass edit access"
        visible={isCompanyAssigneeChange && showModal}
        onOk={onCompanyAssigneeChange}
        onCancel={onCancel}
        okText="Confirm"
        cancelText="Back"
        className="comfirmationModal"
      >
        <p>This will:</p>
        <p>
          Pass edit access to {updatedData.assigned.email} from{" "}
          {updatedData.company.name} with the status {updatedData.status}
        </p>
        <p>
          <LockIcon /> You will not be able to edit the submittal or reply to
          discussions, until the review is finished.
        </p>
      </Modal>
    </>
  );
}

export default ComfirmationModal;

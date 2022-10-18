import { Button } from "antd";
import { SubmittalLog } from "models/submittal-log";
import { CompanyChangeConfirmation, StatusChangeConfirmation } from "popups";
import "./confirmation-modal.css";

type Props = {
  onClick: () => void;
  isCompanyAssigneeChange: boolean;
  showConfirmationModal: boolean;
  onStatusChange: () => void;
  onCompanyAssigneeChange: () => void;
  onCancel: () => void;
  updatedData: SubmittalLog;
  hasCurrentAccess: boolean;
};

function SaveBtnConfirmation(props: Props) {
  const {
    onClick,
    isCompanyAssigneeChange,
    showConfirmationModal,
    onStatusChange,
    onCompanyAssigneeChange,
    onCancel,
    updatedData,
    hasCurrentAccess
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
        disabled={hasCurrentAccess}
      >
        Submit
      </Button>
      {isCompanyAssigneeChange ? (
        <CompanyChangeConfirmation
          isCompanyAssigneeChange={showConfirmationModal}
          onCancel={onCancel}
          onCompanyAssigneeChange={onCompanyAssigneeChange}
          updatedData={updatedData}
          className="confirmationModal"
        />
      ) : (
        <StatusChangeConfirmation
          isOnlyStatusChange={showConfirmationModal}
          onCancel={onCancel}
          onStatusChange={onStatusChange}
          updatedData={updatedData}
          className="confirmationModal"
        />
      )}
    </>
  );
}

export default SaveBtnConfirmation;

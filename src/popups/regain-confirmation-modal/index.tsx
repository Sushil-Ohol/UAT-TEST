import { WarningFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { RegainEditConfirmationMessages } from "constants/index";
import { useAppDispatch, useAppSelector } from "store";
import {
  setRegainEditModal,
  setSelectedSubmittal,
  updateField
} from "store/slices/submittalsSlices";
import "./regain-confirmation.css";

function RegainConfirmationModal() {
  const dispatch = useAppDispatch();
  const { showRegainEditModal, selectedSubmittalLog } = useAppSelector(
    (state) => state.submittals
  );
  const { currentUser } = useAppSelector((state) => state.auth);
  const onCancel = () => {
    dispatch(setRegainEditModal(false));
  };

  const forceRegain = () => {
    if (selectedSubmittalLog && currentUser) {
      dispatch(
        updateField({
          submittalId: selectedSubmittalLog.id,
          field: "company",
          value: currentUser.company
        })
      );
      dispatch(
        setSelectedSubmittal({
          ...selectedSubmittalLog,
          company: currentUser.company
        })
      );
      dispatch(setRegainEditModal(false));
    }
  };
  return (
    <Modal
      title="Force regain"
      visible={showRegainEditModal}
      onOk={forceRegain}
      onCancel={onCancel}
      okText="Force regain"
      cancelText="Back"
      className="confirmationModal"
      centered
      width={572}
    >
      <>
        <p>{RegainEditConfirmationMessages.firstMsg}</p>
        <p>{RegainEditConfirmationMessages.secondMsg}</p>
        <p>
          <WarningFilled style={{ color: "#FF3535", marginRight: "8px" }} />
          {RegainEditConfirmationMessages.thirdMsg.replace(
            "{currentUserEmail}",
            currentUser ? currentUser.email : ""
          )}
        </p>
      </>
    </Modal>
  );
}

export default RegainConfirmationModal;

import { Input, Modal } from "antd";
import "./submittal-details.css";

function ConfirmAttachModal(props: any) {
  const { isModalOpen, setIsModalOpen, handleOk } = props;
  return (
    <Modal
      className="attach-document"
      title="Attach Document"
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      okText="Attach"
      onOk={handleOk}
    >
      <p
        style={{
          font: "18px/21px Inter",
          letterSpacing: "0",
          color: "#000000FA",
          fontWeight: 600
        }}
      >
        Do you want to attach this document into this submittal?
      </p>
      <p
        style={{
          font: "16px/24px Inter",
          color: "#000000",
          letterSpacing: "0",
          fontWeight: 500
        }}
      >
        This will give access to everyone in this submittal including external
        users outside of your org.
      </p>
      <p>
        <Input type="checkbox" style={{ width: "auto" }} />
        <span
          style={{
            font: "font:14px/17px Inter",
            color: "#0000007F",
            marginLeft: "5px"
          }}
        >
          Remove all annotations
        </span>
      </p>
    </Modal>
  );
}

export default ConfirmAttachModal;

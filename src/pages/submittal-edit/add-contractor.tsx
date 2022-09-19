// react/jsx-no-bind
import { Button, Form, Modal, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import "./submittal-edit.css";

interface Props {
  onOkClick: Function;
  ContractorOptions: any;
}

function AddContractorModal({ ContractorOptions, onOkClick }: Props) {
  const [form] = useForm();

  const [isContractorModalOpen, setIsContractorModalOpen] = useState(false);

  const showContractorModal = () => {
    setIsContractorModalOpen(true);
  };

  const handleContractorOk = () => {
    form.validateFields().then((values) => {
      const newContractorData = [...ContractorOptions];
      const data = {
        name: values.companyName,
        email: values.emailId
      };
      newContractorData.push(data);
      onOkClick(newContractorData);
    });

    setIsContractorModalOpen(false);
  };

  const handleContractorCancel = () => {
    setIsContractorModalOpen(false);
  };

  return (
    <>
      <Button className="add-new-contractor-btn" onClick={showContractorModal}>
        + New
      </Button>
      <Modal
        title="New Contractor"
        visible={isContractorModalOpen}
        onOk={handleContractorOk}
        onCancel={handleContractorCancel}
        okText="Invite"
        className="add-new-contractor"
      >
        <Form layout="vertical" name="control-hooks" preserve form={form}>
          <Form.Item
            name="companyName"
            label="Company Name"
            className="add-new-contractor-label"
          >
            <Input
              name="companyName"
              className="add-new-contractor-input"
              placeholder="Enter company name"
            />
          </Form.Item>

          <Form.Item
            name="userName"
            label="User Name"
            className="add-new-contractor-label"
          >
            <Input
              name="userName"
              className="add-new-contractor-input"
              placeholder="Enter user name"
            />
          </Form.Item>

          <Form.Item
            name="emailId"
            label="Email ID"
            className="add-new-contractor-label"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input
              name="emailId"
              className="add-new-contractor-input"
              placeholder="Enter email id"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddContractorModal;

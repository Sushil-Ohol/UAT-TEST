// react/jsx-no-bind
import { Button, Form, Modal, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import "./submittal-edit.css";

interface Props {
  onOkClick: Function;
  assigneeOptions: any;
}

function AddAssigneeModal({ assigneeOptions, onOkClick }: Props) {
  const [form] = useForm();

  const [isAssigneeModalOpen, setIsAssigneeModalOpen] =
    useState<boolean>(false);

  const showAssigneeModal = () => {
    setIsAssigneeModalOpen(true);
  };

  const handleAssigneeOk = () => {
    form.validateFields().then((values) => {
      const newAssigneeData = [...assigneeOptions];
      const data = {
        assignedTo: values.assigneeUserName,
        destination: values.assigneeEmailId,
        contractor: "A Construction"
      };
      newAssigneeData.push(data);
      onOkClick(newAssigneeData);
    });

    setIsAssigneeModalOpen(false);
  };

  const handleAssigneeCancel = () => {
    setIsAssigneeModalOpen(false);
  };

  return (
    <>
      <Button className="add-new-assignee-btn" onClick={showAssigneeModal}>
        + New
      </Button>
      <Modal
        title="New Assignee"
        visible={isAssigneeModalOpen}
        onOk={handleAssigneeOk}
        onCancel={handleAssigneeCancel}
        okText="Invite"
        className="add-new-assignee"
      >
        <Form layout="vertical" name="control-hooks" preserve form={form}>
          <Form.Item
            name="assigneeUserName"
            label="User Name"
            className="add-new-assignee-label"
          >
            <Input
              name="assigneeUserName"
              className="add-new-assignee-input"
              placeholder="Enter user name"
            />
          </Form.Item>

          <Form.Item
            name="assigneeEmailId"
            label="Email ID"
            className="add-new-assignee-label"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input
              name="emailId"
              className="add-new-assignee-input"
              placeholder="Enter email id"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddAssigneeModal;

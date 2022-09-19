// react/jsx-no-bind
import { Form, Modal, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./add-assignee.css";

interface AddAssigneeModalProps {
  onOkClick: Function;
  assigneeOptions: any;
  show: boolean;
  onCancelClick: any;
}

function AddAssigneeModal({
  assigneeOptions,
  onOkClick,
  show,
  onCancelClick
}: AddAssigneeModalProps) {
  const [form] = useForm();

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
  };

  return (
    <Modal
      title="New Assignee"
      visible={show}
      onOk={handleAssigneeOk}
      onCancel={onCancelClick}
      okText="Invite"
      className="add-new-assignee"
    >
      <Form layout="vertical" name="control-hooks" preserve form={form}>
        <Form.Item
          name="assigneeUserName"
          label="User Name"
          className="add-new-assignee-label"
          rules={[
            {
              required: true,
              message: "Please enter a user name"
            }
          ]}
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
          rules={[
            { type: "email", message: "Please enter a valid email" },
            {
              required: true,
              message: "Please enter a email"
            }
          ]}
        >
          <Input
            name="emailId"
            className="add-new-assignee-input"
            placeholder="Enter email id"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddAssigneeModal;

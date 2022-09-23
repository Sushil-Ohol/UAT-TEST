// react/jsx-no-bind
import { Form, Modal, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./add-assignee.css";

interface AddAssigneeModalProps {
  onOkClick: Function;
  assigneeOptions: any;
  show: boolean;
  onCancelClick: any;
  selectedContractor: string;
}

function AddAssigneeModal({
  assigneeOptions,
  onOkClick,
  show,
  onCancelClick,
  selectedContractor
}: AddAssigneeModalProps) {
  const [form] = useForm();

  const isAssigneeExists = (assigneeUserName: string): boolean => {
    const filteredAssigneeData = assigneeOptions.filter(
      (contractor: any) => contractor.name === selectedContractor
    );

    const data = filteredAssigneeData[0].assignees.filter(
      (assignee: any) => assignee.name === assigneeUserName
    );

    if (Object.keys(data).length > 0) {
      return true;
    }
    return false;
  };

  const handleAssigneeOk = () => {
    form.validateFields().then((values) => {
      if (!isAssigneeExists(values.assigneeUserName)) {
        const data = {
          assignedTo: values.assigneeUserName,
          destination: "Project Manager"
        };
        onOkClick(data);
        form.resetFields();
      } else {
        message.error("Assignee already exists for selected contractor");
      }
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
          label="Contact Name"
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

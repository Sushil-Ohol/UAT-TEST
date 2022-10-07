// react/jsx-no-bind
import { Form, Modal, Input, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./add-assignee.css";
import { DropDownData, ErrorMessages } from "constants/index";

const { Option } = Select;

interface AddAssigneeModalProps {
  onOkClick: Function;
  assigneeOptions: any;
  show: boolean;
  onCancelClick: any;
  selectedCompany: string;
}

function AddAssigneeModal({
  assigneeOptions,
  onOkClick,
  show,
  onCancelClick,
  selectedCompany
}: AddAssigneeModalProps) {
  const [form] = useForm();

  const isAssigneeExists = (assigneeUserName: string): boolean => {
    const filteredAssigneeData = assigneeOptions.filter(
      (company: any) => company.name === selectedCompany
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
          destination: values.assigneeRole
        };
        onOkClick(data);
        form.resetFields();
      } else {
        message.error("Assignee already exists for selected company");
      }
    });
  };

  return (
    <Modal
      title="New Assignee"
      visible={show}
      onOk={handleAssigneeOk}
      onCancel={onCancelClick}
      okText="Send Invite"
      className="add-new-assignee"
    >
      <Form layout="vertical" name="control-hooks" preserve form={form}>
        <Form.Item
          name="assigneeUserName"
          label="Assignee Name"
          className="add-new-assignee-label"
          rules={[
            {
              required: true,
              message: ErrorMessages.AssigneeName
            }
          ]}
        >
          <Input
            name="assigneeUserName"
            className="add-new-assignee-input"
            placeholder="Enter Assignee name"
          />
        </Form.Item>

        <Form.Item
          name="assigneeRole"
          label="Assignee Role"
          className="add-new-assignee-label"
          rules={[
            {
              required: true,
              message: ErrorMessages.AssigneeRole
            }
          ]}
        >
          <Select showSearch optionFilterProp="children" className="roleSelect">
            {DropDownData.RoleOptions.map((data: any) => (
              <Option key={data}>{data}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="assigneeEmailId"
          label="Assignee Email"
          className="add-new-assignee-label"
          rules={[
            { type: "email", message: ErrorMessages.AssigneeEmail },
            {
              required: true,
              message: ErrorMessages.AssigneeEmailRequired
            }
          ]}
        >
          <Input
            name="emailId"
            className="add-new-assignee-input"
            placeholder="Enter an email id"
          />
        </Form.Item>
      </Form>
      <p>
        <b>
          Note : Send Invite Button click will send an email with instructions
          to join the project.Once they join, they will have access to all the
          details of this project.
        </b>
      </p>
    </Modal>
  );
}

export default AddAssigneeModal;

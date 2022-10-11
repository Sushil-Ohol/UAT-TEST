// react/jsx-no-bind
import { Form, Modal, Input, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { assigneesStatus, DropDownData, ErrorMessages } from "constants/index";
import "./add-company.css";

const { Option } = Select;

interface AddCompanyModalProps {
  onOkClick: Function;
  companyOptions: any;
  show: boolean;
  onCancelClick: any;
}

function AddCompanyModal({
  companyOptions,
  onOkClick,
  show,
  onCancelClick
}: AddCompanyModalProps) {
  const [form] = useForm();

  const isCompanyExists = (companyName: string): boolean => {
    const data = companyOptions.filter(
      (company: any) => company.name === companyName
    );
    if (Object.keys(data).length > 0) {
      return true;
    }
    return false;
  };

  const handleCompanyOk = () => {
    form.validateFields().then((values) => {
      if (!isCompanyExists(values.companyName)) {
        const companyData = {
          name: values.companyName,
          email: values.assigneeEmailId,
          assignees: [
            {
              assignedTo: values.assigneeUserName,
              destination: values.assigneeRole,
              email: values.assigneeEmailId,
              status: assigneesStatus.newAssignee,
              default: true
            }
          ]
        };
        onOkClick(companyData);
        form.resetFields();
      } else {
        message.error("Company already exists");
      }
    });
  };

  return (
    <Modal
      title="New Company"
      visible={show}
      onOk={handleCompanyOk}
      onCancel={onCancelClick}
      okText="Send Invite"
      className="add-new-company"
    >
      <Form layout="vertical" name="control-hooks" preserve form={form}>
        <Form.Item
          name="companyName"
          label="Company Name"
          className="add-new-company-label"
          rules={[
            {
              required: true,
              message: "Please enter a company name"
            }
          ]}
        >
          <Input
            name="companyName"
            className="add-new-company-input"
            placeholder="Enter company name"
          />
        </Form.Item>

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

export default AddCompanyModal;

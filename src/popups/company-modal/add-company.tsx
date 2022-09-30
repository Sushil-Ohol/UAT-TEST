// react/jsx-no-bind
import { Form, Modal, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./add-company.css";

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
          email: values.emailId,
          assignees: [
            {
              assignedTo: values.userName,
              destination: "Project Manager"
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
      okText="Invite"
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
          name="userName"
          label="Contact Name"
          className="add-new-company-label"
          rules={[
            {
              required: true,
              message: "Please enter a user name"
            }
          ]}
        >
          <Input
            name="userName"
            className="add-new-company-input"
            placeholder="Enter user name"
          />
        </Form.Item>

        <Form.Item
          name="emailId"
          label="Email ID"
          className="add-new-company-label"
          rules={[
            { type: "email", message: "Please enter a valid email" },
            {
              required: true,
              message: "Please enter an email"
            }
          ]}
        >
          <Input
            name="emailId"
            className="add-new-company-input"
            placeholder="Enter an email id"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddCompanyModal;

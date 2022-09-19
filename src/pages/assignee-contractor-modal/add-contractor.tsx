// react/jsx-no-bind
import { Form, Modal, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./add-contractor.css";

interface AddContractorModalProps {
  onOkClick: Function;
  contractorOptions: any;
  show: boolean;
  onCancelClick: any;
}

function AddContractorModal({
  contractorOptions,
  onOkClick,
  show,
  onCancelClick
}: AddContractorModalProps) {
  const [form] = useForm();

  const handleContractorOk = () => {
    form.validateFields().then((values) => {
      const newContractorData = [...contractorOptions];
      const data = {
        name: values.companyName,
        email: values.emailId
      };
      newContractorData.push(data);
      onOkClick(newContractorData);
    });
  };

  return (
    <Modal
      title="New Contractor"
      visible={show}
      onOk={handleContractorOk}
      onCancel={onCancelClick}
      okText="Invite"
      className="add-new-contractor"
    >
      <Form layout="vertical" name="control-hooks" preserve form={form}>
        <Form.Item
          name="companyName"
          label="Company Name"
          className="add-new-contractor-label"
          rules={[
            {
              required: true,
              message: "Please enter a company name"
            }
          ]}
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
          rules={[
            {
              required: true,
              message: "Please enter a user name"
            }
          ]}
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
            className="add-new-contractor-input"
            placeholder="Enter email id"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddContractorModal;

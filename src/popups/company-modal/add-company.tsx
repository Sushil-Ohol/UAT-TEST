// react/jsx-no-bind
import { Form, Modal, Input, message, Select, Steps, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { assigneesStatus, DropDownData, ErrorMessages } from "constants/index";
import { useState } from "react";
import "./add-company.css";

const { Option } = Select;

const { Step } = Steps;

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
  const isCompanyExists = (companyName: string): boolean => {
    const data = companyOptions.filter(
      (company: any) => company.name === companyName
    );
    if (Object.keys(data).length > 0) {
      return true;
    }
    return false;
  };

  const [form] = useForm();

  const steps = [
    {
      step: 1,
      title: "Details",
      content: (
        <Form
          layout="vertical"
          name="control-hooks"
          preserve={false}
          form={form}
        >
          <Form.Item
            name="companyName"
            label="Company Name"
            className="add-new-company-label"
            rules={[
              {
                required: true,
                message: "Please enter a company name"
              },
              {
                validator: (_, value) =>
                  !value.startsWith(" ")
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("String does not start with space")
                      ),
                message: "String does not start with space"
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
              },
              {
                validator: (_, value) =>
                  !value.startsWith(" ")
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("String does not start with space")
                      ),
                message: "String does not start with space"
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
            <Select
              showSearch
              optionFilterProp="children"
              className="roleSelect"
            >
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
      )
    },
    {
      step: 2,
      title: "Confirm",
      content: (
        <p>
          <b>
            Sending an invite will email instructions to join the project. Once
            they join, they will have access of this project.
          </b>
        </p>
      )
    }
  ];

  const data = {
    companyName: "",
    assigneeEmailId: "",
    assigneeUserName: "",
    assigneeRole: ""
  };
  const [formData, setformData] = useState(data);

  const handleCompanyOk = () => {
    form.validateFields().then(() => {
      if (!isCompanyExists(formData.companyName)) {
        const companyData = {
          name: formData.companyName,
          email: formData.assigneeEmailId,
          assignees: [
            {
              assignedTo: formData.assigneeUserName,
              destination: formData.assigneeRole,
              email: formData.assigneeEmailId,
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

  const [current, setCurrent] = useState(0);

  const next = async () => {
    await form
      .validateFields([
        "companyName",
        "assigneeUserName",
        "assigneeRole",
        "assigneeEmailId"
      ])
      .then((values) => {
        setformData(values);
      });
    setCurrent(current + 1);
  };

  const prev = () => {
    form.setFieldValue("companyName", formData.companyName);
    form.setFieldValue("assigneeUserName", formData.assigneeUserName);
    form.setFieldValue("assigneeRole", formData.assigneeRole);
    form.setFieldValue("assigneeEmailId", formData.assigneeEmailId);

    setCurrent(current - 1);
  };

  return (
    <Modal
      destroyOnClose
      title="New Company"
      visible={show}
      onCancel={onCancelClick}
      footer={null}
      className="add-new-company"
    >
      <div className="companyAssigneeStepper">
        <Steps current={current} labelPlacement="vertical">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button className="cancelBtn" onClick={() => onCancelClick()}>
              Cancel
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button className="nextBtn" type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current > 0 && (
            <Button
              className="backBtn"
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
            >
              Back
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              className="inviteBtn"
              type="primary"
              onClick={() => handleCompanyOk()}
            >
              Invite
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AddCompanyModal;

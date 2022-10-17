// react/jsx-no-bind
import { Form, Modal, message, Steps, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { assigneesStatus } from "constants/index";
import { useState } from "react";
import "./add-company.css";
import CompanyAssigneeForm from "components/company-assignee-form";

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
          <CompanyAssigneeForm isCompanyModal />
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
  const [current, setCurrent] = useState(0);

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
        setformData(data);
        setCurrent(0);
      } else {
        message.error("Company already exists");
      }
    });
  };

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

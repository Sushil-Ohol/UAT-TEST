// react/jsx-no-bind
import { Form, Modal, message, Steps, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./add-assignee.css";
import { assigneesStatus } from "constants/index";
import { useState } from "react";
import CompanyAssigneeForm from "components/company-assignee-form";

const { Step } = Steps;

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
          <CompanyAssigneeForm isCompanyModal={false} />
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

  const data = {
    assigneeEmailId: "",
    assigneeUserName: "",
    assigneeRole: ""
  };
  const [formData, setformData] = useState(data);
  const [current, setCurrent] = useState(0);

  const handleAssigneeOk = () => {
    form.validateFields().then(() => {
      if (!isAssigneeExists(formData.assigneeUserName)) {
        const assigneedata = {
          assignedTo: formData.assigneeUserName,
          destination: formData.assigneeRole,
          email: formData.assigneeEmailId,
          status: assigneesStatus.newAssignee
        };
        onOkClick(assigneedata);
        setformData(data);
        setCurrent(0);
      } else {
        message.error("Assignee already exists for selected company");
      }
    });
  };

  const next = async () => {
    await form
      .validateFields(["assigneeUserName", "assigneeRole", "assigneeEmailId"])
      .then((values) => {
        setformData(values);
      });
    setCurrent(current + 1);
  };

  const prev = () => {
    form.setFieldValue("assigneeUserName", formData.assigneeUserName);
    form.setFieldValue("assigneeRole", formData.assigneeRole);
    form.setFieldValue("assigneeEmailId", formData.assigneeEmailId);
    setCurrent(current - 1);
  };

  return (
    <Modal
      destroyOnClose
      title="New Assignee"
      visible={show}
      onCancel={onCancelClick}
      footer={null}
      className="add-new-assignee"
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
              onClick={() => handleAssigneeOk()}
            >
              Invite
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AddAssigneeModal;

import { Form, Input, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { voidStartingSpaceInput } from "utils/inpututils";
import { DATE_FORMAT_MMDDYYY } from "../../constants";
import "./submittal-log-create.css";

export type SubmittalLog = {
  onCreateClick: any;
  onCancelClick: any;
  gridRef: any;
  submittalList: any;
};

function SubmittalLogCreateComponent(props: SubmittalLog) {
  const { onCreateClick, onCancelClick, gridRef, submittalList } = props;
  const [form] = useForm();

  const isSubmittalIdExists = (submittalId: string): boolean => {
    const data = gridRef.current!.api.getRowNode(submittalId!)?.data || {};
    if (Object.keys(data).length > 0) {
      return true;
    }
    return false;
  };

  const isSubmittalNameExists = (submittal: string): boolean => {
    const index = submittalList.findIndex(
      (item: any) => item.submittal.toLowerCase() === submittal.toLowerCase()
    );
    if (index !== -1) {
      return true;
    }
    return false;
  };
  const onCreateButtonClick = () => {
    form.validateFields().then((values) => {
      if (isSubmittalIdExists(values.submittalId)) {
        message.error("Submittal ID already exists");
      } else if (isSubmittalNameExists(values.submittal)) {
        message.error("Submittal Name already exists");
      } else {
        const data = {
          id: values.submittalId,
          submittal: values.submittal,
          description: values.description || "",
          dueBy: values.dueDate
            ? moment(values.dueDate).format(DATE_FORMAT_MMDDYYY)
            : "",
          company: "",
          assigned: "",
          package: values.package || "",
          dependsOn: values.dependsOn || "",
          status: values.status || ""
        };
        onCreateClick(data);
      }
    });
  };

  return (
    <Form layout="vertical" preserve form={form} className="submittal-create">
      <Form.Item
        name="submittalId"
        label="Submittal ID"
        required
        rules={[{ required: true, message: "Enter submittal id." }]}
      >
        <Input
          className="discriptionArea"
          placeholder="Enter Submittal ID"
          maxLength={40}
          onInput={voidStartingSpaceInput}
        />
      </Form.Item>
      <Form.Item
        name="submittal"
        label="Submittal"
        required
        rules={[{ required: true, message: "Enter submittal title." }]}
      >
        <Input
          className="discriptionArea"
          placeholder="Enter Submittal title"
          maxLength={40}
          onInput={voidStartingSpaceInput}
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea
          className="discriptionArea"
          rows={3}
          placeholder="Fill the Description"
          maxLength={150}
        />
      </Form.Item>
      <section className="mt-2">
        <div id="outerBox">
          <div className="innerBox">
            <Button className="SubEditCancelBtn" onClick={onCancelClick}>
              Cancel
            </Button>
          </div>
          <div className="innerBox">
            <Button
              type="primary"
              className="SubEditApplyBtn"
              onClick={onCreateButtonClick}
            >
              Create
            </Button>
          </div>
        </div>
      </section>
    </Form>
  );
}

export default SubmittalLogCreateComponent;

import { DatePicker, Select, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { DropDownData } from "../../constants";
import "./submittal-create.css";

export type NewSubmittalLog = {
  onApplyClick: any;
  onCancelClick: any;
};

function SubmittalCreateComponent(props: NewSubmittalLog) {
  const { onApplyClick, onCancelClick } = props;
  const [form] = useForm();

  const onApplyButtonClick = () => {
    form.validateFields().then((values) => {
      const data = {
        submittal: values.submittal,
        description: values.description || "",
        dueBy: values.dueDate
          ? moment(values.dueDate).format("DD-MM-YYYY")
          : "",
        contractor: values.contractor || "",
        assigned: values.assignee || "",
        package: values.package || "",
        dependsOn: values.dependsOn || ""
      };
      onApplyClick(data);
    });
  };

  return (
    <Form layout="vertical" preserve form={form}>
      <Form.Item
        name="submittal"
        label="Submittal"
        required
        rules={[{ required: true, message: "Enter submittal title." }]}
      >
        <Input
          className="discriptionArea"
          placeholder="Enter Submittal"
          maxLength={40}
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea
          className="discriptionArea"
          rows={3}
          placeholder="Fill the Discription"
          maxLength={150}
        />
      </Form.Item>

      <Form.Item name="dueDate" label="Due Date">
        <DatePicker className="drawerDatePicker" />
      </Form.Item>

      <Form.Item name="contractor" label="Contractor">
        <Select className="constructionSelect">
          {DropDownData.ContractorOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="assignee" label="Assignee">
        <Select className="assignedSelect">
          {DropDownData.AssigneeOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="package" label="Package">
        <Select className="packageSelect">
          {DropDownData.PackageOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="dependsOn" label="Depends On">
        <Select className="dependsOnSelect">
          <Select.Option key="5" value="5">
            Other
          </Select.Option>
        </Select>
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
              onClick={onApplyButtonClick}
            >
              Apply
            </Button>
          </div>
        </div>
      </section>
    </Form>
  );
}

export default SubmittalCreateComponent;

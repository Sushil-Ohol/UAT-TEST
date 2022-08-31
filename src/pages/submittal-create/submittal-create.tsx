import { DatePicker, Select, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { DropDownData } from "../../constants";
import "./submittal-create.css";

function SubmittalCreateComponent() {
  const [form] = useForm();

  return (
    <Form layout="vertical" preserve form={form}>
      <Form.Item
        name="submittal"
        label="Submittal"
        required
        rules={[{ required: true, message: "Please select Status" }]}
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
    </Form>
  );
}

export default SubmittalCreateComponent;

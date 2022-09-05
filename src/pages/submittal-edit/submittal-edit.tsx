import { Button, Form, Select, DatePicker } from "antd";
import { useForm } from "antd/lib/form/Form";
import { DropDownData } from "../../constants";
import "./submittal-edit.css";

const { Option } = Select;

export type EditSubmittalLogs = {
  onApplyClick: any;
  onCancelClick: any;
};

function SubmittalEdit(props: EditSubmittalLogs) {
  const { onApplyClick, onCancelClick } = props;
  const [form] = useForm();

  const onApplyButtonClick = () => {
    form.validateFields().then((values) => {
      const data = {
        contractor: values.contractor,
        status: values.status,
        assigned: values.assigned,
        dueBy: values.dueBy
      };
      onApplyClick(data);
    });
  };

  return (
    <Form layout="vertical" preserve form={form}>
      <Form.Item name="status" label="Status">
        <Select className="statusSelect">
          {DropDownData.StatusOptions.filter((x) => x !== "All").map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="dueBy" label="Due Date">
        <DatePicker className="drawerDatePicker" />
      </Form.Item>
      <Form.Item name="contractor" label="Contractor">
        <Select className="constructionSelect">
          {DropDownData.ContractorOptions.filter((x) => x !== "All").map(
            (item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item name="assigned" label="Assignee">
        <Select className="constructionSelect">
          {DropDownData.AssigneeOptions.filter((x) => x !== "All").map(
            (item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            )
          )}
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

export default SubmittalEdit;

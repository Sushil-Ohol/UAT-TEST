import { Button, Form, Select, DatePicker } from "antd";
import { useForm } from "antd/lib/form/Form";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "../../constants";
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
      const selectedContractor = DropDownData.ContractorOptions.filter(
        (contractor) => contractor.name === values.contractor
      );
      const assigned = DropDownData.AssigneeOptions.filter(
        (assignee) => assignee.assignedTo === values.assigned
      );
      const data = {
        contractor: selectedContractor[0],
        status: values.status,
        assigned: assigned[0],
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
        <DatePicker format={DATE_FORMAT_MMDDYYY} className="drawerDatePicker" />
      </Form.Item>
      <Form.Item name="contractor" label="Contractor">
        <Select className="constructionSelect">
          {DropDownData.ContractorOptions.filter((x) => x.name !== "All").map(
            (item) => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item name="assigned" label="Assignee">
        <Select className="constructionSelect">
          {DropDownData.AssigneeOptions.filter(
            (x) => x.assignedTo !== "All"
          ).map((item) => (
            <Option key={item.assignedTo} value={item.assignedTo}>
              {item.assignedTo}
            </Option>
          ))}
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

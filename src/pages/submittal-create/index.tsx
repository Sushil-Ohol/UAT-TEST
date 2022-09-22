import { DatePicker, Select, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { RootState } from "store/slices";
import { useAppSelector } from "store";
import { useState } from "react";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "../../constants";
import "./submittal-create.css";

const { Option } = Select;

export type NewSubmittalLog = {
  onApplyClick: any;
  onCancelClick: any;
};

function SubmittalCreateComponent(props: NewSubmittalLog) {
  const { onApplyClick, onCancelClick } = props;
  const [form] = useForm();

  const submittalState = useAppSelector((state: RootState) => state.submittals);

  const [assigneeData, setAssigneeData] = useState<any>(
    submittalState.assignees || []
  );

  const onApplyButtonClick = () => {
    form.validateFields().then((values) => {
      const selectedContractor: any = submittalState.contractors.filter(
        (contractor: any) => contractor.name === values.contractor
      );

      const assigned: any = selectedContractor[0].assignees.filter(
        (assignee: any) => assignee.name === values.assignee
      );

      const data = {
        submittal: values.submittal,
        description: values.description || "",
        dueBy: values.dueDate
          ? moment(values.dueDate).format(DATE_FORMAT_MMDDYYY)
          : "",
        contractor: selectedContractor[0] || "",
        assigned: assigned[0] || "",
        package: values.package || "",
        dependsOn: values.dependsOn || "",
        status: values.status || ""
      };
      onApplyClick(data);
    });
  };

  const onChangeContractor = (contractor: string) => {
    const assignedData = Object.keys(submittalState.assignees)
      .filter((key) => key.includes(contractor))
      .reduce((obj, key) => {
        return submittalState.assignees[key];
      }, {});

    setAssigneeData(Object.values(assignedData));
  };

  return (
    <Form layout="vertical" preserve form={form} className="submittal-create">
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

      <Form.Item name="status" label="Status">
        <Select
          className="select-box"
          bordered={false}
          placeholder="Select Status"
        >
          {DropDownData.StatusOptions.map(
            (item) =>
              item !== "All" && (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              )
          )}
        </Select>
      </Form.Item>

      <Form.Item name="dueDate" label="Due Date">
        <DatePicker format={DATE_FORMAT_MMDDYYY} className="drawerDatePicker" />
      </Form.Item>

      <Form.Item name="contractor" label="Contractor">
        <Select
          onChange={onChangeContractor}
          className="select-box"
          bordered={false}
          placeholder="Select Contractor"
        >
          {submittalState.contractors
            .filter((x) => x.name !== "All")
            .map((item) => (
              <Select.Option key={item.name} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item name="assignee" label="Assignee">
        <Select
          className="select-box"
          bordered={false}
          placeholder="Select Assignee"
        >
          {assigneeData?.length > 0 &&
            assigneeData
              .filter((x: any) => x.assignedTo !== "All")
              .map((item: any) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
        </Select>
      </Form.Item>

      <Form.Item name="dependsOn" label="Depends On">
        <Select
          className="select-box"
          bordered={false}
          placeholder="Select depends on"
        >
          <Select.Option key="other" value="other">
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

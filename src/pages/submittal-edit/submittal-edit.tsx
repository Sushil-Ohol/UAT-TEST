/* eslint-disable react/jsx-no-bind */
import { Button, Form, Select, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "../../constants";
import "./submittal-edit.css";
import AddContractorModal from "./add-contractor";
import AddAssigneeModal from "./add-assignee";

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

  const [assigneeData, setAssigneeData] = useState(
    DropDownData.AssigneeOptions
  );

  const [contractorData, setContractorData] = useState(
    DropDownData.ContractorOptions
  );

  function assigneeUpdate(contractor: any) {
    const assignedData = DropDownData.AssigneeOptions.filter(
      (x) => x.contractor === contractor
    );
    setAssigneeData(assignedData);
  }

  function updateContractorData(object: any) {
    setContractorData(object);
    message.success("Contractor Added Successfully");
  }

  function updateAssigneeData(object: any) {
    setAssigneeData(object);
    message.success("Assignee Added Successfully");
  }

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
      <Form.Item name="contractor">
        <span>
          Contractor
          <AddContractorModal
            ContractorOptions={contractorData}
            onOkClick={updateContractorData}
          />
        </span>
        <Select
          onChange={assigneeUpdate}
          showSearch
          optionFilterProp="children"
          className="constructionSelect"
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {contractorData
            .filter((x) => x.name !== "All")
            .map((item) => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="assigned">
        <span>
          Assignee
          <AddAssigneeModal
            AssigneeOptions={assigneeData}
            onOkClick={updateAssigneeData}
          />
        </span>

        <Select
          className="constructionSelect"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {assigneeData
            .filter((x) => x.assignedTo !== "All")
            .map((item) => (
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

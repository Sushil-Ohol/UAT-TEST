/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { Button, Form, Select, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { AddContractorModal, AddAssigneeModal } from "popups";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "constants/index";
import "./submittal-edit.css";

const { Option } = Select;

export type EditSubmittalLogs = {
  onApplyClick: any;
  onCancelClick: any;
  selectedRows: any;
};

function SubmittalEdit(props: EditSubmittalLogs) {
  const { onApplyClick, onCancelClick, selectedRows } = props;
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

  const [assigneeData, setAssigneeData] = useState<any>(
    DropDownData.AssigneeOptions
  );

  const [contractorData, setContractorData] = useState<any>(
    DropDownData.ContractorOptions
  );

  const [contractorSelected, setContractorSelected] = useState<string>("");

  const [optionArray, setOptionArray] = useState<any>([]);

  const onStatusDropDownChange = () => {
    const confirmationRequired = selectedRows.filter(
      (item: any) => item.status === "Confirmation required"
    );
    const notRequired = selectedRows.filter(
      (item: any) => item.status === "Not required"
    );
    if (confirmationRequired.length > 0) {
      setOptionArray(DropDownData.StatusOptionsForArchitects);
    } else if (notRequired.length > 0) {
      setOptionArray(DropDownData.StatusOptionsForArchitects);
    } else {
      setOptionArray(DropDownData.StatusOptions);
    }
  };

  useEffect(() => {
    onStatusDropDownChange();
  }, [selectedRows]);

  const onChangeContractor = (contractor: string) => {
    const assignedData = DropDownData.AssigneeOptions.filter(
      (x: any) => x.contractor === contractor
    );
    setAssigneeData(assignedData);
    setContractorSelected(contractor);
  };

  const [isContractorModalOpen, setIsContractorModalOpen] =
    useState<boolean>(false);

  const [isAssigneeModalOpen, setIsAssigneeModalOpen] =
    useState<boolean>(false);

  const updateContractorData = (object: any) => {
    setContractorData(object);
    message.success("Contractor Added Successfully");
    setIsContractorModalOpen(false);
  };

  const updateAssigneeData = (object: any) => {
    setAssigneeData(object);
    message.success("Assignee Added Successfully");
    setIsAssigneeModalOpen(false);
  };

  const showContractorModal = () => {
    setIsContractorModalOpen(true);
  };

  const handleContractorCancel = () => {
    setIsContractorModalOpen(false);
  };

  const showAssigneeModal = () => {
    if (contractorSelected !== "") setIsAssigneeModalOpen(true);
  };

  const handleAssigneeCancel = () => {
    setIsAssigneeModalOpen(false);
  };

  return (
    <>
      <Form layout="vertical" preserve form={form}>
        <Form.Item name="status" label="Status">
          <Select className="statusSelect">
            {optionArray.map((item: any) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="dueBy" label="Due Date">
          <DatePicker
            format={DATE_FORMAT_MMDDYYY}
            className="drawerDatePicker"
          />
        </Form.Item>
        <Form.Item
          name="contractor"
          label={
            <span>
              Company{" "}
              <Button
                className="add-new-contractor-btn"
                onClick={showContractorModal}
              >
                + New
              </Button>
            </span>
          }
        >
          <Select
            onChange={onChangeContractor}
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
              .filter((x: any) => x.name !== "All")
              .map((item: any) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="assigned"
          label={
            <span>
              Assignee{" "}
              <Button
                className="add-new-assignee-btn"
                onClick={showAssigneeModal}
              >
                + New
              </Button>
            </span>
          }
        >
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
              .filter((x: any) => x.assignedTo !== "All")
              .map((item: any) => (
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
      <AddContractorModal
        contractorOptions={contractorData}
        onOkClick={updateContractorData}
        show={isContractorModalOpen}
        onCancelClick={handleContractorCancel}
        assigneeOptions={assigneeData}
        saveAssignee={updateAssigneeData}
      />
      <AddAssigneeModal
        assigneeOptions={assigneeData}
        onOkClick={updateAssigneeData}
        show={isAssigneeModalOpen}
        onCancelClick={handleAssigneeCancel}
        selectedContractor={contractorSelected}
      />
    </>
  );
}

export default SubmittalEdit;

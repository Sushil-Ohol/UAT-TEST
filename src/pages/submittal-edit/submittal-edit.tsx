/* eslint-disable react/jsx-no-bind */
import { Button, Form, Select, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { AddContractorModal, AddAssigneeModal } from "popups";
import "./submittal-edit.css";
import { RootState } from "store/slices";
import { useAppDispatch, useAppSelector } from "store";
import { updateContractorState } from "store/slices/submittalsSlices";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "../../constants";

const { Option } = Select;

export type EditSubmittalLogs = {
  onApplyClick: any;
  onCancelClick: any;
};

function SubmittalEdit(props: EditSubmittalLogs) {
  const { onApplyClick, onCancelClick } = props;
  const [form] = useForm();

  const dispatch = useAppDispatch();

  const submittalState = useAppSelector((state: RootState) => state.submittals);

  const [assigneeData, setAssigneeData] = useState<any>();

  const [contractorData, setContractorData] = useState<any>(
    submittalState.contractors
  );

  const onApplyButtonClick = () => {
    form.validateFields().then((values) => {
      const selectedContractor: any = contractorData.filter(
        (contractor: any) => contractor.name === values.contractor
      );

      const assigned: any = selectedContractor[0].assignees.filter(
        (contractor: any) => contractor.name === values.assigned
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

  const [contractorSelected, setContractorSelected] = useState<string>("");

  const onChangeContractor = (contractor: string) => {
    const assignedData = Object.keys(submittalState.assignees)
      .filter((key) => key.includes(contractor))
      .reduce((obj, key) => {
        return submittalState.assignees[key];
      }, {});

    setAssigneeData(Object.values(assignedData));
    setContractorSelected(contractor);
  };

  const [isContractorModalOpen, setIsContractorModalOpen] =
    useState<boolean>(false);

  const [isAssigneeModalOpen, setIsAssigneeModalOpen] =
    useState<boolean>(false);

  const updateContractorData = (object: any) => {
    dispatch(updateContractorState(object));
    setContractorData(object);
    message.success("Contractor & Assignee Added Successfully");
    setIsContractorModalOpen(false);
  };

  const updateAssigneeData = (object: any) => {
    dispatch(updateContractorState(object));
    setContractorData(object);
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
            {DropDownData.StatusOptions.filter((x) => x !== "All").map(
              (item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              )
            )}
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
              Contractor{" "}
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
      />
      <AddAssigneeModal
        assigneeOptions={contractorData}
        onOkClick={updateAssigneeData}
        show={isAssigneeModalOpen}
        onCancelClick={handleAssigneeCancel}
        selectedContractor={contractorSelected}
      />
    </>
  );
}

export default SubmittalEdit;

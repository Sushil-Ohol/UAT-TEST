/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { Button, Form, Select, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { AddContractorModal, AddAssigneeModal } from "popups";
import "./submittal-edit.css";
import { RootState } from "store/slices";
import { useAppDispatch, useAppSelector } from "store";
import { newContractor, newAssignee } from "store/slices/submittalsSlices";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "../../constants";

const { Option } = Select;

export type EditSubmittalLogs = {
  onApplyClick: any;
  onCancelClick: any;
  selectedRows: any;
};

function SubmittalEdit(props: EditSubmittalLogs) {
  const { onApplyClick, onCancelClick, selectedRows } = props;
  const [form] = useForm();

  const dispatch = useAppDispatch();

  const submittalState = useAppSelector((state: RootState) => state.submittals);

  const [contractorSelected, setContractorSelected] = useState<string>(
    submittalState.contractors[0].name
  );

  const [assigneeData, setAssigneeData] = useState<any>(
    submittalState.assignees[contractorSelected].list
  );

  const contractorData = submittalState.contractors;

  // const onApplyButtonClick = () => {
  //   form.validateFields().then((values) => {
  //     const selectedContractor: any = contractorData.filter(
  //       (contractor: any) => contractor.name === values.contractor
  //     );
  //     const assigned: any = selectedContractor[0].assignees.filter(
  //       (contractor: any) => contractor.name === values.assigned
  //     );

  //     const data = {
  //       contractor: selectedContractor[0],
  //       status: values.status,
  //       assigned: assigned[0],
  //       dueBy: values.dueBy
  //     };
  //     onApplyClick(data);
  //   });
  // };

  const onApplyButtonClick = () => {
    form.validateFields().then((values) => {
      const selectedContractor: any = contractorData.filter(
        (contractor: any) => contractor.name === values.contractor
      );
      const assigned: any = selectedContractor[0]?.assignees.filter(
        (contractor: any) => contractor.assignedTo === values.assigned
      );
      const data = {
        contractor: selectedContractor[0],
        status: values.status,
        assigned: assigned ? assigned[0] : "",
        dueBy: values.dueBy
      };
      onApplyClick(data);
    });
  };

  const [optionArray, setOptionArray] = useState<any>([]);

  const onStatusDropDownChange = () => {
    const assignedRequired = selectedRows.filter((item: any) => {
      return (
        item.assigned !== "" &&
        (item.status === "Submittal not required" || item.status === "")
      );
    });

    if (assignedRequired.length > 0) {
      setOptionArray(DropDownData.StatusOptionsForArchitects);
    } else {
      setOptionArray(DropDownData.StatusOptions);
    }
  };

  useEffect(() => {
    onStatusDropDownChange();
  }, [selectedRows]);

  const onChangeContractor = (contractor: string) => {
    const assignedData = Object.keys(submittalState.assignees)
      .filter((key) => key.includes(contractor))
      .reduce((obj, key) => {
        return submittalState.assignees[key];
      }, {});
    setContractorSelected(contractor);
    setAssigneeData(Object.values(assignedData));
    form.setFieldValue("assigned", null);
  };

  const [isContractorModalOpen, setIsContractorModalOpen] =
    useState<boolean>(false);

  const [isAssigneeModalOpen, setIsAssigneeModalOpen] =
    useState<boolean>(false);

  const addNewContractor = (data: any) => {
    dispatch(newContractor(data));
    message.success("Invited contractor and assignee successfully");
    setIsContractorModalOpen(false);
  };

  const addNewAssignee = (data: any) => {
    const payload = { contractorName: contractorSelected, assignee: data };
    dispatch(newAssignee(payload));
    message.success("Invited assignee successfully ");
    setIsAssigneeModalOpen(false);
  };

  const showContractorModal = () => {
    setIsContractorModalOpen(true);
  };

  const handleContractorCancel = () => {
    setIsContractorModalOpen(false);
  };

  const showAssigneeModal = () => {
    if (contractorSelected !== "") {
      setIsAssigneeModalOpen(true);
    } else {
      message.info("Please select company first");
    }
  };

  const handleAssigneeCancel = () => {
    setIsAssigneeModalOpen(false);
  };

  useEffect(() => {
    setAssigneeData(submittalState.assignees[contractorSelected]);
  }, [submittalState]);

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
            {submittalState.contractors
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
              {form.getFieldValue("contractor") && (
                <Button
                  className="add-new-assignee-btn"
                  onClick={showAssigneeModal}
                >
                  + New
                </Button>
              )}
            </span>
          }
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue("contractor") && !value) {
                  return Promise.reject(new Error("Select assignee."));
                }
                return Promise.resolve();
              }
            })
          ]}
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
        onOkClick={addNewContractor}
        show={isContractorModalOpen}
        onCancelClick={handleContractorCancel}
      />
      <AddAssigneeModal
        assigneeOptions={contractorData}
        onOkClick={addNewAssignee}
        show={isAssigneeModalOpen}
        onCancelClick={handleAssigneeCancel}
        selectedContractor={contractorSelected}
      />
    </>
  );
}

export default SubmittalEdit;

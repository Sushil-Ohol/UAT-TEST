/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { Button, Form, Select, DatePicker, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { AddCompanyModal, AddAssigneeModal } from "popups";
import "./submittal-edit.css";
import { RootState } from "store/slices";
import { useAppDispatch, useAppSelector } from "store";
import { newCompany, newAssignee } from "store/slices/submittalsSlices";
import { AssigneeDropdown } from "components";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "constants/index";

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

  const [companieselected, setcompanieselected] = useState<any>(null);

  const [assigneeData, setAssigneeData] = useState<any>(
    companieselected === null
      ? []
      : submittalState.assignees[companieselected].list
  );

  const companyData = submittalState.companies;

  const onApplyButtonClick = () => {
    form.validateFields().then((values) => {
      const selectedCompany: any = companyData.filter(
        (company: any) => company.name === values.company
      );
      const assigned: any = selectedCompany[0]?.assignees.filter(
        (company: any) => company.assignedTo === values.assigned
      );

      const data = {
        company: selectedCompany[0],
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

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);

  const [isAssigneeModalOpen, setIsAssigneeModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    onStatusDropDownChange();
  }, [selectedRows]);

  const onChangeCompany = (company: string) => {
    const assignedData = Object.keys(submittalState.assignees)
      .filter((key) => key.includes(company))
      .reduce((obj, key) => {
        return submittalState.assignees[key];
      }, {});
    setcompanieselected(company);
    setAssigneeData(Object.values(assignedData));
    form.setFieldValue("assigned", null);
  };

  const addNewCompany = (data: any) => {
    dispatch(newCompany(data));
    message.success("Invited company and assignee successfully");
    setIsCompanyModalOpen(false);
    // to do set the newly added companies first assignee to the form field
  };

  const addNewAssignee = (data: any) => {
    const payload = { companyName: companieselected, assignee: data };
    dispatch(newAssignee(payload));
    message.success("Invitation sent to assignee successfully ");
    setIsAssigneeModalOpen(false);
  };

  const showCompanyModal = () => {
    setIsCompanyModalOpen(true);
  };

  const handleCompanyCancel = () => {
    setIsCompanyModalOpen(false);
  };

  const showAssigneeModal = () => {
    if (companieselected !== "") {
      setIsAssigneeModalOpen(true);
    } else {
      message.info("Please select company first");
    }
  };

  const handleAssigneeCancel = () => {
    setIsAssigneeModalOpen(false);
  };

  useEffect(() => {
    setAssigneeData(submittalState.assignees[companieselected]);
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
        <Form.Item name="company" label="Company">
          <Select
            notFoundContent={
              <span>
                No company found, click Add to invite new company
                <Button
                  type="primary"
                  className="NewBtnForOpenMOdal"
                  onClick={showCompanyModal}
                >
                  Add
                </Button>
              </span>
            }
            onChange={onChangeCompany}
            showSearch
            optionFilterProp="children"
            className="constructionSelect"
            filterOption={(input, option) =>
              (option!.key as unknown as string)
                .toLowerCase()
                .includes(input.toString().toLowerCase())
            }
          >
            {submittalState.companies
              .filter((x: any) => x.name !== "All")
              .map((item: any) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <AssigneeDropdown
          name="assigned"
          title="Assignee"
          showNewButton
          form={form}
          data={assigneeData}
          showModal={showAssigneeModal}
        />

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
      <AddCompanyModal
        companyOptions={companyData}
        onOkClick={addNewCompany}
        show={isCompanyModalOpen}
        onCancelClick={handleCompanyCancel}
      />
      <AddAssigneeModal
        assigneeOptions={companyData}
        onOkClick={addNewAssignee}
        show={isAssigneeModalOpen}
        onCancelClick={handleAssigneeCancel}
        selectedCompany={companieselected}
      />
    </>
  );
}

export default SubmittalEdit;

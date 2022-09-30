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

  const [companySelected, setCompanySelected] = useState<any>(null);

  const [assigneeData, setAssigneeData] = useState<any>(
    companySelected === null
      ? []
      : submittalState.assignees[companySelected].list
  );

  const companyData = submittalState.companys;

  // const onApplyButtonClick = () => {
  //   form.validateFields().then((values) => {
  //     const selectedCompany: any = companyData.filter(
  //       (company: any) => company.name === values.company
  //     );
  //     const assigned: any = selectedCompany[0].assignees.filter(
  //       (company: any) => company.name === values.assigned
  //     );

  //     const data = {
  //       company: selectedCompany[0],
  //       status: values.status,
  //       assigned: assigned[0],
  //       dueBy: values.dueBy
  //     };
  //     onApplyClick(data);
  //   });
  // };

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

  useEffect(() => {
    onStatusDropDownChange();
  }, [selectedRows]);

  const onChangeCompany = (company: string) => {
    const assignedData = Object.keys(submittalState.assignees)
      .filter((key) => key.includes(company))
      .reduce((obj, key) => {
        return submittalState.assignees[key];
      }, {});
    setCompanySelected(company);
    setAssigneeData(Object.values(assignedData));
    form.setFieldValue("assigned", null);
  };

  const [isCompanyModalOpen, setIsCompanyModalOpen] =
    useState<boolean>(false);

  const [isAssigneeModalOpen, setIsAssigneeModalOpen] =
    useState<boolean>(false);

  const addNewCompany = (data: any) => {
    dispatch(newCompany(data));
    message.success("Invited company and assignee successfully");
    setIsCompanyModalOpen(false);
  };

  const addNewAssignee = (data: any) => {
    const payload = { companyName: companySelected, assignee: data };
    dispatch(newAssignee(payload));
    message.success("Invited assignee successfully ");
    setIsAssigneeModalOpen(false);
  };

  const showCompanyModal = () => {
    setIsCompanyModalOpen(true);
  };

  const handleCompanyCancel = () => {
    setIsCompanyModalOpen(false);
  };

  const showAssigneeModal = () => {
    if (companySelected !== "") {
      setIsAssigneeModalOpen(true);
    } else {
      message.info("Please select company first");
    }
  };

  const handleAssigneeCancel = () => {
    setIsAssigneeModalOpen(false);
  };

  useEffect(() => {
    setAssigneeData(submittalState.assignees[companySelected]);
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
          name="company"
          label={
            <span>
              Company{" "}
              <Button
                className="add-new-company-btn"
                onClick={showCompanyModal}
              >
                + New
              </Button>
            </span>
          }
        >
          <Select
            onChange={onChangeCompany}
            showSearch
            optionFilterProp="children"
            className="constructionSelect"
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {submittalState.companys
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
              {form.getFieldValue("company") && (
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
                if (getFieldValue("company") && !value) {
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
        selectedCompany={companySelected}
      />
    </>
  );
}

export default SubmittalEdit;

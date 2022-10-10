/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "antd/lib/typography/Link";
// import React from "react";
import "./submittal-details.css";
import { DependsOn, SubmittalLog } from "models/submittal-log";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import { ClearIcon, PlusIcon } from "components/svg-icons";
import { ConversationDoc } from "models/discussion";
import { PostProjectFile } from "services/projects-service";
import { AttachmentConfirmationModal } from "popups";
import { updateField, updateSubmittal } from "store/slices/submittalsSlices";
import { SelectOption } from "components";
import ConfirmationModal from "popups/submittal-details-confirmation-modal";
import { DropDownData } from "constants/index";
import SearchDropdown from "./search-dropdown";
import SelectField from "./select-field";
import DateField from "./date-field";

const { Option } = Select;

export type SubmittalDetailsProps = {
  submittalData: SubmittalLog;
  docs: ConversationDoc[];
  submittalTitle: string;
  handleDocuments: any;
};
function SubmitalDetails(props: SubmittalDetailsProps) {
  const { submittalData, docs, submittalTitle, handleDocuments } = props;

  const dispatch = useAppDispatch();
  const [updatedData, setUpdatedData] = useState<SubmittalLog>(submittalData);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const companyOptions = useAppSelector((state) => state.submittals.companies);
  const assigneeOption: any = useAppSelector(
    (state) => state.submittals.assignees
  );
  const [selectedDepends, setSelectedDepends] = useState<DependsOn>();
  const [showAttachDocConfirmModal, setShowAttachDocConfirmModal] =
    useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<any>();
  const [isOnlyStatusChange, setIsOnlyStatusChange] = useState<boolean>(false);
  const [isCompanyAssigneeChange, setIsCompanyAssigneeChange] =
    useState<boolean>(false);
  const [isAllFieldsChange, setIsAllFieldsChange] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const submittalsList = useAppSelector(
    (state: RootState) => state.submittals.list
  );

  const onlySubmittalsTitleId = submittalsList.map<DependsOn>(
    (data: SubmittalLog) => ({
      submittalId: data.id.toString(),
      submittal: data.submittal
    })
  );

  const [statusOptions, setStatusOptions] = useState<any>([]);
  const onStatusDropDownChange = () => {
    if (
      Object.keys(updatedData.assigned).length > 0 &&
      (updatedData.status === "Submittal not required" ||
        updatedData.status === "")
    ) {
      setStatusOptions(DropDownData.StatusOptionsForArchitects);
    } else if (updatedData.status === "Submittal not required") {
      setStatusOptions(DropDownData.StatusOptionsForArchitects);
    } else {
      setStatusOptions(DropDownData.StatusOptions);
    }
  };

  const onSubmittalSearch = (id: any) => {
    const selectedData = onlySubmittalsTitleId.find(
      (data) => data.submittalId === id
    );
    setSelectedDepends(selectedData);
  };

  useEffect(() => {
    dispatch(
      updateField({
        submittalId: updatedData.id,
        field: "dependsOn",
        value: updatedData.dependsOn
      })
    );
  }, [updatedData.dependsOn]);

  useEffect(() => {
    setUpdatedData((prev: SubmittalLog) => {
      return prev
        ? {
            ...prev,
            submittal: submittalTitle !== "" ? submittalTitle : prev.submittal
          }
        : prev;
    });
  }, [submittalTitle]);

  const addDependent = () => {
    if (selectedDepends?.submittal === "") {
      message.error("Please select depend on");
    } else {
      setUpdatedData((prev: SubmittalLog) => {
        if (prev.dependsOn.length > 0) {
          const result = prev.dependsOn.some(
            (value: DependsOn) =>
              value.submittalId === selectedDepends?.submittalId.toString()
          );
          if (result) {
            message.error("Submittal already exist");
          } else {
            return prev && selectedDepends
              ? { ...prev, dependsOn: [...prev.dependsOn, selectedDepends] }
              : prev;
          }
        } else {
          return prev && selectedDepends
            ? { ...prev, dependsOn: [...prev.dependsOn, selectedDepends] }
            : prev;
        }
        return prev;
      });
    }
    setSelectedDepends({ submittalId: "", submittal: "" });
  };

  const removeDependent = (id: string) => {
    if (updatedData) {
      const updatedDependent = updatedData.dependsOn.filter(
        (data) => data.submittalId !== id
      );
      setUpdatedData((prev: SubmittalLog) => {
        return prev ? { ...prev, dependsOn: updatedDependent } : prev;
      });
    }
  };

  const removeDocs = (id: string) => {
    if (updatedData) {
      const updatedDependent = updatedData.docs?.filter(
        (data) => data.id !== id
      );
      setUpdatedData((prev: SubmittalLog) => {
        return prev ? { ...prev, docs: updatedDependent } : prev;
      });
      handleDocuments("Remove", { id });
    }
  };

  const onChangeCompany = (name: string) => {
    const selectedCompany = companyOptions.find((data) => data.name === name);

    setUpdatedData((prev: SubmittalLog) => {
      return prev
        ? {
            ...prev,
            company: selectedCompany || prev.company,
            assigned: selectedCompany
              ? { assignedTo: "", destination: "" }
              : prev.assigned
          }
        : prev;
    });
    setIsCompanyAssigneeChange(true);
  };

  const onChangeAssignee = (assignedTo: string) => {
    const selectedAssignee = assigneeOption[
      updatedData && updatedData.company.name
    ].find((data: any) => data.assignedTo === assignedTo);

    setUpdatedData((prev: SubmittalLog) => {
      return prev
        ? {
            ...prev,
            assigned: selectedAssignee
              ? {
                  assignedTo: selectedAssignee.assignedTo,
                  destination: selectedAssignee.destination
                }
              : prev.assigned
          }
        : prev;
    });
    setIsCompanyAssigneeChange(true);
  };

  useEffect(() => {
    onStatusDropDownChange();
  }, [updatedData]);

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const onCompanyAssigneeChange = () => {
    dispatch(updateSubmittal(updatedData));
    message.success("Data successfully updated");
    setShowConfirmationModal(false);
    setIsOnlyStatusChange(false);
    setIsCompanyAssigneeChange(false);
  };

  const onStatusChange = () => {
    dispatch(updateSubmittal(updatedData));
    message.success("Status updated successfully");
    setShowConfirmationModal(false);
    setIsOnlyStatusChange(false);
  };

  const saveSubmittal = () => {
    if (isOnlyStatusChange && !isCompanyAssigneeChange && !isAllFieldsChange) {
      setShowConfirmationModal(true);
    } else if (
      (isOnlyStatusChange || isCompanyAssigneeChange) &&
      !isAllFieldsChange
    ) {
      setShowConfirmationModal(true);
    } else if (
      !isOnlyStatusChange &&
      !isCompanyAssigneeChange &&
      !isAllFieldsChange
    ) {
      message.warning("Please change any data first to update");
    } else {
      dispatch(updateSubmittal(updatedData));
      message.success("Data successfully updated");
      setIsCompanyAssigneeChange(false);
      setIsOnlyStatusChange(false);
      setIsAllFieldsChange(false);
    }
  };

  function DependsOnSection() {
    return (
      <div
        style={{
          overflowY: "auto",
          height: "12.28vh",
          width: "100%"
        }}
      >
        {updatedData?.dependsOn
          ? updatedData.dependsOn.map((data) => {
              return (
                <Row className="dependsOnRowData">
                  <Col span={22} style={{ display: "flex" }}>
                    <Space>
                      <span>{data.submittalId}</span>
                      <span>{data.submittal}</span>
                    </Space>
                  </Col>
                  <Col
                    span={1}
                    offset={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Button
                      className="add-new-column-btn"
                      onClick={() => removeDependent(data.submittalId)}
                    >
                      <ClearIcon />
                    </Button>
                  </Col>
                </Row>
              );
            })
          : null}
      </div>
    );
  }

  const getDroppedDocument = (event: any) => {
    event.preventDefault();
    const jsonData = event.dataTransfer.getData("application/json");
    const data = JSON.parse(jsonData);

    if (data) {
      setSelectedDocument(data);
      setShowAttachDocConfirmModal(true);
    }
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
  };

  function DocumentSection() {
    return (
      <div
        style={{
          overflowY: "auto",
          height: "27.34vh",
          width: "100%"
        }}
        onDrop={(e) => getDroppedDocument(e)}
        onDragOver={onDragOver}
      >
        {docs
          ? docs.map((data: ConversationDoc) => {
              return (
                <Row className="dependsOnRowData">
                  <Col span={22} style={{ display: "flex" }}>
                    <Space>
                      <span>{data.fileName}</span>
                    </Space>
                  </Col>
                  <Col
                    span={1}
                    offset={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Button
                      className="add-new-column-btn"
                      onClick={() => removeDocs(data.id)}
                    >
                      <ClearIcon />
                    </Button>
                  </Col>
                </Row>
              );
            })
          : null}
      </div>
    );
  }
  const addDocument = (info: any) => {
    const newdoc: ConversationDoc = {
      fileName: info.name,
      annotationCount: 3,
      id: info.uid,
      uploadDate: new Date(),
      uploadedBy: "john",
      uploadDocument: true,
      url: URL.createObjectURL(info)
    };
    handleDocuments("Add", newdoc);
  };
  const fileUploadRequest = async ({ file, onSuccess }: any) => {
    setFileLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "title");
    const result = await PostProjectFile(formData, null);
    if ((await result.data).data.success) {
      onSuccess("ok");
      addDocument(file);
      setFileLoading(false);
    }
  };

  const attachDocument = () => {
    if (selectedDocument) {
      const newDoc: ConversationDoc = {
        fileName: selectedDocument.fileName,
        annotationCount: selectedDocument.annotationCount,
        id: selectedDocument.id,
        uploadDate: selectedDocument.uploadDate,
        uploadedBy: selectedDocument.uploadedBy,
        url: selectedDocument.url,
        uploadDocument: true
      };
      handleDocuments("Add", newDoc);
      setShowAttachDocConfirmModal(false);
    }
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <div className="detailsContent">
        <Space direction="vertical" size={30} style={{ display: "flex" }}>
          <Row justify="space-between">
            <Col span={4}>
              <SelectField
                title="COMPANY"
                value={updatedData ? updatedData.company.name : undefined}
                onChange={onChangeCompany}
                showSearch
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {companyOptions.map((item: any) => (
                  <Option key={item.name} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </SelectField>
            </Col>
            <Col span={4}>
              <SelectField
                title="ASSIGNED"
                value={
                  updatedData ? updatedData.assigned.assignedTo : undefined
                }
                onChange={onChangeAssignee}
                showSearch
                filterOption={(input, option) =>
                  (option!.key as unknown as string)
                    .toLowerCase()
                    .includes(input.toString().toLowerCase())
                }
              >
                {updatedData?.company.name in assigneeOption &&
                  assigneeOption[updatedData?.company.name].map((item: any) => (
                    <Option key={item.assignedTo} value={item.assignedTo}>
                      {/* {item.assignedTo} */}
                      <SelectOption item={item} />
                    </Option>
                  ))}
              </SelectField>
            </Col>
            <Col span={4}>
              <SelectField
                title="STATUS"
                value={updatedData ? updatedData.status : undefined}
                onChange={(data) => {
                  setUpdatedData((prev: SubmittalLog) => {
                    return prev ? { ...prev, status: data } : prev;
                  });
                  setIsOnlyStatusChange(true);
                }}
                showSearch={false}
                filterOption
              >
                {statusOptions.map((data: any) => (
                  <Option key={data}>{data}</Option>
                ))}
              </SelectField>
            </Col>
            <Col span={4}>
              <DateField
                title="DUE BY"
                value={updatedData?.dueBy}
                onChange={(data) => {
                  setUpdatedData((prev: SubmittalLog) => {
                    return prev
                      ? {
                          ...prev,
                          dueBy: data
                            ? moment(data).format("MM-DD-YYYY")
                            : prev.dueBy
                        }
                      : prev;
                  });
                  setIsAllFieldsChange(true);
                }}
              />
            </Col>
            <Col span={4}>
              <DateField
                title="GOVERNING DATE"
                value={updatedData?.governingDate}
                onChange={(data) => {
                  setUpdatedData((prev: SubmittalLog) => {
                    return prev
                      ? {
                          ...prev,
                          governingDate: data
                            ? moment(data).format("MM-DD-YYYY")
                            : prev.governingDate
                        }
                      : prev;
                  });
                  setIsAllFieldsChange(true);
                }}
              />
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={14}>
              <Row>
                <Col span={24}>
                  <p className="heading">DESCRIPTION</p>
                  <TextArea
                    className="description"
                    rows={3}
                    placeholder="Fill the Description"
                    value={updatedData?.description}
                    onChange={(data) => {
                      setUpdatedData((prev: SubmittalLog) => {
                        return prev
                          ? { ...prev, description: data.target.value }
                          : prev;
                      });
                      setIsAllFieldsChange(true);
                    }}
                  />
                </Col>
                <Col
                  span={24}
                  style={{ marginTop: "2.93vh", height: "16.31vh" }}
                >
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Col span={8}>
                      <span className="heading">DEPENDS ON</span>
                    </Col>
                    <Col span={5} offset={10}>
                      <SearchDropdown
                        placeholder="Search"
                        data={onlySubmittalsTitleId}
                        onSelect={onSubmittalSearch}
                        selectedValue={selectedDepends?.submittalId || ""}
                      />
                    </Col>
                    <Col span={1}>
                      <Button
                        className="add-new-column-btn"
                        onClick={addDependent}
                      >
                        <PlusIcon />
                      </Button>
                    </Col>
                  </Row>
                  <DependsOnSection />
                </Col>
              </Row>
            </Col>
            <Col span={9} offset={1}>
              <Row
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Col span={4}>
                  <p className="heading">ATTACHMENTS</p>
                </Col>
                <Col span={6} offset={12}>
                  {/* <SearchDropdown
                    placeholder="Search"
                    data={onlySubmittalsTitleId}
                    onSelect={onSubmittalSearch}
                  /> */}
                </Col>
                <Col span={2}>
                  <Upload
                    showUploadList={false}
                    customRequest={fileUploadRequest}
                    // onChange={(info) => addDocument(info)}
                  >
                    <Button className="add-new-column-btn">
                      {fileLoading ? <Spin size="small" /> : <PlusIcon />}
                    </Button>
                  </Upload>
                </Col>
              </Row>
              <DocumentSection />
            </Col>
          </Row>
        </Space>
      </div>
      <ConfirmationModal
        onClick={saveSubmittal}
        isCompanyAssigneeChange={isCompanyAssigneeChange}
        showConfirmationModal={showConfirmationModal}
        onStatusChange={onStatusChange}
        onCompanyAssigneeChange={onCompanyAssigneeChange}
        onCancel={handleCancel}
        updatedData={updatedData}
      />
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="actionItemCard"
      >
        <Col
          span={24}
          style={{
            marginBottom: "1.95vh",
            height: "2.05vh",
            padding: "0px"
          }}
        >
          <ExclamationCircleOutlined />
          &nbsp;
          <span className="subDetailsAction">Action items</span>
        </Col>
        <Col
          span={24}
          style={{
            marginBottom: "1.37vh",
            height: "1.95vh",
            padding: "0px"
          }}
        >
          <Checkbox className="actionItemsCheckBox">
            You received 2 new discussion
          </Checkbox>
          <Link href="#abc" className="respondLink">
            Respond →
          </Link>
        </Col>
        <Col
          span={24}
          style={{
            marginBottom: "1.37vh",
            height: "1.95vh",
            padding: "0px"
          }}
        >
          <Checkbox className="actionItemsCheckBox">
            This Submittal Received 3 New Submissions
          </Checkbox>
          <Link href="#abc" className="footerLink">
            Review →
          </Link>
        </Col>
        <Col span={24} style={{ height: "1.95vh", padding: "0px" }}>
          <Checkbox className="actionItemsCheckBox">
            This Submittal overdue by 20 days
          </Checkbox>
          <Link href="#abc" className="footerLink">
            Send an email
          </Link>
        </Col>
      </Row>
      <AttachmentConfirmationModal
        isModalOpen={showAttachDocConfirmModal}
        setIsModalOpen={setShowAttachDocConfirmModal}
        handleOk={attachDocument}
        type="Submittal details"
      />
    </div>
  );
}

export default SubmitalDetails;

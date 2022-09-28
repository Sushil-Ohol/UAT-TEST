/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  //   ArrowRightOutlined,
  ExclamationCircleOutlined
  //   ReloadOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row, Select, Space, Spin, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "antd/lib/typography/Link";
// import React from "react";
import "./submittal-details.css";
import { DependsOn, SubmittalLog } from "models/submittal-log";
import moment from "moment";
import { useAppSelector } from "store";
import { RootState } from "store/slices";
import { ClearIcon, PlusIcon } from "components/svg-icons";
import { ConversationDoc } from "models/discussion";
import { PostProjectFile } from "services/projects-service";
import { DropDownData } from "../../constants";
import SearchDropdown from "./search-dropdown";
import SelectField from "./select-field";
import DateField from "./date-field";

const { Option } = Select;

export type SubmittalDetailsProps = {
  submittalData: SubmittalLog;
  onChangeSubmittalData: (data: SubmittalLog) => void;
  docs: ConversationDoc[];
  handleDocuments: any;
};
function SubmitalDetails(props: SubmittalDetailsProps) {
  const { submittalData, onChangeSubmittalData, docs, handleDocuments } = props;

  const [updatedData, setUpdatedData] = useState<SubmittalLog>(submittalData);

  const [fileLoading, setFileLoading] = useState<boolean>(false);

  const [selectedDepends, setSelectedDepends] = useState<DependsOn>();
  const submittalsList = useAppSelector(
    (state: RootState) => state.submittals.list
  );

  const onlySubmittalsTitleId = submittalsList.map<DependsOn>(
    (data: SubmittalLog) => ({
      submittalId: data.id,
      submittal: data.submittal
    })
  );

  const onSubmittalSearch = (id: any) => {
    const selectedData = onlySubmittalsTitleId.find(
      (data) => data.submittalId === id
    );
    setSelectedDepends(selectedData);
  };

  const addDependent = () => {
    setUpdatedData((prev: SubmittalLog) => {
      return prev && selectedDepends
        ? { ...prev, dependsOn: [...prev.dependsOn, selectedDepends] }
        : prev;
    });
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

  const onChangeContractor = (name: string) => {
    const selectedContractor = DropDownData.ContractorOptions.find(
      (data) => data.name === name
    );

    setUpdatedData((prev: SubmittalLog) => {
      return prev
        ? {
            ...prev,
            contractor: selectedContractor || prev.contractor,
            assigned: selectedContractor
              ? { assignedTo: "", destination: "" }
              : prev.assigned
          }
        : prev;
    });
  };

  const onChangeAssignee = (assignedTo: string) => {
    const selectedAssignee = DropDownData.AssigneeOptions.find(
      (data) => data.assignedTo === assignedTo
    );

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
  };

  useEffect(() => {
    if (updatedData) onChangeSubmittalData(updatedData);
  }, [updatedData]);

  function DependsOnSection() {
    return (
      <div
        style={{
          overflowY: "scroll",
          height: "169px",
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

  function DocumentSection() {
    return (
      <div
        style={{
          overflowY: "scroll",
          height: "322px",
          width: "100%"
        }}
      >
        {docs
          ? docs.map((data: ConversationDoc) => {
              return (
                <Row
                  style={{
                    padding: "4px 11px",
                    border: "1px solid #00000033",
                    margin: "10px 0"
                  }}
                >
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

  const fileUploadRequest = async ({ file, onSuccess }: any) => {
    setFileLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "title");
    const result = await PostProjectFile(formData, null);
    if ((await result.data).data.success) {
      onSuccess("ok");
    }
  };

  const addDocument = (info: any) => {
    if (info.file.status === "done") {
      setFileLoading(false);
      const newdoc: ConversationDoc = {
        fileName: info.file.name,
        annotationCount: 3,
        id: info.file.uid,
        uploadDate: new Date(),
        uploadedBy: "john",
        url: "sd"
      };
      handleDocuments("Add", newdoc);
    }
  };

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <div className="detailsContent">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row justify="space-between">
            <Col span={4}>
              <SelectField
                title="STATUS"
                value={updatedData ? updatedData.status : undefined}
                onChange={(data) =>
                  setUpdatedData((prev: SubmittalLog) => {
                    return prev ? { ...prev, status: data } : prev;
                  })
                }
                showSearch={false}
                filterOption
              >
                {DropDownData.StatusOptions.map((data) => (
                  <Option key={data}>{data}</Option>
                ))}
              </SelectField>
            </Col>
            <Col span={4}>
              <DateField
                title="DUE BY"
                value={updatedData?.dueBy}
                onChange={(data) =>
                  setUpdatedData((prev: SubmittalLog) => {
                    return prev
                      ? {
                          ...prev,
                          dueBy: data
                            ? moment(data).format("MM-DD-YYYY")
                            : prev.dueBy
                        }
                      : prev;
                  })
                }
              />
            </Col>
            <Col span={4}>
              <SelectField
                title="COMPANY"
                value={updatedData ? updatedData.contractor.name : undefined}
                onChange={onChangeContractor}
                showSearch
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {DropDownData.ContractorOptions.map((item: any) => (
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
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {DropDownData.AssigneeOptions.filter(
                  (data) => data.contractor === updatedData?.contractor.name
                ).map((item) => (
                  <Option key={item.assignedTo} value={item.assignedTo}>
                    {item.assignedTo}
                  </Option>
                ))}
              </SelectField>
            </Col>
            <Col span={4}>
              <DateField
                title="GOVERNING DATE"
                value={updatedData?.governingDate}
                onChange={(data) =>
                  setUpdatedData((prev: SubmittalLog) => {
                    return prev
                      ? {
                          ...prev,
                          governingDate: data
                            ? moment(data).format("MM-DD-YYYY")
                            : prev.governingDate
                        }
                      : prev;
                  })
                }
              />
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={14}>
              <Row>
                <Col span={24}>
                  <p className="heading">DISCRIPTION</p>
                  <TextArea
                    className="description"
                    rows={3}
                    placeholder="Fill the Discription"
                    value={updatedData?.description}
                    maxLength={400}
                    onChange={(data) =>
                      setUpdatedData((prev: SubmittalLog) => {
                        return prev
                          ? { ...prev, description: data.target.value }
                          : prev;
                      })
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: "15px" }}>
                  <Row
                    style={{
                      margin: "10px 0",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Col span={8}>
                      <span className="heading">DEPENDS ON</span>
                      <span
                        style={{
                          textAlign: "left",
                          font: "normal normal normal 14px/17px Inter",
                          letterSpacing: "0px",
                          color: "#FF3535",
                          opacity: 1,
                          marginLeft: "14px"
                        }}
                      >
                        Blocked
                      </span>
                    </Col>
                    <Col span={5} offset={10}>
                      <SearchDropdown
                        placeholder="Search"
                        data={onlySubmittalsTitleId}
                        onSelect={onSubmittalSearch}
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
                  margin: "10px 0",
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
                    onChange={(info) => addDocument(info)}
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

      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="actionItemCard"
      >
        <Col span={24} style={{ marginBottom: "20px" }}>
          <ExclamationCircleOutlined className="SDExcCircleOutlined" />
          &nbsp;
          <span className="subDetailsAction">Action items</span>
        </Col>
        <Col span={24} style={{ marginBottom: "14px" }}>
          <Checkbox className="actionItemsCheckBox">
            You Recevied 2 new discussion
          </Checkbox>
          <Link href="#abc" className="respondLink">
            Respond →
          </Link>
        </Col>
        <Col span={24} style={{ marginBottom: "14px" }}>
          <Checkbox className="actionItemsCheckBox">
            This Submittal Recived 3 New Submissions
          </Checkbox>
          <Link href="#abc" className="footerLink">
            Review →
          </Link>
        </Col>
        <Col span={24} style={{ marginBottom: "14px" }}>
          <Checkbox className="actionItemsCheckBox">
            This Submittal overdue by 20 days
          </Checkbox>
          <Link href="#abc" className="footerLink">
            Send an email
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default SubmitalDetails;

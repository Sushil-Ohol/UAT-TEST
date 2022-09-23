/* eslint-disable react-hooks/exhaustive-deps */
import {
  //   ArrowRightOutlined,
  ExclamationCircleOutlined
  //   ReloadOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Upload
} from "antd";
import TextArea from "antd/lib/input/TextArea";
// import React from "react";
import "./submittal-details.css";
import { DependsOn, SubmittalLog } from "models/submittal-log";
import moment from "moment";
import { useAppSelector } from "store";
import { RootState } from "store/slices";
import { ClearIcon, PlusIcon } from "components/svg-icons";
import { DropDownData } from "../../constants";
import SearchDropdown from "./search-dropdown";

const { Option } = Select;

function SubmitalDetails(props: {
  submittalData: SubmittalLog | null;
  onChangeSubmittalData: (data: SubmittalLog) => void;
}) {
  const { submittalData, onChangeSubmittalData } = props;
  const [updatedData, setUpdatedData] = useState<SubmittalLog | null>(null);
  const [selectedDepends, setSelectedDepends] = useState<DependsOn>();
  const submittalsList = useAppSelector(
    (state: RootState) => state.submittals.list
  );

  useEffect(() => {
    // if(submittalData)
    setUpdatedData(submittalData);
  }, [submittalData]);

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
    setUpdatedData((prev: SubmittalLog | null) => {
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
      setUpdatedData((prev: SubmittalLog | null) => {
        return prev ? { ...prev, dependsOn: updatedDependent } : null;
      });
    }
  };

  // const addDocs = () => {
  //   setUpdatedData((prev: SubmittalLog | null) => {
  //     return prev && selectedDepends
  //       ? { ...prev, docs: [...prev.docs, selectedDepends] }
  //       : prev;
  //   });
  // };

  const removeDocs = (id: string) => {
    if (updatedData) {
      const updatedDependent = updatedData.docs.filter(
        (data) => data.id !== id
      );
      setUpdatedData((prev: SubmittalLog | null) => {
        return prev ? { ...prev, docs: updatedDependent } : null;
      });
    }
  };

  const onChangeContractor = (name: string) => {
    const selectedContractor = DropDownData.ContractorOptions.find(
      (data) => data.name === name
    );

    setUpdatedData((prev: SubmittalLog | null) => {
      return prev
        ? {
            ...prev,
            contractor: selectedContractor || prev.contractor,
            assigned: selectedContractor
              ? { assignedTo: "", destination: "" }
              : prev.assigned
          }
        : null;
    });
  };

  const onChangeAssignee = (assignedTo: string) => {
    const selectedAssignee = DropDownData.AssigneeOptions.find(
      (data) => data.assignedTo === assignedTo
    );

    setUpdatedData((prev: SubmittalLog | null) => {
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
        : null;
    });
  };

  useEffect(() => {
    if (updatedData) onChangeSubmittalData(updatedData);
  }, [updatedData]);
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
          position: "relative",
          top: "0px"
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row justify="space-between">
            <Col span={4}>
              <p className="HedingColor">STATUS</p>
              <Select
                className="selectStyle"
                value={updatedData ? updatedData.status : undefined}
                onChange={(data) =>
                  setUpdatedData((prev: SubmittalLog | null) => {
                    return prev ? { ...prev, status: data } : null;
                  })
                }
              >
                {DropDownData.StatusOptions.map((data) => (
                  <Option key={data}>{data}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <div>
                <p className="HedingColor" style={{ float: "left" }}>
                  DUE BY
                </p>
                <p className="validationColor" style={{ float: "right" }}>
                  {updatedData?.dueBy
                    ? moment(updatedData.dueBy).fromNow()
                    : null}
                </p>
              </div>

              <DatePicker
                style={{ width: "100%", backgroundColor: "#0000000D" }}
                format="MM-DD-YYYY"
                value={
                  updatedData?.dueBy
                    ? moment(updatedData.dueBy, "MM-DD-YYYY")
                    : undefined
                }
                onChange={(data) =>
                  setUpdatedData((prev: SubmittalLog | null) => {
                    return prev
                      ? {
                          ...prev,
                          dueBy: data
                            ? moment(data).format("MM-DD-YYYY")
                            : prev.dueBy
                        }
                      : null;
                  })
                }
              />
            </Col>
            <Col span={4}>
              <p className="HedingColor">CONTRACTOR</p>
              <Select
                className="selectStyle"
                onChange={onChangeContractor}
                showSearch
                optionFilterProp="children"
                value={updatedData ? updatedData.contractor.name : null}
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
              </Select>
            </Col>
            <Col span={4}>
              <p className="HedingColor">ASSIGNED</p>
              <Select
                className="selectStyle"
                onChange={onChangeAssignee}
                showSearch
                optionFilterProp="children"
                value={updatedData ? updatedData.assigned.assignedTo : null}
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
              </Select>
            </Col>
            <Col span={4}>
              <div>
                <p className="HedingColor" style={{ float: "left" }}>
                  GOVERNING DATE
                </p>
                <p className="validationColor" style={{ float: "right" }}>
                  {updatedData?.governingDate
                    ? moment(updatedData?.governingDate).fromNow()
                    : null}
                </p>
              </div>

              <DatePicker
                style={{ width: "100%", backgroundColor: "#0000000D" }}
                format="MM-DD-YYYY"
                value={
                  updatedData?.governingDate
                    ? moment(updatedData?.governingDate, "MM-DD-YYYY")
                    : undefined
                }
                onChange={(data) =>
                  setUpdatedData((prev: SubmittalLog | null) => {
                    return prev
                      ? {
                          ...prev,
                          governingDate: data
                            ? moment(data).format("MM-DD-YYYY")
                            : prev.governingDate
                        }
                      : null;
                  })
                }
              />
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={14}>
              <Row>
                <Col span={24}>
                  <p className="HedingColor">DISCRIPTION</p>
                  <TextArea
                    style={{ backgroundColor: "#0000000D" }}
                    rows={3}
                    placeholder="Fill the Discription"
                    value={updatedData?.description}
                    maxLength={400}
                    onChange={(data) =>
                      setUpdatedData((prev: SubmittalLog | null) => {
                        return prev
                          ? { ...prev, description: data.target.value }
                          : null;
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
                    <Col span={4}>
                      <p className="HedingColor">DEPENDS ON Block</p>
                    </Col>
                    <Col span={5} offset={14}>
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
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "250px",
                      width: "100%"
                    }}
                  >
                    {updatedData?.dependsOn
                      ? updatedData.dependsOn.map((data) => {
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
                                  onClick={() =>
                                    removeDependent(data.submittalId)
                                  }
                                >
                                  <ClearIcon />
                                </Button>
                              </Col>
                            </Row>
                          );
                        })
                      : null}
                  </div>
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
                  <p className="HedingColor">ATTACHMENTS</p>
                </Col>
                <Col span={6} offset={12}>
                  {/* <SearchDropdown
                    placeholder="Search"
                    data={onlySubmittalsTitleId}
                    onSelect={onSubmittalSearch}
                  /> */}
                </Col>
                <Col span={2}>
                  <Upload {...props}>
                    <Button
                      className="add-new-column-btn"
                      // onClick={addDependent}
                    >
                      <PlusIcon />
                    </Button>{" "}
                  </Upload>
                </Col>
              </Row>
              <div
                style={{
                  overflowY: "scroll",
                  height: "250px",
                  width: "100%"
                }}
              >
                {updatedData?.docs
                  ? updatedData.docs.map((data) => {
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
            </Col>
          </Row>
        </Space>
      </div>

      {/* <div style={{ height: "60px" }} /> */}
      <div
        style={{
          // padding: "10px",
          // backgroundColor: "white",
          position: "relative",
          bottom: "0px"
        }}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="rowActionItems"
        />

        <Card className="actionItemCard">
          <section>
            <ExclamationCircleOutlined className="SDExcCircleOutlined" />
            &nbsp;
            <span className="subDetailsAction">Action items</span>
          </section>
          <section>
            <Checkbox className="actionItemsCheckBox">
              You Recevied 2 new discussion
            </Checkbox>
            <br />
            <Checkbox className="actionItemsCheckBox">
              This Submittal Recived 3 New Submissions
            </Checkbox>
            <br />
            <Checkbox className="actionItemsCheckBox">
              This Submittal overdue by 20 days
            </Checkbox>
            <br />
          </section>
        </Card>
      </div>
    </div>
  );
}

export default SubmitalDetails;

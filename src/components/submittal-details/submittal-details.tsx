import {
  //   ArrowRightOutlined,
  ExclamationCircleOutlined
  //   ReloadOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Space
} from "antd";
import TextArea from "antd/lib/input/TextArea";
// import React from "react";
import "./submittal-details.css";
import { SubmittalLog } from "models/submittal-log";
import moment from "moment";
import { DropDownData } from "../../constants";

const { Option } = Select;

function SubmitalDetails(props: {
  submittalData: SubmittalLog;
  onChangeSubmittalData: (data: SubmittalLog) => void;
}) {
  const { submittalData, onChangeSubmittalData } = props;
  const [updatedData, setUpdatedData] = useState<SubmittalLog>(submittalData);

  useEffect(() => {
    console.log(updatedData);
    onChangeSubmittalData(updatedData);
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
                defaultValue={updatedData.status}
                onChange={(data) =>
                  setUpdatedData((prev) => {
                    return { ...prev, status: data };
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
                  {moment(updatedData.dueBy).fromNow()}
                </p>
              </div>

              <DatePicker
                style={{ width: "100%", backgroundColor: "#0000000D" }}
                format="MM-DD-YYYY"
                defaultValue={moment(updatedData.dueBy, "MM-DD-YYYY")}
                onChange={(data) =>
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      dueBy: data ? data?.toString() : prev.dueBy
                    };
                  })
                }
              />
            </Col>
            <Col span={4}>
              <p className="HedingColor">CONTRACTOR</p>
              <Select
                showSearch
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="selectStyle"
                defaultValue={updatedData.contractor.name}
              >
                <option value="0">ABC Construction</option>
                <option value="1">Birla Construction</option>
                <option value="2">Acc Construction</option>
                <option value="3">Ambuja Construction</option>
                <option value="4">Tata Construction</option>
                <option value="5">Other Construction</option>
              </Select>
            </Col>
            <Col span={4}>
              <p className="HedingColor">ASSIGNED</p>
              <Select
                className="selectStyle"
                defaultValue={updatedData.assigned.assignedTo}
              >
                <option value="0">Luck Church</option>
                <option value="1">Jone Doe</option>
              </Select>
            </Col>
            <Col span={4}>
              <div>
                <p className="HedingColor" style={{ float: "left" }}>
                  DUE BY
                </p>
                <p className="validationColor" style={{ float: "right" }}>
                  {moment(updatedData.governingDate).fromNow()}{" "}
                </p>
              </div>

              <DatePicker
                style={{ width: "100%", backgroundColor: "#0000000D" }}
                format="MM-DD-YYYY"
                defaultValue={moment(updatedData.governingDate, "MM-DD-YYYY")}
                onChange={(data) =>
                  setUpdatedData((prev) => {
                    return {
                      ...prev,
                      governingDate: data
                        ? data?.toString()
                        : prev.governingDate
                    };
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
                    defaultValue={updatedData.description}
                    maxLength={400}
                    onChange={(data) =>
                      setUpdatedData((prev) => {
                        return { ...prev, description: data.target.value };
                      })
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: "15px" }}>
                  <div>
                    <p className="HedingColor" style={{ float: "left" }}>
                      DEPENDS ON Block
                    </p>
                    {/* <SearchableDropdown
            placeholder="Search"
            data={[{topicId:1001,topicName:"abc"}]}
            onSelect={onSearchSelect}
          /> */}
                  </div>
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "250px",
                      width: "100%"
                    }}
                  >
                    <Input
                      placeholder="Basic usage"
                      style={{ border: "1px solid #00000033" }}
                      defaultValue={updatedData.dependsOn}
                      allowClear
                    />
                    <Input
                      placeholder="Basic usage"
                      style={{
                        border: "1px solid #00000033",
                        margin: "10px 0px"
                      }}
                      defaultValue={updatedData.dependsOn}
                      allowClear
                    />
                    <Input
                      placeholder="Basic usage"
                      style={{ border: "1px solid #00000033" }}
                      defaultValue={updatedData.dependsOn}
                      allowClear
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={9} offset={1}>
              <div>
                <p className="HedingColor" style={{ float: "left" }}>
                  ATTACHMENTS{" "}
                </p>
                {/* <SearchableDropdown
            placeholder="Search"
            data={[{topicId:1001,topicName:"abc"}]}
            onSelect={onSearchSelect}
          /> */}
              </div>
              <div
                style={{
                  overflowY: "scroll",
                  height: "250px",
                  width: "100%"
                }}
              >
                {/* <Input
                  placeholder="Basic usage"
                  style={{ border: "1px solid #00000033" }}
                  defaultValue={updatedData.dependsOn}
                  allowClear
                /> */}
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

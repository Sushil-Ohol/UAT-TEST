import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Card,
  DatePicker,
  Upload,
  Button,
  Checkbox
} from "antd";
import "./submittal-details.css";
import {
  StatusOptions,
  ContractorOptions,
  AssigneeOptions,
  PackageOptions
} from "../constant";

const { TabPane } = Tabs;
const { TextArea } = Input;
function SubmitalDetails() {
  return (
    <div className="">
      <div className="">
        <Tabs
          defaultActiveKey="1"
          style={{ fontWeight: "600", color: "black" }}
        >
          <TabPane tab="Submittal Details" key="1">
            <Row className="FilterRow">
              <Col
                span={22}
                style={{ marginLeft: "25px", justifyContent: "space-around" }}
              >
                <Space>
                  <section>
                    <span className="HedingColor">STATUS</span>

                    <Select style={{ width: 200 }} defaultValue="All">
                      {StatusOptions.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </section>
                  <section>
                    <span className="HedingColor">DUE BY</span>
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" />
                  </section>
                  <section>
                    <span className="HedingColor">CONTRACTOR</span>
                    <Select style={{ width: 200 }} defaultValue="Construction">
                      {ContractorOptions.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </section>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <section>
                    <span className="HedingColor">ASSIGNED</span>
                    <Select style={{ width: 200 }} defaultValue="All">
                      {AssigneeOptions.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </section>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <section>
                    <span className="HedingColor">PACAKGE</span>
                    <Select
                      style={{ width: 200 }}
                      defaultValue="Select packages"
                    >
                      {PackageOptions.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </section>
                </Space>
              </Col>
            </Row>
            <div className="">
              <span style={{ marginLeft: "20px" }} className="HedingColor">
                DISCRIPTION
              </span>
              <Row gutter={24} style={{ marginLeft: "10px" }}>
                <Col span={18}>
                  <section>
                    <div className="">
                      <TextArea
                        style={{
                          color: "black",
                          width: "200",
                          maxWidth: "62%",
                          background: "##DCDCDC"
                        }}
                        rows={3}
                        placeholder="Fill the Discription"
                        value=""
                        maxLength={400}
                      />
                    </div>
                  </section>
                </Col>
                <Col span={6}>
                  <Row gutter={24}>
                    <Col span={16}>
                      <div className="">
                        <span className="HedingColor">ATTACHMENTS</span>
                      </div>
                    </Col>
                    <Col span={8} style={{ margin: " -5px" }}>
                      <div className="block">
                        <Upload>
                          <Button
                            style={{
                              border: "none",
                              padding: 0,
                              background: "none"
                            }}
                          >
                            <i className="fa fa-plus" aria-hidden="true" />
                          </Button>
                        </Upload>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={24} style={{ marginTop: "20px" }}>
                <Col span={18}>
                  <Col span={6}>
                    <Row gutter={24} style={{ marginLeft: "1px" }}>
                      <Col span={16}>
                        <div className="">
                          <span className="HedingColor">DEPENDS ON</span>
                        </div>
                      </Col>
                      <Col span={8} style={{ margin: " -5px" }}>
                        <div className="block">
                          <Upload>
                            <Button
                              style={{
                                border: "none",
                                padding: 0,
                                background: "none"
                              }}
                            >
                              <i className="fa fa-plus" aria-hidden="true" />
                            </Button>
                          </Upload>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
              <Card style={{ width: "100%", marginTop: "40px" }}>
                <section>
                  <ExclamationCircleOutlined style={{ marginTop: "12px" }} />
                  &nbsp;
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "12px",
                      fontSize: "15px"
                    }}
                  >
                    Action items
                  </span>
                </section>
                <section>
                  <Checkbox style={{ fontWeight: "600", fontSize: "13px" }}>
                    You Recevied 2 new discussion
                  </Checkbox>
                  <br />
                  <Checkbox style={{ fontWeight: "600", fontSize: "13px" }}>
                    This Submittal Recived 3 New Submissions
                  </Checkbox>
                  <br />
                  <Checkbox style={{ fontWeight: "600", fontSize: "13px" }}>
                    This Submittal overdue by 20 days
                  </Checkbox>
                  <br />
                </section>
              </Card>
            </div>
          </TabPane>
          <TabPane tab="Attachments" key="2">
            Attachments
          </TabPane>
          <TabPane tab="Discussion" key="3">
            Discussion
          </TabPane>
          <TabPane tab="Submission" key="4">
            Submission
          </TabPane>
          <TabPane tab="Activity" key="5">
            Activity
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default SubmitalDetails;

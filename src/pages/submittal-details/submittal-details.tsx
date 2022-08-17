import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
  EditFilled,
  ExclamationCircleOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import {
  Col,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Card,
  DatePicker,
  Button,
  Checkbox,
  Layout,
  Dropdown,
  Typography,
  Menu
} from "antd";

import { useState } from "react";
import { useHistory } from "react-router";
import "./submittal-details.css";
import UploadFile from "./upload";

const { TabPane } = Tabs;
const { TextArea } = Input;

function SubmitalDetails() {
  const history = useHistory();

  const [customIconStr, setCustomIconStr] = useState("472 Piping Design");
  const { Paragraph } = Typography;
  const menu = (
    <Menu
      items={[
        {
          label: "Clicking me will not close the menu.",
          key: "1"
        },
        {
          label: "Clicking me will not close the menu also.",
          key: "2"
        },
        {
          label: "Clicking me will close the menu.",
          key: "3"
        }
      ]}
    />
  );
  return (
    <div>
      <section>
        <Layout>
          <Card className="SubDetailsCard">
            <Row gutter={30}>
              <Col span={4}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  className="SubDetailsCardBtn"
                  onClick={() => history.push("./submittals")}
                >
                  All submittals
                </Button>
              </Col>

              <Col span={14}>
                <div>
                  <Paragraph
                    className="SubDetailsParagraph"
                    editable={{
                      icon: <EditFilled color="black" />,
                      tooltip: "",
                      onChange: setCustomIconStr
                    }}
                  >
                    {customIconStr}
                  </Paragraph>
                </div>
              </Col>
              <Col span={3}>
                <Input.Group compact>
                  <Dropdown overlay={menu}>
                    <Button>
                      <Space>
                        ABC Contractor
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Input.Group>
              </Col>
              <Col span={3}>
                <div>
                  <Button className="SubDetailsSplitBtn">
                    Split Submittal
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Layout>
      </section>
      <div>
        <Tabs defaultActiveKey="1" className="TabsClass">
          <TabPane tab="Submittal Details" key="1">
            <Row className="FilterRow">
              <Col span={22}>
                <Space>
                  <section>
                    <span className="HedingColor subDetailsLabel ">STATUS</span>
                    <Select className="subDetailsStatus" defaultValue="All">
                      <option value="0">All</option>
                      <option value="1">Assigned</option>
                      <option value="2">In Review</option>
                      <option value="3">Communicated</option>
                      <option value="4">Resolved</option>
                      <option value="5">Closed</option>
                    </Select>
                  </section>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <section>
                    <span className="HedingColor">DUE BY</span>
                    <span className="validationColor">20 days Ago</span>

                    <DatePicker
                      className="subDetailsDatePicker"
                      format="YYYY-MM-DD"
                    />
                  </section>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <section>
                    <span className="HedingColor">CONTRACTOR</span>
                    <span className="reload">
                      <ReloadOutlined />
                    </span>

                    <Select
                      className="subDetailsContractor"
                      defaultValue="Construction"
                    >
                      <option value="0">ABC Construction</option>
                      <option value="1">Birla Construction</option>
                      <option value="2">Acc Construction</option>
                      <option value="3">Ambuja Construction</option>
                      <option value="4">Tata Construction</option>
                      <option value="5">Other Construction</option>
                    </Select>
                  </section>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <section>
                    <span className="HedingColor">ASSIGNED</span>
                    <Select defaultValue="All" className="subDetailsAssigned">
                      <option value="0">Luck Church</option>
                      <option value="1">Jone Doe</option>
                    </Select>
                  </section>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <section>
                    <span className="HedingColor">PACAKGE</span>
                    <span>
                      <ReloadOutlined className="subDetailspackage" />
                    </span>

                    <Input
                      suffix={
                        <ArrowRightOutlined className="subDetailsArrowOutlined" />
                      }
                    />
                  </section>
                </Space>
              </Col>
            </Row>
            <section>
              <Row gutter={12} className="SubDetailsSecondRow">
                <Col span={15}>
                  <div className="block">
                    <Col span={24}>
                      <section>
                        <span className="HedingColor subDetialsDiscription">
                          DISCRIPTION
                        </span>

                        <div>
                          <TextArea
                            className="subDetialsDisArea"
                            rows={3}
                            placeholder="Fill the Discription"
                            value=""
                            maxLength={400}
                          />
                        </div>
                      </section>
                    </Col>
                  </div>
                </Col>
                <Col span={9}>
                  <div className="block">
                    <Col span={20}>
                      <section>
                        <div className="subDetailsAttachments">
                          <span className="HedingColor">ATTACHMENTS </span>
                          <UploadFile />
                        </div>
                      </section>
                    </Col>
                  </div>
                </Col>
              </Row>
            </section>

            <section>
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className="subDetialsThirdRow"
              >
                <Col span={14}>
                  <div className="block">
                    <Col span={24}>
                      <section>
                        <div className="parent">
                          <div className="child inline-block-child">
                            <span className="HedingColor subDetailsDepndsLabel">
                              DEPENDS ON
                            </span>
                          </div>
                          <div className="child inline-block-child">
                            <div className="DependsStatus">Blocked</div>
                          </div>
                          <UploadFile />
                        </div>
                      </section>
                    </Col>
                  </div>
                </Col>
              </Row>
            </section>

            <div>
              {/* for 3rd row implementaion */}

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

import { ArrowLeftOutlined, EditFilled } from "@ant-design/icons";
import { Col, Row, Tabs, Card, Button, Layout, Typography } from "antd";
import SubmittalDetails from "components/submittal-details/submittal-details";
import { SubmittalLog } from "models/submittal-log";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "store";
import { updateSubmittal } from "store/slices/submittalsSlices";
import "./submittal-details.css";
// import UploadFile from "./upload";

const { TabPane } = Tabs;
// const { TextArea } = Input;

function SubmittalDetailspage(props: any) {
  const { location } = props;
  const history = useHistory();

  const [updatedData, setUpdatedData] = useState<SubmittalLog>(
    location.state.data
  );
  const [customIconStr, setCustomIconStr] = useState(
    location.state.data.submittal
  );
  const { Paragraph } = Typography;
  const dispatch = useAppDispatch();
  const goToSubmittalPage = () => {
    history.goBack();
  };

  useEffect(() => {
    console.log(updatedData);
    dispatch(updateSubmittal(updatedData));
  }, [updatedData]);

  useEffect(() => {
    setUpdatedData((prev) => ({ ...prev, submittal: customIconStr }));
  }, [customIconStr]);

  const onChangeSubmittalData = (data: SubmittalLog) => {
    console.log(data);
    setUpdatedData(data);
  };

  return (
    <div style={{ margin: "0 16px" }}>
      <section>
        <Layout>
          <Card className="SubDetailsCard">
            <Row gutter={30}>
              <Col span={4}>
                {/* <Link
                  to=
                > */}
                <Button
                  icon={<ArrowLeftOutlined />}
                  className="SubDetailsCardBtn"
                  onClick={goToSubmittalPage}
                >
                  All submittals
                </Button>
                {/* </Link> */}
              </Col>

              <Col span={14}>
                <div style={{ display: "inline-block" }}>
                  {updatedData.id}
                  <Paragraph
                    // className="SubDetailsParagraph"
                    style={{
                      marginTop: "8px",
                      display: "inline-block",
                      marginLeft: "5px"
                    }}
                    editable={{
                      icon: <EditFilled color="black" />,
                      tooltip: "",
                      onChange: (e) => setCustomIconStr(e)
                    }}
                  >
                    {customIconStr}
                  </Paragraph>
                </div>
              </Col>

              <Col span={6}>
                <div style={{ float: "right", marginTop: "8px" }}>
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
          <TabPane tab="Submittal Details" key="1" style={{ height: "100%" }}>
            <SubmittalDetails
              submittalData={updatedData}
              onChangeSubmittalData={onChangeSubmittalData}
            />
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

export default SubmittalDetailspage;

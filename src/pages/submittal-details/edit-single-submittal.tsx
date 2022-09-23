/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, EditFilled } from "@ant-design/icons";
import { Col, Row, Tabs, Card, Button, Layout, Typography, Spin } from "antd";
import SubmittalDetails from "components/submittal-details/submittal-details";
import { ConversationDoc } from "models/discussion";
import { SubmittalLog } from "models/submittal-log";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import { updateDocs, updateSubmittal } from "store/slices/submittalsSlices";
import "./submittal-details.css";
// import UploadFile from "./upload";

const { TabPane } = Tabs;
// const { TextArea } = Input;

function SubmittalDetailspage(props: any) {
  const { location } = props;
  const history = useHistory();
  const submittalList = useAppSelector(
    (state: RootState) => state.submittals.list
  );
  const [updatedData, setUpdatedData] = useState<SubmittalLog | null>(null);
  const { Title } = Typography;
  const dispatch = useAppDispatch();

  const [docs, setDocs] = useState<ConversationDoc[]>([]);

  const goToSubmittalPage = () => {
    if (updatedData) dispatch(updateSubmittal(updatedData));
    dispatch(updateDocs({ submittalId: location.state.data.id, docs }));
    history.goBack();
  };

  useEffect(() => {
    const selectedSubmittal = submittalList.find(
      (data) => data.id === location.state.data.id
    );
    if (selectedSubmittal) {
      setUpdatedData(selectedSubmittal);
      setDocs(selectedSubmittal.docs ? selectedSubmittal.docs : []);
    }

    return () => {};
  }, []);

  const updateSubmittalTitle = (title: string) => {
    setUpdatedData((prev: SubmittalLog | null) => {
      return prev
        ? {
            ...prev,
            submittal: title !== "" ? title : prev.submittal
          }
        : null;
    });
  };

  const onChangeSubmittalData = (data: SubmittalLog) => {
    setUpdatedData(data);
  };

  const handleDocuments = (action: string, document: ConversationDoc) => {
    switch (action) {
      case "Add":
        setDocs([...docs, document]);
        break;
      case "Remove":
        setDocs(docs.filter((d: ConversationDoc) => d.id !== document.id));
        break;
      default:
        setDocs(docs);
        break;
    }
  };

  function SubmittalTitle() {
    return (
      <Title
        level={5}
        style={{
          width: "100%",
          marginBottom: "0px"
        }}
        editable={{
          icon: <EditFilled color="black" />,
          tooltip: "",
          onChange: (e) => updateSubmittalTitle(e)
        }}
      >
        {updatedData?.submittal}
      </Title>
    );
  }

  return (
    <div style={{ margin: "0 16px" }}>
      <section>
        <Layout>
          <Card className="SubDetailsCard">
            <Row>
              <Col span={4}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  className="SubDetailsCardBtn"
                  onClick={goToSubmittalPage}
                >
                  All submittals
                </Button>
              </Col>
              <Col
                span={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Title level={5} style={{ marginBottom: "0px" }}>
                  {updatedData?.id}
                </Title>
              </Col>

              <Col span={14} style={{ display: "flex", alignItems: "center" }}>
                <SubmittalTitle />
              </Col>

              <Col span={5}>
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
            {updatedData ? (
              <SubmittalDetails
                submittalData={updatedData}
                onChangeSubmittalData={onChangeSubmittalData}
                docs={docs}
                handleDocuments={handleDocuments}
              />
            ) : (
              <Spin size="large" />
            )}
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

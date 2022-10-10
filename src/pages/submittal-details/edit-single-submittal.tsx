/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, FolderOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Tabs,
  Button,
  Typography,
  Spin,
  Drawer,
  Space,
  message
} from "antd";
import SubmittalDetails from "components/submittal-details/submittal-details";
import { EditIcon, ExpandIcon } from "components/svg-icons";

import { ConversationDoc } from "models/discussion";
import { SubmittalLog } from "models/submittal-log";
import StagingZone from "pages/staging-zone";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import { updateDocs, updateField } from "store/slices/submittalsSlices";
import "./submittal-details.css";

const { TabPane } = Tabs;

function SubmittalDetailspage(props: any) {
  const { location } = props;
  const history = useHistory();
  const submittalList = useAppSelector(
    (state: RootState) => state.submittals.list
  );
  const [updatedData, setUpdatedData] = useState<SubmittalLog | null>(null);
  const [submittalDetailsId, setSubmittalDetailsId] = useState<any>();
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const [docs, setDocs] = useState<ConversationDoc[]>([]);
  const [submittalTitle, setSubmittalTitle] = useState<string>("");
  const [showStagingZone, setShowStagingZone] = useState<boolean>(false);
  const [height, setHeight] = useState(505);
  const [isResizing, setIsResizing] = useState(false);
  const [isDocumentView, setIsDocumentView] = useState(false);
  const goToSubmittalPage = () => {
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

  useEffect(() => {
    if (updatedData) {
      dispatch(
        updateField({
          submittalId: updatedData.id,
          field: "submittal",
          value: updatedData.submittal
        })
      );
      setSubmittalTitle(updatedData?.submittal);
    }
  }, [updatedData?.submittal]);

  const handleDocuments = (action: string, document: ConversationDoc) => {
    // console.log(action, document);
    switch (action) {
      case "Add": {
        const tempDocs = [...docs];
        const index = tempDocs.findIndex((item) => item.id === document.id);
        if (index > -1) {
          message.error("Document already exist");
        } else {
          setDocs([...docs, document]);
          message.success("Document Added successfully");
        }
        break;
      }
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
        className="submittalTitle"
        editable={{
          icon: <EditIcon style={{ marginLeft: "1.56vh" }} />,
          tooltip: "",
          onChange: (e) => updateSubmittalTitle(e)
        }}
      >
        {updatedData?.submittal}
      </Title>
    );
  }

  const onStagingZoneClose = () => {
    setShowStagingZone(false);
    setHeight(505);
  };

  const onMouseDown = () => {
    setIsResizing(true);
  };

  const viewDocument = (value: boolean) => {
    if (value) {
      const viewDocHeight = document.body.offsetHeight - 46;
      setHeight(viewDocHeight);
    } else {
      setHeight(505);
    }
    setIsDocumentView(value);
  };

  const onMouseUp = () => {
    setIsResizing(false);
  };

  const onMouseMove = (e: { clientY: number }) => {
    if (isResizing) {
      const offsetBottom =
        document.body.offsetHeight - (e.clientY - document.body.offsetTop);
      const minHeight = 50;
      const maxHeight = document.body.offsetHeight;
      if (offsetBottom > minHeight && offsetBottom < maxHeight) {
        setHeight(offsetBottom);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  useEffect(() => {
    setSubmittalDetailsId(location.state.data.id.toString());
  }, [showStagingZone]);
  return (
    <div style={{ margin: "0px  1.39vw", marginBottom: "1.95vh" }}>
      <Row className="subDetailsNavbar">
        <Col flex="14.57%" className="allSubmittalBtnCol">
          <Button
            icon={<ArrowLeftOutlined />}
            className="subDetailsCardBtn"
            onClick={goToSubmittalPage}
          >
            All submittals
          </Button>
        </Col>
        <Col
          flex="84.95%"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Space style={{ marginLeft: "1.80vw" }}>
            <Title level={5} className="submittalDetailsPageId">
              {updatedData?.id}
            </Title>
            <SubmittalTitle />
          </Space>
          <div>
            <Button className="subDetailsSplitBtn">Split Submittal</Button>
          </div>
        </Col>
      </Row>
      <div>
        <Tabs
          defaultActiveKey="1"
          className="TabsClass"
          style={{ height: "100%" }}
        >
          <TabPane
            tab="Submittal Details"
            key="1"
            style={{ minHeight: "80vh" }}
          >
            {updatedData ? (
              <SubmittalDetails
                submittalData={updatedData}
                docs={docs}
                submittalTitle={submittalTitle}
                handleDocuments={handleDocuments}
              />
            ) : (
              <Spin size="large" />
            )}
          </TabPane>
          <TabPane tab="Attachments" key="2">
            Attachments
          </TabPane>
          <TabPane tab="Materials" key="3">
            Materials
          </TabPane>
          <TabPane tab="Discussion" key="4">
            Discussion
          </TabPane>
          <TabPane tab="Submission" key="5">
            Submission
          </TabPane>
          <TabPane tab="Activity" key="6">
            Activity
          </TabPane>
        </Tabs>
      </div>
      <Row className="subDetailsNavbar">
        <Col style={{ padding: "10px", width: "100%" }}>
          <Button
            onClick={() => setShowStagingZone(!showStagingZone)}
            size="large"
            className="staging-zone-btn"
          >
            Staging Zone <ExpandIcon />
          </Button>
        </Col>
      </Row>

      <Drawer
        title={
          <Space>
            <Title level={5}>Staging Zone</Title>
            <Title level={5} className="private-org">
              Private within org
            </Title>
            <Title level={5}>
              Use this space to discuss within your team mates, share documents.
              All content are private within your org.
            </Title>
            {!isDocumentView && (
              <Title level={5} onClick={onStagingZoneClose}>
                <ExpandIcon className="expand-icon-right" />
              </Title>
            )}
            {isDocumentView && (
              <Title level={5} className="expand-icon-right-with-text">
                <FolderOutlined /> Browse previous projects
              </Title>
            )}
          </Space>
        }
        placement="bottom"
        className="stagingZoneDrawer"
        onClose={onStagingZoneClose}
        visible={showStagingZone}
        mask={false}
        headerStyle={{ borderBottom: "none" }}
        height={height}
      >
        {showStagingZone && (
          <StagingZone
            onMouseDown={onMouseDown}
            documentView={viewDocument}
            isDocumentView={isDocumentView}
            submittalDetailsId={submittalDetailsId}
            setSubmittalDetailsId={setSubmittalDetailsId}
            selectedData={[]}
            handleDocuments={handleDocuments}
            updatedData={updatedData}
          />
        )}
      </Drawer>
    </div>
  );
}

export default SubmittalDetailspage;

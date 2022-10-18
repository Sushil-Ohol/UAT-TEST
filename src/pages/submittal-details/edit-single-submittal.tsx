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
import { RegainEditAccessWarning } from "popups";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import {
  setSelectedSubmittal,
  updateDocs,
  updateField
} from "store/slices/submittalsSlices";
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
  const [submittalDocs, setSubmittalDocs] = useState<ConversationDoc[]>([]);
  const [docs, setDocs] = useState<ConversationDoc[]>([]);
  const [submittalTitle, setSubmittalTitle] = useState<string>("");
  const [showStagingZone, setShowStagingZone] = useState<boolean>(false);
  const [height, setHeight] = useState(505);
  const [isResizing, setIsResizing] = useState(false);
  const [isDocumentView, setIsDocumentView] = useState(false);
  const selectedDisscusition: any = useAppSelector(
    (state: RootState) => state.stagingZone.selectedDiscussion
  );
  const [hasCurrentAccess, setHasCurrentAccess] = useState(false);
  const { selectedSubmittalLog } = useAppSelector((state) => state.submittals);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [currentAccess, setCurrentAccess] = useState<string>("");

  useEffect(() => {
    if (currentUser && selectedSubmittalLog) {
      // const getCurrentAccess =
      //   currentUser.company.name === selectedSubmittalLog.company.name
      //     ? "You"
      //     : selectedSubmittalLog.company.name;

      // setCurrentAccess(getCurrentAccess);
      // if (getCurrentAccess === "You") {
      //   setHasCurrentAccess(true);
      // } else {
      //   setHasCurrentAccess(false);
      // }
      setCurrentAccess(selectedSubmittalLog.company.name);
      if (selectedSubmittalLog.company.name === "C Construction") {
        setHasCurrentAccess(false);
      } else {
        setHasCurrentAccess(true);
      }
    }
  }, [currentUser, selectedSubmittalLog]);

  const goToSubmittalPage = () => {
    history.goBack();
  };

  useEffect(() => {
    const selectedSubmittal = submittalList.find(
      (data) => data.id === location.state.data.id
    );
    if (selectedSubmittal) {
      dispatch(setSelectedSubmittal(selectedSubmittal));
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

  useEffect(() => {
    const selectedSubmittal = submittalList.filter(
      (data) => +data.id === parseInt(selectedDisscusition?.topicId, 10)
    )[0];

    setSubmittalDocs(selectedSubmittal?.docs ? selectedSubmittal.docs : []);
  }, [selectedDisscusition]);
  const handleDocuments = (
    action: string,
    document: ConversationDoc,
    dargValue: boolean
  ) => {
    switch (action) {
      case "Add": {
        const tempDocs = [...docs];
        const index = tempDocs.findIndex((item) => item.id === document.id);
        if (index > -1) {
          message.error("Document already exist");
        } else if (
          location.state.data.id.toString() !== selectedDisscusition?.topicId &&
          selectedDisscusition?.topicId !== undefined &&
          showStagingZone &&
          !dargValue
        ) {
          const indeX = submittalDocs.findIndex(
            (item) => item.id === document.id
          );
          if (indeX > -1) {
            message.error("Document already exist");
          } else {
            setSubmittalDocs([...submittalDocs, document]);
            dispatch(
              updateDocs({
                submittalId: parseInt(selectedDisscusition?.topicId, 10),
                docs: [...submittalDocs, document]
              })
            );
            message.success("Document Added successfully");
          }
        } else {
          setDocs([...docs, document]);
          dispatch(
            updateDocs({
              submittalId: location.state.data.id,
              docs: [...docs, document]
            })
          );
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
        editable={
          currentAccess !== "C Construction"
            ? {
                icon: <EditIcon style={{ marginLeft: "1.56vh" }} />,
                tooltip: "",
                onChange: (e) => updateSubmittalTitle(e)
              }
            : false
        }
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
          <Space className="submittalDetailsHeading">
            <Title level={5} className="submittalDetailsPageId">
              {updatedData?.id}
            </Title>
            <SubmittalTitle />
          </Space>
          <Space>
            <RegainEditAccessWarning currentAccess={currentAccess} />
            <Button className="subDetailsSplitBtn">Split Submittal</Button>
          </Space>
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
            style={{
              minHeight: "80vh",
              opacity: hasCurrentAccess ? "1.0" : "0.5"
            }}
          >
            {updatedData ? (
              <SubmittalDetails
                submittalData={updatedData}
                docs={docs}
                submittalTitle={submittalTitle}
                handleDocuments={handleDocuments}
                disabled={!hasCurrentAccess}
              />
            ) : (
              <Spin size="large" />
            )}
          </TabPane>
          <TabPane tab="Attachments" key="2">
            <div className="attachments">Attachments</div>
          </TabPane>
          <TabPane tab="Materials" key="3">
            <div className="materials">Materials</div>
          </TabPane>
          <TabPane tab="Discussion" key="4">
            <div className="discussion">Discussion</div>
          </TabPane>
          <TabPane tab="Submission" key="5">
            <div className="submission">Submission</div>
          </TabPane>
          <TabPane tab="Activity" key="6">
            <div className="activity">Activity</div>
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

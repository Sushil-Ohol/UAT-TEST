/* Project Create Page Component */

import { Button, Card, Col, Row, Typography, Steps, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "components/file-upload/file-upload";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  CheckOutlined,
  FileDoneOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";
import "./project-create.css";
import { CogIcon, ArrowIcon } from "components/svg-icons";
import { useAppDispatch, useAppSelector } from "store";
import { getProjectValue } from "store/slices/project-value";
import {
  steps,
  hexagoanStyleScreen1,
  hexagoanStyleScreen2
} from "constants/index";
import { addProject } from "store/slices/projectSlice";

function ProjectCreate() {
  const history = useHistory();
  const [skipBtn, setSkipBtn] = useState(false);
  const dispatch = useAppDispatch();
  const { projectSug } = useAppSelector((state) => state.projectSuggest);
  const { projectValue } = useAppSelector((state) => state.projectValue);
  const [current, setCurrent] = useState(0);

  const projectInputRef: any = useRef(null);
  const [countCall, setCountCall] = useState({
    projectName: false,
    details: false
  });
  const [cogIconProjectInput, setCogIconProjectInput] = useState(false);
  const [cogIconDetailsTextArea, setCogIconDetailsTextArea] = useState(false);
  const [projectInputEdited, setProjectInputEdited] = useState(false);
  const [textAreaEdited, setTextAreaEdited] = useState(false);
  const { Text } = Typography;
  const { Step } = Steps;
  const [specificationDoc, setSpecificationDoc] = useState({
    title: "",
    path: "",
    url: ""
  });
  const [siteDrawing, setSiteDrawing] = useState({
    title: "",
    path: "",
    url: ""
  });
  const [schedule, setSchedule] = useState({
    title: "",
    path: "",
    url: ""
  });

  const [defaultValue, setDefaultValue] = useState({
    details: "",
    projectName: ""
  });

  const [count, setCount] = useState(0);
  const fileInputs = [
    {
      lable: specificationDoc.title,
      name: "specificationDoc",
      defaultValue: specificationDoc.path,
      initialValue: specificationDoc.path,
      url: specificationDoc.url,
      addonAfter: (
        <CloseOutlined
          className="close-icon"
          onClick={() => {
            setSpecificationDoc({ path: "", title: "", url: "" });
            setCount((val) => val - 1);
          }}
        />
      )
    },
    {
      lable: siteDrawing.title,
      name: "siteDrawingDoc",
      initialValue: siteDrawing.path,
      defaultValue: siteDrawing.path,
      url: siteDrawing.url,
      addonAfter: (
        <CloseOutlined
          className="close-icon"
          onClick={() => {
            setSiteDrawing({ path: "", title: "", url: "" });
            setCount((val) => val - 1);
          }}
        />
      )
    },
    {
      lable: schedule.title,
      name: "scheduleDoc",
      initialValue: schedule.path,
      defaultValue: schedule.path,
      url: schedule.url,
      addonAfter: (
        <CloseOutlined
          className="close-icon"
          onClick={() => {
            setSchedule({ path: "", title: "", url: "" });
            setCount((val) => val - 1);
          }}
        />
      )
    }
  ];

  useEffect(() => {
    if (count === 0) {
      setSkipBtn(false);
      setDefaultValue({
        details: "",
        projectName: ""
      });
    }
  }, [count]);
  useEffect(() => {
    const Getvalue = async () => {
      await dispatch(getProjectValue());
    };
    if (current > 0) {
      Getvalue();
    }
    if (!skipBtn) {
      setSpecificationDoc({ path: "", title: "", url: "" });
      setSiteDrawing({ path: "", title: "", url: "" });
      setSchedule({ path: "", title: "", url: "" });
      setDefaultValue({
        details: "",
        projectName: ""
      });
      setCogIconProjectInput(false);
      setCogIconDetailsTextArea(false);
      setProjectInputEdited(false);
      setTextAreaEdited(false);
      setCount(0);
    }
  }, [current, skipBtn, dispatch]);
  useEffect(
    () =>
      setDefaultValue({
        details: projectSug.details,
        projectName: projectSug.projectName.toString()
      }),
    [projectSug]
  );
  const next = () => {
    if (defaultValue.projectName.length > 0 && cogIconProjectInput) {
      setCurrent(current + 1);
    }
    projectInputRef.current.focus();
  };
  const finishClick = () => {
    dispatch(
      addProject({
        id: "P0007",
        name: defaultValue.projectName,
        description: defaultValue.details
      })
    );
    history.push("/projects");
  };

  function prev() {
    if (current === 0) {
      setCogIconProjectInput(false);
      setCogIconDetailsTextArea(false);
      setProjectInputEdited(false);
      setTextAreaEdited(false);
    }
    setCurrent(current - 1);
    setDefaultValue({
      details: "",
      projectName: ""
    });
    setCountCall({ projectName: false, details: false });
    setCount((preValue: any) => preValue - 1);
  }
  function toolTipHints() {
    if (
      defaultValue.projectName.length === 0 &&
      defaultValue.details.length > 0
    ) {
      return (
        <div id="topRight">
          Please confirm the project name before you can procced.
        </div>
      );
    }
    if (
      defaultValue.details.length === 0 &&
      !cogIconDetailsTextArea &&
      countCall.details
    ) {
      return (
        <div id="topRight">
          Please confirm the details before you can procced.
        </div>
      );
    }
    if (
      defaultValue.projectName.length === 0 &&
      !cogIconProjectInput &&
      countCall.projectName
    ) {
      return (
        <div id="topRight">
          Please confirm the project name before you can procced.
        </div>
      );
    }
    if (
      defaultValue.details.length === 0 &&
      defaultValue.projectName.length > 0
    ) {
      return (
        <div id="topRight">
          Please confirm the details before you can procced.
        </div>
      );
    }
    if (
      defaultValue.details.length === 0 &&
      defaultValue.projectName.length === 0
    ) {
      return (
        <div id="topRight">
          Please confirm the project name and details before you can procced.
        </div>
      );
    }

    if (defaultValue.details.length > 0 && !textAreaEdited) {
      return (
        <div id="topRight">
          Please confirm the details before you can procced.
        </div>
      );
    }

    if (defaultValue.projectName.length > 0 && !projectInputEdited) {
      return (
        <div id="topRight">
          Please confirm the project name before you can procced.
        </div>
      );
    }
    return "";
  }
  const handleSkipEvent = () => {
    setSkipBtn(true);
    setCogIconProjectInput(false);
    setCogIconDetailsTextArea(false);
    setProjectInputEdited(false);
    setTextAreaEdited(false);
    setDefaultValue({
      details: "",
      projectName: ""
    });
    setCountCall({ details: false, projectName: false });
  };

  function handleProjectName(e: any) {
    setDefaultValue({ ...defaultValue, projectName: e.target.value });
    setProjectInputEdited(true);
    setCogIconProjectInput(true);
    setCountCall({ ...countCall, projectName: false });
  }

  return (
    <Row>
      <Col span={24}>
        {skipBtn ? (
          <>
            {steps[current]?.content === "Details" && (
              <div className="steps-content">
                <Row justify="center">
                  <Col
                    xs={24}
                    sm={24}
                    md={20}
                    lg={16}
                    xl={12}
                    xxl={8}
                    // offset={1}
                  >
                    <Card className="details-form">
                      <Row justify="center">
                        <Col span={18}>
                          <h2 className="heading-details-form">
                            Creating new project / Details
                          </h2>
                        </Col>
                      </Row>
                      <Row justify="center">
                        <Col span={20} offset={2}>
                          <Form layout="vertical" autoComplete="off">
                            {fileInputs?.map((item: any) => {
                              return (
                                item.lable?.length > 0 && (
                                  <Form.Item
                                    key={item.name}
                                    className="file-input"
                                    label={item.lable}
                                    name={item.name}
                                  >
                                    <Row align="middle">
                                      <div className="selected-file">
                                        <Col span={1}>
                                          <FileDoneOutlined className="document" />
                                        </Col>
                                        <Col
                                          span={22}
                                          className="text-col-align"
                                        >
                                          <Text>
                                            <a
                                              href={item.url}
                                              className="selected-file-link"
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              {" "}
                                              {item.defaultValue}
                                            </a>
                                          </Text>
                                        </Col>
                                        <Col span={2}>{item.addonAfter}</Col>
                                      </div>
                                    </Row>
                                  </Form.Item>
                                )
                              );
                            })}
                            <Form.Item
                              label="Project Name"
                              name="projectname"
                              className="form-item"
                            >
                              {defaultValue.projectName.length === 0 &&
                                count > 0 && (
                                  <small className="error-text-project-name">
                                    (Please enter the project name)
                                  </small>
                                )}
                              <Input.Group>
                                <Row>
                                  <Col
                                    span={
                                      projectInputEdited ||
                                      defaultValue?.projectName.length <= 0
                                        ? 20
                                        : 20
                                    }
                                  >
                                    {!projectInputEdited &&
                                      !cogIconProjectInput &&
                                      defaultValue.projectName.length > 0 && (
                                        <CogIcon
                                          className="cog-details"
                                          width="20"
                                          height="20"
                                        />
                                      )}
                                    <Input
                                      ref={projectInputRef}
                                      type="text"
                                      value={defaultValue.projectName}
                                      placeholder="Enter the project name"
                                      onChange={(e) => handleProjectName(e)}
                                      className={
                                        defaultValue.projectName.length === 0 &&
                                        count > 0
                                          ? "error-bg-color"
                                          : (countCall.projectName &&
                                              "success-bg-color") ||
                                            ""
                                      }
                                    />
                                  </Col>
                                  {!projectInputEdited &&
                                    defaultValue.projectName.length > 0 && (
                                      <Col
                                        span={2}
                                        className="wrapper-green-check"
                                      >
                                        <CheckOutlined
                                          className={
                                            defaultValue.projectName.length > 0
                                              ? "success-bg-color-icon"
                                              : "check-icon-details1"
                                          }
                                          onClick={() => {
                                            setDefaultValue({
                                              ...defaultValue,
                                              projectName:
                                                defaultValue.projectName
                                            });
                                            setCountCall({
                                              ...countCall,
                                              projectName: false
                                            });
                                            setProjectInputEdited(true);
                                            setCogIconProjectInput(true);
                                          }}
                                        />
                                      </Col>
                                    )}
                                </Row>
                                {defaultValue.projectName.length > 0 &&
                                  (specificationDoc.path.length > 0 ||
                                    siteDrawing.path.length > 0 ||
                                    schedule.path.length > 0) &&
                                  !cogIconProjectInput &&
                                  !projectInputEdited && (
                                    <Row>
                                      <Col>
                                        <p className="project-name-hint">
                                          We guessed this name from your
                                          Specification Document. So it has the{" "}
                                          <CogIcon
                                            className=""
                                            width="10"
                                            height="10"
                                          />{" "}
                                          symbol, <br /> please correct if it is
                                          wrong. You can press
                                          <CheckSquareOutlined className="hint-check-icon" />
                                          tick to confirm
                                        </p>
                                      </Col>
                                    </Row>
                                  )}
                              </Input.Group>
                            </Form.Item>
                            <Form.Item label="Details" name="details">
                              {defaultValue.details.length === 0 &&
                                count > 0 && (
                                  <small className="error-text-project-name-details">
                                    (Please enter the details)
                                  </small>
                                )}
                              <Input.Group>
                                <Row className="textarea">
                                  <Col
                                    span={
                                      textAreaEdited ||
                                      defaultValue.details.length <= 0
                                        ? 20
                                        : 20
                                    }
                                  >
                                    <TextArea
                                      autoSize={{ minRows: 5, maxRows: 2 }}
                                      value={defaultValue.details}
                                      onChange={(e) => {
                                        setDefaultValue({
                                          ...defaultValue,
                                          details: e.target.value
                                        });
                                        setTextAreaEdited(true);
                                        setCogIconDetailsTextArea(true);
                                        setCountCall({
                                          ...countCall,
                                          details: false
                                        });
                                      }}
                                      placeholder="Enter your project details"
                                      className={
                                        defaultValue.details.length === 0 &&
                                        count > 0
                                          ? "error-bg-color"
                                          : (countCall.details &&
                                              "success-bg-color") ||
                                            ""
                                      }
                                    />
                                    {!textAreaEdited &&
                                      !cogIconDetailsTextArea &&
                                      defaultValue.details.length > 0 && (
                                        <CogIcon
                                          className="cog-details"
                                          width="20"
                                          height="20"
                                        />
                                      )}
                                  </Col>
                                  <Col span={2}>
                                    {!textAreaEdited &&
                                      defaultValue.details.length > 0 && (
                                        <CheckOutlined
                                          onClick={() => {
                                            setTextAreaEdited(true);
                                            setCogIconDetailsTextArea(true);
                                            setCountCall({
                                              ...countCall,
                                              details: false
                                            });
                                          }}
                                          className={
                                            defaultValue.details.length > 0
                                              ? "success-bg-color-icon-details"
                                              : "check-icon-details"
                                          }
                                        />
                                      )}
                                  </Col>
                                </Row>
                              </Input.Group>
                            </Form.Item>
                            <Row justify="start">
                              <Col span={20}>
                                <Row justify="start" className="hexagon-align">
                                  {specificationDoc.title !==
                                    "Specification Document" && (
                                    <Col span={8}>
                                      <Dropzone
                                        defaultValue={defaultValue}
                                        setCountCall={setCountCall}
                                        count={count}
                                        width="32"
                                        height="32"
                                        hexagoanStyle={hexagoanStyleScreen2}
                                        setCount={setCount}
                                        icon="FileDoneOutlined"
                                        title="Specification Document"
                                        extension={["PDF"]}
                                        setSkipBtn={setSkipBtn}
                                        setState={setSpecificationDoc}
                                      />
                                    </Col>
                                  )}
                                  {siteDrawing.title !== "Drawing Set" && (
                                    <Col span={8}>
                                      <Dropzone
                                        defaultValue={defaultValue}
                                        setCountCall={setCountCall}
                                        count={count}
                                        width="32"
                                        height="32"
                                        hexagoanStyle={hexagoanStyleScreen2}
                                        setCount={setCount}
                                        icon="SettingOutlined"
                                        title="Drawing Set"
                                        extension={["PDF"]}
                                        setSkipBtn={setSkipBtn}
                                        setState={setSiteDrawing}
                                      />
                                    </Col>
                                  )}

                                  {schedule.title !== "Schedule" && (
                                    <Col span={8}>
                                      <Dropzone
                                        defaultValue={defaultValue}
                                        setCountCall={setCountCall}
                                        count={count}
                                        width="32"
                                        height="32"
                                        hexagoanStyle={hexagoanStyleScreen2}
                                        setCount={setCount}
                                        icon="CalendarOutlined"
                                        title="Schedule"
                                        extension={["XLS", "XLSX", "CSV"]}
                                        setSkipBtn={setSkipBtn}
                                        setState={setSchedule}
                                      />
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                            </Row>

                            {count < 3 && (
                              <Row justify="start">
                                <Col span={20}>
                                  <p className="footer-text-second">
                                    You can add any of these any later, but
                                    ConstructivIQ <br /> can help you more if
                                    you add them now.
                                  </p>
                                </Col>
                              </Row>
                            )}
                          </Form>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
            <Row justify="center">
              {steps[current].content === "Finish" && (
                <div className="steps-content">
                  <Col span={24}>
                    <Card className="card-finish">
                      <Row>
                        <Col xs={24} offset={0}>
                          <h4 className="sub-heading">You are all set!</h4>
                        </Col>
                        <Col xs={24} offset={0}>
                          <strong className="heading-name">
                            {defaultValue.projectName}
                          </strong>
                        </Col>
                        <Col xs={24} offset={0}>
                          <p className="para-finish-screen">
                            {defaultValue.details}
                          </p>
                          <Row>
                            <Col span={8} offset={0} className="upload-number">
                              <strong className="number">{count}</strong>
                              <br />
                              <Text className="strong-text">
                                Uploaded <br /> Document
                              </Text>
                            </Col>
                            <Col span={8} offset={0} className="floor-number">
                              <strong className="number">
                                {projectValue.floors}
                              </strong>
                              <br />
                              <Text className="strong-text">
                                Floors <br /> Identified
                              </Text>
                            </Col>
                            <Col
                              span={8}
                              offset={0}
                              className="submittal-number"
                            >
                              <strong className="number">
                                {projectValue.submittals}
                              </strong>
                              <br />
                              <Text className="strong-text">
                                Submittals <br />
                                auto created
                              </Text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={24} offset={0}>
                          <p className="para-finish-screenp">
                            We have identified {projectValue.submittals}{" "}
                            submittals from the specification document. You can
                            confirm,change, split or merge them in the next step{" "}
                            <br />
                          </p>
                          <ArrowIcon className="arrow-icon" />
                        </Col>
                        <Col span={12} offset={6}>
                          <Button
                            type="link"
                            href="/project/details/:projectId/submittals"
                            className="btn-submittals"
                          >
                            View submittals <ArrowRightOutlined />
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </div>
              )}
            </Row>
            <Row justify="center">
              <Col>
                <div className="steps-action">
                  {current === steps.length - 1 && (
                    <Button
                      className="stepper-done-btn"
                      type="primary"
                      onClick={finishClick}
                    >
                      View project
                    </Button>
                  )}

                  {skipBtn && current !== 1 && (
                    <Button
                      disabled={current === 1}
                      danger
                      className="stepper-prev-btn"
                      onClick={() => (current > 0 ? prev() : setSkipBtn(false))}
                      icon={<ArrowLeftOutlined />}
                    >
                      Prev
                    </Button>
                  )}
                  <Steps current={current}>
                    <Step title="Details" />
                    <Step title="Finish" />
                  </Steps>
                  {current < steps.length - 1 &&
                    (!cogIconProjectInput ||
                    !cogIconDetailsTextArea ||
                    !(
                      defaultValue.details.length > 0 &&
                      defaultValue.projectName.length > 0
                    ) ? (
                      <Button
                        className="stepper-next-btn"
                        type="primary"
                        disabled={
                          !cogIconProjectInput ||
                          !cogIconDetailsTextArea ||
                          !(
                            defaultValue.details.length > 0 &&
                            defaultValue.projectName.length > 0
                          )
                        }
                        onClick={() => next()}
                      >
                        {!cogIconProjectInput &&
                        !cogIconDetailsTextArea &&
                        !(
                          defaultValue.details.length === 0 &&
                          defaultValue.projectName.length === 0
                        ) ? (
                          <div id="topRight">
                            Please confirm the project name and details before
                            you can procced.
                          </div>
                        ) : (
                          toolTipHints()
                        )}
                        Next <ArrowRightOutlined />
                      </Button>
                    ) : (
                      <Button
                        className="stepper-next-btn"
                        type="primary"
                        onClick={() => next()}
                      >
                        Next <ArrowRightOutlined />
                      </Button>
                    ))}
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <Card className="card-skip">
            <Row justify="center">
              <h2 className="heading-main">
                Upload any of the document to get started!
              </h2>
            </Row>
            <Row justify="center">
              <Col>
                <Dropzone
                  defaultValue={defaultValue}
                  setCountCall={setCountCall}
                  count={count}
                  width="52"
                  height="52"
                  hexagoanStyle={hexagoanStyleScreen1}
                  setCount={setCount}
                  icon="FileDoneOutlined"
                  title="Specification Document"
                  extension={["PDF"]}
                  setSkipBtn={setSkipBtn}
                  setState={setSpecificationDoc}
                />
              </Col>
              <Col className="hexagon-drawing-set">
                <Dropzone
                  defaultValue={defaultValue}
                  setCountCall={setCountCall}
                  count={count}
                  width="52"
                  height="52"
                  hexagoanStyle={hexagoanStyleScreen1}
                  setCount={setCount}
                  icon="SettingOutlined"
                  title="Drawing Set"
                  extension={["PDF"]}
                  setSkipBtn={setSkipBtn}
                  setState={setSiteDrawing}
                />
              </Col>
            </Row>
            <Row justify="center" className="hexagon-schedule-row">
              <Col className="hexagon-schedule">
                <Dropzone
                  defaultValue={defaultValue}
                  setCountCall={setCountCall}
                  count={count}
                  width="52"
                  height="52"
                  hexagoanStyle={hexagoanStyleScreen1}
                  setCount={setCount}
                  icon="CalendarOutlined"
                  title="Schedule"
                  extension={["XLS", "XLSX", "CSV"]}
                  setSkipBtn={setSkipBtn}
                  setState={setSchedule}
                />
              </Col>
            </Row>
            <Row justify="center" className="footer-text-first-row">
              <Col>
                <p className="footer-text">
                  You can add any of these any later, but ConstructivIQ <br />{" "}
                  can help you more if you add them now.
                  <br />
                  <br />
                  <Text onClick={handleSkipEvent} className="skip-btn-text">
                    Skip this step
                  </Text>
                </p>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
    </Row>
  );
}

export default ProjectCreate;

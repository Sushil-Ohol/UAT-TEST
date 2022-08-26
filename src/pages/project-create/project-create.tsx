/* Project Create Page Component */

import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Steps,
  Form,
  Input,
  Tooltip
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "components/file-upload/file-upload";
import { useEffect, useState, useRef } from "react";
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

function ProjectCreate() {
  const [skipBtn, setSkipBtn] = useState(false);
  const dispatch = useAppDispatch();
  const { projectSug } = useAppSelector((state) => state.projectSuggest);
  const { projectValue } = useAppSelector((state) => state.projectValue);
  const [current, setCurrent] = useState(0);
  const hexagoanStyleScreen1 = {
    textSize: "12px",
    className: "icon-style1",
    hexagoanSize: 100,
    errorStyleClass: "icon-style-wrong-screen-first"
  };
  const hexagoanStyleScreen2 = {
    textSize: "8px",
    className: "icon-style2",
    hexagoanSize: 60,
    errorStyleClass: "icon-style-wrong-screen-second"
  };
  const projectInputRef: any = useRef(null);
  const [cogIconProjectInput, setCogIconProjectInput] = useState(false);
  const [cogIconDetailsTextArea, setCogIconDetailsTextArea] = useState(false);
  const [projectInputEdited, setProjectInputEdited] = useState(false);
  const [textAreaEdited, setTextAreaEdited] = useState(false);
  const { Text } = Typography;
  const { Step } = Steps;
  const [specificationDoc, setSpecificationDoc] = useState({
    title: "",
    path: ""
  });
  const [siteDrawing, setSiteDrawing] = useState({
    title: "",
    path: ""
  });
  const [schedule, setSchedule] = useState({
    title: "",
    path: ""
  });
  const steps = [
    {
      title: "Details",
      content: "Details"
    },
    {
      title: "Finish",
      content: "Finish"
    }
  ];

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
      addonAfter: (
        <CloseOutlined
          className="close-icon"
          onClick={() => {
            setSpecificationDoc({ path: "", title: "" });
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
      addonAfter: (
        <CloseOutlined
          className="close-icon"
          onClick={() => {
            setSiteDrawing({ path: "", title: "" });
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
      addonAfter: (
        <CloseOutlined
          className="close-icon"
          onClick={() => {
            setSchedule({ path: "", title: "" });
            setCount((val) => val - 1);
          }}
        />
      )
    }
  ];

  useEffect(() => {
    if (count === 0) {
      setSkipBtn(false);
    }
    setCogIconProjectInput(false);
    setCogIconDetailsTextArea(false);
    setProjectInputEdited(false);
    setTextAreaEdited(false);
  }, [count]);
  useEffect(() => {
    const Getvalue = async () => {
      await dispatch(getProjectValue());
    };
    if (current > 0) {
      Getvalue();
    }
    if (!skipBtn) {
      setSpecificationDoc({ path: "", title: "" });
      setSiteDrawing({ path: "", title: "" });
      setSchedule({ path: "", title: "" });
      setDefaultValue({
        details: "",
        projectName: ""
      });
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

  function prev() {
    if (current === 0) {
      setCogIconProjectInput(false);
      setCogIconDetailsTextArea(false);
      setProjectInputEdited(false);
      setTextAreaEdited(false);
    }
    setCurrent(current - 1);
  }

  const handleSkipEvent = () => {
    setSkipBtn(true);
    setCogIconProjectInput(false);
    setCogIconDetailsTextArea(false);
    setProjectInputEdited(false);
    setTextAreaEdited(false);
  };

  function handleProjectName(e: any) {
    setDefaultValue({ ...defaultValue, projectName: e.target.value });
    setProjectInputEdited(true);
    setCogIconProjectInput(true);
  }

  return (
    <Row justify="center">
      <Col span={24}>
        {skipBtn ? (
          <>
            {steps[current]?.content === "Details" && (
              <div className="steps-content">
                <Row justify="center">
                  <Col span={8}>
                    <Card className="details-form">
                      <h2 className="heading-details-form">
                        Creating new project / Details
                      </h2>
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
                                      style={{
                                        textAlign: "start",
                                        paddingLeft: "2%"
                                      }}
                                    >
                                      <Text>
                                        <a
                                          href="/aa"
                                          className="selected-file-link"
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
                          <Input.Group>
                            <Row>
                              <Col
                                span={
                                  projectInputEdited ||
                                  defaultValue?.projectName.length <= 0
                                    ? 22
                                    : 22
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
                                />
                              </Col>
                              {!projectInputEdited &&
                                defaultValue.projectName.length > 0 && (
                                  <Col span={2} className="wrapper-green-check">
                                    <CheckOutlined
                                      className="check-icon-details1"
                                      onClick={() => {
                                        setDefaultValue({
                                          ...defaultValue,
                                          projectName: defaultValue.projectName
                                        });
                                        setProjectInputEdited(false);
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
                                      symbol, please correct if it is wrong. You
                                      can <br /> press
                                      <CheckSquareOutlined className="hint-check-icon" />
                                      tick to confirm
                                    </p>
                                  </Col>
                                </Row>
                              )}
                            <small
                              className="error-text-project-name"
                              style={{
                                display: "inline-block",
                                position: "absolute",
                                top: "-18px",
                                left: "100px",
                                fontSize: "12px",
                                color: "#FF3535"
                              }}
                            >
                              (Please enter the project name)
                            </small>
                          </Input.Group>
                        </Form.Item>
                        <Form.Item label="Details" name="details">
                          <Input.Group>
                            <Row className="textarea">
                              <Col
                                span={
                                  textAreaEdited ||
                                  defaultValue.details.length <= 0
                                    ? 22
                                    : 22
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
                                  }}
                                  placeholder="Enter your project details"
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
                                      onClick={() =>
                                        setCogIconDetailsTextArea(true)
                                      }
                                      className="check-icon-details "
                                    />
                                  )}
                              </Col>
                            </Row>
                          </Input.Group>
                        </Form.Item>
                        <Row justify="center">
                          <Col span={20}>
                            <Row justify="center" className="hexagon-align">
                              {specificationDoc.title !==
                                "Specification Document" && (
                                <Col span={8}>
                                  <Dropzone
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
                                <Col span={8} style={{ textAlign: "center" }}>
                                  <Dropzone
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

                        {(specificationDoc.title !== "Specification Document" ||
                          siteDrawing.title !== "Drawing Set" ||
                          schedule.title !== "Schedule") && (
                          <Row justify="center">
                            <Col span={24}>
                              <p className="footer-text-second">
                                you can add any of these any later, but
                                ConstructivIQ <br /> can help you more if you
                                add them now.
                              </p>
                            </Col>
                          </Row>
                        )}
                      </Form>
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ducimus corporis ex accusantium! Qui aut,
                            voluptatibus debitis magnam rerum excepturi,
                            molestiae aspernatur odit maxime blanditiis ipsam
                            itaque perspiciatis. Doloribus, saepe. Ea eligendi
                            sed autem consequuntur neque sint maiores
                            consectetur cumque natus!
                          </p>
                          <Row justify="center">
                            <Col span={4} offset={0}>
                              <strong className="number">12</strong>
                              <br />
                              <strong>Uploaded Document</strong>
                            </Col>
                            <Col span={4} offset={3}>
                              <strong className="number">
                                {projectValue.floors}
                              </strong>
                              <br />
                              <strong>Floors Identified</strong>
                            </Col>
                            {/* <Col span={3} offset={3}>
                              <strong className="number">
                                {projectValue.materials}
                              </strong>
                              <br />
                              <strong>Materials Identified</strong>
                            </Col> */}
                            <Col span={4} offset={3}>
                              <strong className="number">
                                {projectValue.submittals}
                              </strong>
                              <br />
                              <strong>Submittals auto created</strong>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={24} offset={0}>
                          <p className="para-finish-screenp">
                            We have identified 3283 submittals from the
                            specification document. You can confirm,change,
                            split or merge them in the next step <br />
                          </p>
                          <ArrowIcon className="arrow-icon" />
                        </Col>
                        <Col span={12} offset={6}>
                          <Button type="link" className="btn-submittals">
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
                    <Button className="stepper-done-btn" type="primary">
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
                      <Tooltip
                        placement="topRight"
                        title="Please confirm the project name and details before you can procced."
                      >
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
                          Next <ArrowRightOutlined />
                        </Button>
                      </Tooltip>
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
            <Row justify="center" style={{ marginTop: "35px" }}>
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

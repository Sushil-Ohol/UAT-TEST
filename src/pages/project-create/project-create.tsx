/* Project Create Page Component */

import { Button, Card, Col, Row, Typography, Steps, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import Dropzone from "components/file-upload/file-upload";
import { useEffect, useState, useRef } from "react";
import {
  CheckOutlined,
  FileDoneOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  RadarChartOutlined,
  SelectOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";
import "./project-create.css";
import { URL } from "constants/file-constant";

function ProjectCreate() {
  const [SkipBtn, setSkipBtn] = useState(false);
  const [current, setCurrent] = useState(0);
  const ProjectInputRef: any = useRef(null);
  const [CogIconProjectInput, setCogIconProjectInput] = useState(false);
  const [CogIconDetailsTextArea, setCogIconDetailsTextArea] = useState(false);
  const [ProjectInputEdited, setProjectInputEdited] = useState(false);
  const [TextAreaEdited, setTextAreaEdited] = useState(false);
  const [projectValue, setProjectValue] = useState({
    floors: 0,
    materials: 0,
    submittals: 0
  });
  const { Text } = Typography;
  const { Step } = Steps;
  const [SpecificationDoc, setSpecificationDoc] = useState({
    title: "",
    path: ""
  });
  const [siteDrawing, setsiteDrawing] = useState({
    title: "",
    path: ""
  });
  const [schedule, setschedule] = useState({
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

  const [defaultValue, setdefaultValue] = useState({
    details: "",
    ProjectName: ""
  });

  const [count, setCount] = useState(0);
  const FileInputs = [
    {
      lable: SpecificationDoc.title,
      name: "specificationDoc",
      defaultValue: SpecificationDoc.path,
      initialValue: SpecificationDoc.path,
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
            setsiteDrawing({ path: "", title: "" });
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
            setschedule({ path: "", title: "" });
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
      const result = await axios.get(`${URL}/value`);
      setProjectValue({ ...result.data });
    };
    if (current > 0) {
      Getvalue();
    }
    if (!SkipBtn) {
      setSpecificationDoc({ path: "", title: "" });
      setsiteDrawing({ path: "", title: "" });
      setschedule({ path: "", title: "" });
      setdefaultValue({
        details: "",
        ProjectName: ""
      });
    }
  }, [current, SkipBtn]);

  const next = async () => {
    if (defaultValue.ProjectName.length > 0 && CogIconProjectInput) {
      setCurrent(current + 1);
    }
    ProjectInputRef.current.focus();
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

  const HandleSkipEvent = () => {
    setSkipBtn(true);
    setCogIconProjectInput(false);
    setCogIconDetailsTextArea(false);
    setProjectInputEdited(false);
    setTextAreaEdited(false);
  };

  function HandleProjectName(e: any) {
    setdefaultValue({ ...defaultValue, ProjectName: e.target.value });
    setProjectInputEdited(true);
    setCogIconProjectInput(true);
  }

  return (
    <Row justify="center">
      <Col span={24}>
        {SkipBtn ? (
          <>
            {steps[current]?.content === "Details" && (
              <div className="steps-content">
                <Row justify="center">
                  <Col span={8}>
                    <Card className="details-form">
                      <h2>Creating new project / Details</h2>
                      <Form layout="vertical" autoComplete="off">
                        {FileInputs?.map((item: any) => {
                          return (
                            item.lable.length > 0 && (
                              <Form.Item
                                key={item.name}
                                className="file-input"
                                label={item.lable}
                                name={item.name}
                              >
                                <Input.Group>
                                  <Row>
                                    <Col span={22}>
                                      <Input
                                        defaultValue={item.defaultValue}
                                        readOnly
                                        addonAfter={
                                          <a
                                            href="https://www.google.com"
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <SelectOutlined className="icon-blue" />
                                          </a>
                                        }
                                        prefix={<FileDoneOutlined />}
                                        placeholder="input placeholder"
                                      />
                                    </Col>
                                    <Col span={2}>{item.addonAfter}</Col>
                                  </Row>
                                </Input.Group>
                              </Form.Item>
                            )
                          );
                        })}
                        <Form.Item label="Project Name" name="projectname">
                          <Input.Group>
                            <Row>
                              <Col
                                span={
                                  ProjectInputEdited ||
                                  defaultValue.ProjectName.length <= 0
                                    ? 24
                                    : 22
                                }
                              >
                                {!ProjectInputEdited &&
                                  !CogIconProjectInput &&
                                  defaultValue.ProjectName.length > 0 && (
                                    <RadarChartOutlined className="cog-details" />
                                  )}
                                <Input
                                  ref={ProjectInputRef}
                                  type="text"
                                  value={defaultValue.ProjectName}
                                  placeholder="Enter the project name"
                                  onChange={(e) => HandleProjectName(e)}
                                />
                              </Col>
                              <Col span={2}>
                                {!ProjectInputEdited &&
                                  defaultValue.ProjectName.length > 0 && (
                                    <CheckOutlined
                                      className="check-icon-details"
                                      onClick={() => {
                                        setdefaultValue({
                                          ...defaultValue,
                                          ProjectName: defaultValue.ProjectName
                                        });
                                        setProjectInputEdited(false);
                                        setCogIconProjectInput(true);
                                      }}
                                    />
                                  )}
                              </Col>
                            </Row>
                            {defaultValue.ProjectName.length > 0 &&
                              (SpecificationDoc.path.length > 0 ||
                                siteDrawing.path.length > 0 ||
                                schedule.path.length > 0) &&
                              !ProjectInputEdited && (
                                <Row>
                                  <Col>
                                    <p className="project-name-hint">
                                      We guessed this name from your{" "}
                                      Specification Document. So it has the
                                      <RadarChartOutlined />
                                      symbol,
                                      <br />
                                      please correct if it is wrong. You can
                                      press
                                      <CheckSquareOutlined className="hint-check-icon" />
                                      tick to confirm
                                    </p>
                                  </Col>
                                </Row>
                              )}
                          </Input.Group>
                        </Form.Item>
                        <Form.Item label="Details" name="details">
                          <Input.Group>
                            <Row>
                              <Col
                                span={
                                  TextAreaEdited ||
                                  defaultValue.details.length <= 0
                                    ? 24
                                    : 22
                                }
                              >
                                <TextArea
                                  rows={2}
                                  value={defaultValue.details}
                                  onChange={(e) => {
                                    setdefaultValue({
                                      ...defaultValue,
                                      details: e.target.value
                                    });
                                    setTextAreaEdited(true);
                                    setCogIconDetailsTextArea(true);
                                  }}
                                  placeholder="enter your project details"
                                />
                                {!TextAreaEdited &&
                                  !CogIconDetailsTextArea &&
                                  defaultValue.details.length > 0 && (
                                    <RadarChartOutlined className="cog-details" />
                                  )}
                              </Col>
                              <Col span={2}>
                                {!TextAreaEdited &&
                                  defaultValue.details.length > 0 && (
                                    <CheckOutlined
                                      onClick={() =>
                                        setCogIconDetailsTextArea(true)
                                      }
                                      className="check-icon-details"
                                    />
                                  )}
                              </Col>
                            </Row>
                          </Input.Group>
                        </Form.Item>
                        <Row justify="center">
                          <Col span={20}>
                            <Row justify="center">
                              {SpecificationDoc.title !==
                                "Specification Document" && (
                                <Col>
                                  <Dropzone
                                    setdefaultValue={setdefaultValue}
                                    setCount={setCount}
                                    icon="FileDoneOutlined"
                                    title="Specification Document"
                                    extension={["pdf"]}
                                    setSkipBtn={setSkipBtn}
                                    setState={setSpecificationDoc}
                                  />
                                </Col>
                              )}
                              {siteDrawing.title !== "Drawing Set" && (
                                <Col offset={1}>
                                  <Dropzone
                                    setdefaultValue={setdefaultValue}
                                    setCount={setCount}
                                    icon="SettingOutlined"
                                    title="Drawing Set"
                                    extension={["pdf"]}
                                    setSkipBtn={setSkipBtn}
                                    setState={setsiteDrawing}
                                  />
                                </Col>
                              )}

                              {schedule.title !== "Schedule" && (
                                <Col
                                  className={
                                    SpecificationDoc.path.length <= 0 &&
                                    siteDrawing.path.length <= 0
                                      ? "schedule-hexagoan"
                                      : ""
                                  }
                                  offset={1}
                                >
                                  <Dropzone
                                    setdefaultValue={setdefaultValue}
                                    setCount={setCount}
                                    icon="CalendarOutlined"
                                    title="Schedule"
                                    extension={["xls", "xlsx", "csv"]}
                                    setSkipBtn={setSkipBtn}
                                    setState={setschedule}
                                  />
                                </Col>
                              )}
                            </Row>
                          </Col>
                        </Row>

                        <Row justify="center">
                          <Col span={24}>
                            <p className="footer-text">
                              you can add any of these any later, but
                              ConstructivIQ <br /> can help you more if you add
                              them now.
                            </p>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
            <Row>
              {steps[current].content === "Finish" && (
                <div className="steps-content">
                  <Col span={24}>
                    <Card className="card-finish">
                      <Row>
                        <Col span={12} offset={6}>
                          <h4 className="sub-heading">You are all set!</h4>
                        </Col>
                        <Col span={12} offset={6}>
                          <strong className="heading-hospital-name">
                            {defaultValue.ProjectName}
                          </strong>
                        </Col>
                        <Col span={12} offset={6}>
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
                            <Col span={3} offset={0}>
                              <strong className="number">12</strong>
                              <br />
                              <strong>Uploaded Document</strong>
                            </Col>
                            <Col span={3} offset={3}>
                              <strong className="number">
                                {projectValue.floors}
                              </strong>
                              <br />
                              <strong>Floors Identified</strong>
                            </Col>
                            <Col span={3} offset={3}>
                              <strong className="number">
                                {projectValue.materials}
                              </strong>
                              <br />
                              <strong>Materials Identified</strong>
                            </Col>
                            <Col span={4} offset={3}>
                              <strong className="number">
                                {projectValue.submittals}
                              </strong>
                              <br />
                              <strong>Submittals auto created</strong>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={12} offset={6}>
                          <p className="para-finish-screenp">
                            We have identified 3283 submittals from the
                            specification document. You can confirm,change,
                            split or merge them in the next step <br />
                          </p>
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
                  {current < steps.length - 1 && (
                    <Button
                      className="stepper-next-btn"
                      type="primary"
                      onClick={() => next()}
                    >
                      Next <ArrowRightOutlined />
                    </Button>
                  )}
                  <Steps current={current}>
                    <Step title="Details" />
                    <Step title="Finish" />
                  </Steps>

                  {SkipBtn && current !== 1 && (
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
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <Card className="card-skip">
            <Row justify="center">
              <h2>Upload any of the document to get started!</h2>
            </Row>
            <Row justify="center">
              <Col>
                <Dropzone
                  setdefaultValue={setdefaultValue}
                  setCount={setCount}
                  icon="FileDoneOutlined"
                  title="Specification Document"
                  extension={["pdf"]}
                  setSkipBtn={setSkipBtn}
                  setState={setSpecificationDoc}
                />
              </Col>
              <Col className="hexagon-drawing-set">
                <Dropzone
                  setdefaultValue={setdefaultValue}
                  setCount={setCount}
                  icon="SettingOutlined"
                  title="Drawing Set"
                  extension={["pdf"]}
                  setSkipBtn={setSkipBtn}
                  setState={setsiteDrawing}
                />
              </Col>
            </Row>
            <Row justify="center" className="hexagon-schedule-row">
              <Col className="hexagon-schedule">
                <Dropzone
                  setdefaultValue={setdefaultValue}
                  setCount={setCount}
                  icon="CalendarOutlined"
                  title="Schedule"
                  extension={["xls", "xlsx", "csv"]}
                  setSkipBtn={setSkipBtn}
                  setState={setschedule}
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <p className="footer-text">
                  You can add any of these any later, but ConstructivIQ <br />{" "}
                  can help you more if you add them now.
                  <br />
                  <Button
                    type="text"
                    className="skip-btn"
                    onClick={HandleSkipEvent}
                  >
                    <Text strong>Skip this step</Text>
                  </Button>
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

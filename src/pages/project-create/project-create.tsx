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

function ProjectCreate() {
  const [SkipBtn, setSkipBtn] = useState(false);
  const [current, setCurrent] = useState(0);
  const ProjectNameRef: any = useRef(null);
  const [CogIconProject, setCogIconProject] = useState(false);
  const [CogIconDetails, setCogIconDetails] = useState(false);
  const [InputEdited, setInputEdited] = useState(false);
  const [DetailsEdited, setDetailsEdited] = useState(false);
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
  const IconStyle: any = {
    color: "grey",
    display: "inline-block",
    position: "absolute",
    top: "65px",
    left: "55px",
    fontSize: "30px",
    textSize: "12px"
  };

  const [defaultValue, setdefaultValue] = useState({
    details: "",
    ProjectName: ""
  });

  const [count, setCount] = useState(0);
  const defaultInputvalue = [
    {
      lable: SpecificationDoc.title,
      name: "specificationDoc",
      defaultValue: SpecificationDoc.path,
      initialValue: SpecificationDoc.path,
      addonAfter: (
        <CloseOutlined
          className="CloseIcon"
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
          className="CloseIcon"
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
          className="CloseIcon"
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
    setCogIconProject(false);
    setCogIconDetails(false);
    setInputEdited(false);
    setDetailsEdited(false);
  }, [count]);
  useEffect(() => {
    const Getvalue = async () => {
      const result = await axios.get("http://localhost:5000/api/v1/value");
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
    if (defaultValue.ProjectName.length > 0 && CogIconProject) {
      setCurrent(current + 1);
    }
    ProjectNameRef.current.focus();
  };

  function prev() {
    if (current === 0) {
      setCogIconProject(false);
      setCogIconDetails(false);
      setInputEdited(false);
      setDetailsEdited(false);
    }
    setCurrent(current - 1);
  }

  const HandleSkipEvent = () => {
    setSkipBtn(true);
    setCogIconProject(false);
    setCogIconDetails(false);
    setInputEdited(false);
    setDetailsEdited(false);
  };

  function HandleProjectName(e: any) {
    setdefaultValue({ ...defaultValue, ProjectName: e.target.value });
    setInputEdited(true);
    setCogIconProject(true);
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
                    <Card className="detailsForm">
                      <h2>Creating new project / Details</h2>
                      <Form layout="vertical" autoComplete="off">
                        {defaultInputvalue?.map((item: any) => {
                          return (
                            item.lable.length > 0 && (
                              <Form.Item
                                key={item.name}
                                className="FileInput"
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
                                            <SelectOutlined className="IconBlue" />
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
                                  InputEdited ||
                                  defaultValue.ProjectName.length <= 0
                                    ? 24
                                    : 22
                                }
                              >
                                {!InputEdited &&
                                  !CogIconProject &&
                                  defaultValue.ProjectName.length > 0 && (
                                    <RadarChartOutlined className="cogDetails" />
                                  )}
                                <Input
                                  ref={ProjectNameRef}
                                  type="text"
                                  value={defaultValue.ProjectName}
                                  placeholder="Enter the project name"
                                  onChange={(e) => HandleProjectName(e)}
                                />
                              </Col>
                              <Col span={2}>
                                {!InputEdited &&
                                  defaultValue.ProjectName.length > 0 && (
                                    <CheckOutlined
                                      className="CheckIconDetails"
                                      onClick={() => {
                                        setdefaultValue({
                                          ...defaultValue,
                                          ProjectName: defaultValue.ProjectName
                                        });
                                        setInputEdited(false);
                                        setCogIconProject(true);
                                      }}
                                    />
                                  )}
                              </Col>
                            </Row>
                            {defaultValue.ProjectName.length > 0 &&
                              (SpecificationDoc.path.length > 0 ||
                                siteDrawing.path.length > 0 ||
                                schedule.path.length > 0) &&
                              !InputEdited && (
                                <Row>
                                  <Col>
                                    <p className="projectnamehint">
                                      We guessed this name from your{" "}
                                      Specification Document. So it has the
                                      <RadarChartOutlined />
                                      symbol,
                                      <br />
                                      please correct if it is wrong. You can
                                      press
                                      <CheckSquareOutlined className="hintcheckicon" />
                                      tick to confirm
                                    </p>
                                  </Col>
                                </Row>
                              )}
                          </Input.Group>
                        </Form.Item>
                        <Form.Item
                          label="Details"
                          name="details"
                          style={{ position: "relative" }}
                        >
                          <Input.Group>
                            <Row>
                              <Col
                                span={
                                  DetailsEdited ||
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
                                    setDetailsEdited(true);
                                    setCogIconDetails(true);
                                  }}
                                  placeholder="enter your project details"
                                  style={{
                                    width: "100%",
                                    textAlign: "justify"
                                  }}
                                />
                                {!DetailsEdited &&
                                  !CogIconDetails &&
                                  defaultValue.details.length > 0 && (
                                    <RadarChartOutlined className="cogDetails" />
                                  )}
                              </Col>

                              <Col span={2}>
                                {!DetailsEdited &&
                                  defaultValue.details.length > 0 && (
                                    <CheckOutlined
                                      onClick={() => setCogIconDetails(true)}
                                      className="CheckIconDetails"
                                    />
                                  )}
                              </Col>
                            </Row>
                          </Input.Group>
                        </Form.Item>
                        <Row justify="center">
                          <Col span={20}>
                            <Row
                              justify="center"
                              style={{ position: "relative" }}
                            >
                              {SpecificationDoc.title !==
                                "Specification Document" && (
                                <Col>
                                  <Dropzone
                                    setdefaultValue={setdefaultValue}
                                    setCount={setCount}
                                    icon="FileDoneOutlined"
                                    IconStyle={IconStyle}
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
                                    IconStyle={IconStyle}
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
                                      ? "scheduleHexagoan"
                                      : ""
                                  }
                                  offset={1}
                                >
                                  <Dropzone
                                    setdefaultValue={setdefaultValue}
                                    setCount={setCount}
                                    icon="CalendarOutlined"
                                    IconStyle={IconStyle}
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
                            <p className="footerText">
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
                    <Card className="CardFinish">
                      <Row>
                        <Col span={12} offset={6}>
                          <h4 className="subHeading">You are all set!</h4>
                        </Col>
                        <Col span={12} offset={6}>
                          <strong className="HeadingHospitalName">
                            {defaultValue.ProjectName}
                          </strong>
                        </Col>
                        <Col span={12} offset={6}>
                          <p className="ParaFinishScreen1">
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
                              <strong className="Number">12</strong>
                              <br />
                              <strong>Uploaded Document</strong>
                            </Col>
                            <Col span={3} offset={3}>
                              <strong className="Number">
                                {projectValue.floors}
                              </strong>
                              <br />
                              <strong>Floors Identified</strong>
                            </Col>
                            <Col span={3} offset={3}>
                              <strong className="Number">
                                {projectValue.materials}
                              </strong>
                              <br />
                              <strong>Materials Identified</strong>
                            </Col>
                            <Col span={4} offset={3}>
                              <strong className="Number">
                                {projectValue.submittals}
                              </strong>
                              <br />
                              <strong>Submittals auto created</strong>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={12} offset={6}>
                          <p className="ParaFinishScreen2">
                            We have identified 3283 submittals from the
                            specification document. You can confirm,change,
                            split or merge them in the next step <br />
                          </p>
                        </Col>
                        <Col span={12} offset={6}>
                          <Button type="link" className="btnsubmittals">
                            View submittals <ArrowRightOutlined />
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </div>
              )}
            </Row>
            <Row justify="center" style={{ position: "relative" }}>
              <Col>
                <div className="steps-action">
                  {current === steps.length - 1 && (
                    <Button className="stepperDoneBtn" type="primary">
                      View project
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button
                      className="stepperNextBtn"
                      style={{ display: "inline" }}
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

                  {SkipBtn && (
                    <Button
                      disabled={current === 1}
                      danger
                      className="stepperPrevBtn"
                      style={{ display: "flex", alignItems: "center" }}
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
          <Card className="Cardskip">
            <Row justify="center">
              <h2>Upload any of the document to get started!</h2>
            </Row>
            <Row justify="center" style={{ position: "relative" }}>
              <Col>
                <Dropzone
                  setdefaultValue={setdefaultValue}
                  setCount={setCount}
                  icon="FileDoneOutlined"
                  IconStyle={IconStyle}
                  title="Specification Document"
                  extension={["pdf"]}
                  setSkipBtn={setSkipBtn}
                  setState={setSpecificationDoc}
                />
              </Col>
              <Col style={{ marginLeft: "1%" }}>
                <Dropzone
                  setdefaultValue={setdefaultValue}
                  setCount={setCount}
                  icon="SettingOutlined"
                  IconStyle={IconStyle}
                  title="Drawing Set"
                  extension={["pdf"]}
                  setSkipBtn={setSkipBtn}
                  setState={setsiteDrawing}
                />
              </Col>
            </Row>
            <Row
              justify="center"
              style={{ height: "150px", position: "relative" }}
            >
              <Col
                style={{
                  height: "190px",
                  position: "absolute",
                  top: "-40px"
                }}
              >
                <Dropzone
                  setdefaultValue={setdefaultValue}
                  setCount={setCount}
                  icon="CalendarOutlined"
                  IconStyle={IconStyle}
                  title="Schedule"
                  extension={["xls", "xlsx", "csv"]}
                  setSkipBtn={setSkipBtn}
                  setState={setschedule}
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <p className="footerText">
                  You can add any of these any later, but ConstructivIQ <br />{" "}
                  can help you more if you add them now.
                  <br />
                  <Button
                    type="text"
                    className="skipBtn"
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

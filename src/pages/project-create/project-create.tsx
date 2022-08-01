/* Project Create Page Component */

import { Button, Card, Col, Row, Typography, Steps, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "components/file-upload/file-upload";
import { useEffect, useState } from "react";
import {
  CheckOutlined,
  FileDoneOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  RadarChartOutlined,
  SelectOutlined
} from "@ant-design/icons";
import "./project-create.css";

function ProjectCreate() {
  const [SkipBtn, setSkipBtn] = useState(false);
  const [current, setCurrent] = useState(0);

  const [CogIconProject, setCogIconProject] = useState(false);
  const [CogIconDetails, setCogIconDetails] = useState(false);
  const [InputEdited, setInputEdited] = useState(false);
  const [DetailsEdited, setDetailsEdited] = useState(false);
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
    top: "80px",
    left: "73px",
    fontSize: "30px"
  };
  const defaultValue = {
    details:
      "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint qui nulla necessitatibus odit ratione atque reiciendis delectus exercitationem omnis. Illo mollitia placeat dicta voluptatem amet rem repellendus, explicabo id.",
    ProjectName: "Project demo",
    FileName: "sample.pdf"
  };
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
  }, [count]);
  const next = () => {
    setCurrent(current + 1);
  };

  function prev() {
    setCurrent(current - 1);
  }

  const HandleSkipEvent = () => {
    setSkipBtn(true);
    setCogIconProject(false);
    setCogIconDetails(false);
    setInputEdited(false);
    setDetailsEdited(false);
  };

  return (
    <Row justify="center">
      <Col span={24}>
        {SkipBtn ? (
          <>
            {steps[current]?.content === "Details" && (
              <div className="steps-content">
                <Row justify="center">
                  <Col span={10}>
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
                                initialValue={item.initialValue}
                              >
                                <Input.Group>
                                  <Row>
                                    <Col span={22}>
                                      <Input
                                        defaultValue={item.defaultValue}
                                        readOnly
                                        addonAfter={
                                          <SelectOutlined className="IconBlue" />
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

                        <Input.Group>
                          <Form.Item label="Project Name" name="projectname">
                            <Row>
                              <Col span={InputEdited ? 24 : 22}>
                                {!InputEdited && !CogIconProject && (
                                  <RadarChartOutlined className="cogDetails" />
                                )}
                                <Input
                                  type="text"
                                  defaultValue={defaultValue.ProjectName}
                                  placeholder="input placeholder"
                                  onChange={() => {
                                    setInputEdited(true);
                                    setCogIconProject(true);
                                  }}
                                />
                              </Col>
                              <Col span={2}>
                                {!InputEdited && (
                                  <CheckOutlined
                                    className="CheckIconDetails"
                                    onClick={() => setCogIconProject(true)}
                                  />
                                )}
                              </Col>
                            </Row>
                          </Form.Item>
                        </Input.Group>
                        <Input.Group>
                          <Form.Item
                            label="Details"
                            name="details"
                            initialValue={defaultValue.details}
                            style={{ position: "relative" }}
                          >
                            <Row>
                              <Col span={DetailsEdited ? 24 : 22}>
                                <TextArea
                                  defaultValue={defaultValue.details}
                                  rows={6}
                                  onChange={() => {
                                    setDetailsEdited(true);
                                    setCogIconDetails(true);
                                  }}
                                  placeholder="enter your project details"
                                  style={{
                                    width: "100%",
                                    textAlign: "justify"
                                  }}
                                />
                                {!DetailsEdited && !CogIconDetails && (
                                  <RadarChartOutlined className="cogDetails" />
                                )}
                              </Col>

                              <Col span={2}>
                                {!DetailsEdited && (
                                  <CheckOutlined
                                    onClick={() => setCogIconDetails(true)}
                                    className="CheckIconDetails"
                                  />
                                )}
                              </Col>
                            </Row>
                          </Form.Item>
                        </Input.Group>
                        <Row justify="center" style={{ position: "relative" }}>
                          {SpecificationDoc.title !==
                            "Specification Document" && (
                            <Col>
                              <Dropzone
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
                          {siteDrawing.title !== "Site Drawing" && (
                            <Col offset={1}>
                              <Dropzone
                                setCount={setCount}
                                icon="SettingOutlined"
                                IconStyle={IconStyle}
                                title="Site Drawing"
                                extension={["pdf"]}
                                setSkipBtn={setSkipBtn}
                                setState={setsiteDrawing}
                              />
                            </Col>
                          )}
                          {schedule.title !== "Schedule" && (
                            <Col offset={1}>
                              <Dropzone
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

                        <Row justify="center">
                          <Col span={24}>
                            <p className="footerText">
                              you can add any of these any later, but
                              ConstructivIQ <br /> can helpyou more if you add
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
                            Northgate Hospital
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
                              <strong>12</strong> <br />
                              <strong>Uploaded Document</strong>
                            </Col>
                            <Col span={3} offset={3}>
                              <strong>9</strong> <br />
                              <strong>Floors Identified</strong>
                            </Col>
                            <Col span={3} offset={3}>
                              <strong>193</strong> <br />
                              <strong>Materials Identified</strong>
                            </Col>
                            <Col span={4} offset={3}>
                              <strong>2383</strong> <br />
                              <strong>Submittals auto created</strong>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={12} offset={6}>
                          <p className="ParaFinishScreen2">
                            We have identified 3283 submittals from the
                            specification document. You can confirm,change,
                            split or merge them in the next step
                          </p>
                        </Col>
                        <Col span={12} offset={6}>
                          <Button type="link">
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
                  setCount={setCount}
                  icon="FileDoneOutlined"
                  IconStyle={IconStyle}
                  title="Specification Document"
                  extension={["pdf"]}
                  setSkipBtn={setSkipBtn}
                  setState={setSpecificationDoc}
                />
              </Col>
              <Col offset={1}>
                <Dropzone
                  setCount={setCount}
                  icon="SettingOutlined"
                  IconStyle={IconStyle}
                  title="Site Drawing"
                  extension={["pdf"]}
                  setSkipBtn={setSkipBtn}
                  setState={setsiteDrawing}
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Dropzone
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
                  can helpyou more if you add them now.
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

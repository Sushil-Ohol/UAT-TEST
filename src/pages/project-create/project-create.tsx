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
  CloseOutlined
} from "@ant-design/icons";
import "./project-create.css";

function ProjectCreate() {
  const [SkipBtn, setSkipBtn] = useState(false);
  const [current, setCurrent] = useState(0);
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
  };

  return (
    <Row justify="center">
      <Col span={10} offset={0}>
        {SkipBtn ? (
          <>
            {steps[current]?.content === "Details" && (
              <div className="steps-content">
                <Card className="detailsForm">
                  <h2>Creating new project / Details</h2>
                  <Form layout="vertical" autoComplete="off">
                    {defaultInputvalue.map((item: any) => {
                      return (
                        item.lable.length > 0 && (
                          <Form.Item
                            key={item.name}
                            className="FileInput"
                            label={item.lable}
                            name={item.name}
                            initialValue={item.initialValue}
                          >
                            <Input
                              defaultValue={item.path}
                              readOnly
                              addonAfter={item.addonAfter}
                              prefix={<FileDoneOutlined />}
                              placeholder="input placeholder"
                            />
                          </Form.Item>
                        )
                      );
                    })}

                    <Form.Item
                      label="Project Name"
                      name="username"
                      initialValue={defaultValue.ProjectName}
                    >
                      <Input
                        placeholder="input placeholder"
                        addonAfter={<CheckOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Details"
                      name="details"
                      initialValue={defaultValue.details}
                    >
                      <TextArea
                        rows={4}
                        placeholder="enter your project details"
                        maxLength={6}
                      />
                    </Form.Item>
                    <Row justify="center" style={{ position: "relative" }}>
                      {SpecificationDoc.title !== "Specification Document" && (
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
                          you can add any of these any later, but ConstructivIQ{" "}
                          <br /> can helpyou more if you add them now.
                        </p>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </div>
            )}
            <Row>
              {steps[current].content === "Finish" && (
                <div className="steps-content">
                  <h1>Finish component</h1>
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
                      onClick={() => prev()}
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
              <strong>Upload any of the document to get started!</strong>
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

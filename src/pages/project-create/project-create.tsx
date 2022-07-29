/* Project Create Page Component */

import { Button, Card, Col, Row, Typography } from "antd";
import Dropzone from "components/file-upload/file-upload";

import "./project-create.css";

function ProjectCreate() {
  const { Text } = Typography;
  const IconStyle: any = {
    color: "grey",
    display: "inline-block",
    position: "absolute",
    top: "80px",
    left: "73px",
    fontSize: "30px"
  };
  return (
    <Row justify="center">
      <Col span={24} offset={0}>
        <Card className="Cardskip">
          <Row justify="center">
            <strong>Upload any of the document to get started!</strong>
          </Row>
          <Row justify="center" style={{ position: "relative" }}>
            <Col>
              <Dropzone
                icon="FileDoneOutlined"
                IconStyle={IconStyle}
                title="Specification Document"
                extension={["pdf"]}
              />
            </Col>
            <Col offset={1}>
              <Dropzone
                icon="SettingOutlined"
                IconStyle={IconStyle}
                title="Site Drawing"
                extension={["pdf"]}
              />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Dropzone
                icon="CalendarOutlined"
                IconStyle={IconStyle}
                title="Schedule"
                extension={["xls", "xlsx", "csv"]}
              />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <p className="footerText">
                You can add any of these any later, but ConstructivIQ <br /> can
                helpyou more if you add them now.
                <br />
                <Button type="text" className="skipBtn">
                  <Text strong>Skip this step</Text>
                </Button>
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default ProjectCreate;

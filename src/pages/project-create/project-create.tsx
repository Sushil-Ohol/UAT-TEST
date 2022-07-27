/* Project Create Page Component */
import { Button, Card, Col, Row, Typography } from "antd";
import Dropzone from "components/file-upload/file-upload";

function ProjectCreate() {
  const { Text } = Typography;

  return (
    <Row>
      <Col span={10} offset={7}>
        <Card style={{ width: "100%" }}>
          <Row justify="center">
            <strong>Upload any of the document to get started!</strong>
          </Row>
          <Row justify="center" style={{ position: "relative" }}>
            <Col>
              <Dropzone title="Specification Document" extension={["pdf"]} />
            </Col>
            <Col offset={1}>
              <Dropzone title="Site Drawing" extension={["pdf"]} />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Dropzone title="Schedule" extension={["xls", "xlsx", "csv"]} />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <p className="footerText">
                you can add any of these any later, but ConstructivIQ <br /> can
                helpyou more if you add them now.
                <br />
                <Button type="text">
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

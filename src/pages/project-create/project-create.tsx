/* Project Create Page Component */
import { Button, Card, Col, Row, Typography } from "antd";
import Dropzone from "components/file-upload/file-upload";

import "./project-create.css";

function ProjectCreate() {
  const { Text } = Typography;
  // const [FileError, setFileError] = useState("");
  return (
    <Row justify="center">
      {/* <Col span={8} offset={3}>
        {" "}
        {FileError && (
          <small style={{ color: "red", textAlign: "center" }}>
            {FileError}
          </small>
        )}
      </Col> */}
      <Col span={24} offset={0}>
        <Card className="Cardskip">
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

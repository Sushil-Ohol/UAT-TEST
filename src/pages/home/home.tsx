import { Button, Col, Row } from "antd";
import "./home.css";
/* Home Page Component */
function HomePage() {
  return (
    <Row className="container-home-page">
      <Col>
        <h1>Welcome To ConstructivIQ</h1>
      </Col>
      <a href="/projects" rel="noopener noreferrer">
        <Button>See All Projects</Button>
      </a>
    </Row>
  );
}

export default HomePage;

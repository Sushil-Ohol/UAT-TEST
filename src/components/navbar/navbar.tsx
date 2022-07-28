/* Navigation Component */
import { Col, PageHeader, Row } from "antd";
import "./navbar.css";

function Nav() {
  return (
    <Row className="Navbar">
      <Col span={2} offset={0}>
        <span className="brandName">
          Constructiv<strong>IQ</strong>
        </span>
      </Col>
      <Col span={17} offset={1}>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="All Projects"
          subTitle="Creating new project"
        />
      </Col>
      <Col
        span={3}
        offset={1}
        style={{ textAlign: "end", paddingRight: "10px" }}
      />
    </Row>
  );
}
export default Nav;

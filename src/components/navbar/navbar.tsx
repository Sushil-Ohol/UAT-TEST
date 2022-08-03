/* Navigation Component */
import { Col, Row, PageHeader } from "antd";
import Menus from "./menus";
import "./navbar.css";

function Nav() {
  return (
    <Row className="Navbar">
      <Col span={2} offset={0}>
        <span className="brandName">
          Constructiv<strong>IQ</strong>
        </span>
      </Col>
      <Col span={4} offset={1}>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="All Projects"
          subTitle="Creating new project"
        />
      </Col>
      <Col span={12} offset={2}>
        <Menus />
      </Col>
      <Col
        span={1}
        offset={1}
        style={{ textAlign: "end", paddingRight: "10px" }}
      />
    </Row>
  );
}

export default Nav;

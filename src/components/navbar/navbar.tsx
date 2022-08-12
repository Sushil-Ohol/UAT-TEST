/* Navigation Component */
import { Col, Row, PageHeader } from "antd";
import Menus from "./menus";
import "./navbar.css";

function Nav() {
  return (
    <Row className="navbar">
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
      <Col span={11} offset={6}>
        <Menus />
      </Col>
    </Row>
  );
}

export default Nav;

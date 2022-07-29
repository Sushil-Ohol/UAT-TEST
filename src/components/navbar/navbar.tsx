/* Navigation Component */
import { UserOutlined } from "@ant-design/icons";
import { Menu, Col, Row, PageHeader } from "antd";
import { Link } from "react-router-dom";
import "./navbar.css";

function Nav() {
  const style = { color: "black" };
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
        <Menu mode="horizontal" style={{ float: "right", width: "100%" }}>
          <Link to="project">
            <Menu.Item key="keys2" style={style}>
              Project
            </Menu.Item>
          </Link>
          <Link to="Secification">
            <Menu.Item key="keys3" style={style}>
              Specification
            </Menu.Item>
          </Link>
          <Link to="/floors">
            <Menu.Item key="keys4" style={style}>
              Floors
            </Menu.Item>
          </Link>
          <Link to="/Schedule">
            <Menu.Item key="keys5" style={style}>
              Schedule
            </Menu.Item>
          </Link>
          <Link to="/materials">
            <Menu.Item key="keys6" style={style}>
              Materials
            </Menu.Item>
          </Link>
          <Link to="/submittals">
            <Menu.Item key="keys7" style={style}>
              Submittals
            </Menu.Item>
          </Link>
          <Menu.Item key="keys7" style={style}>
            <UserOutlined className="UserOutlined" />
          </Menu.Item>
        </Menu>
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

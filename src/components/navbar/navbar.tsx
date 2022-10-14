/* Navigation Component */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Row, Col, Button, PageHeader, Space } from "antd";
import { useAppDispatch, useAppSelector } from "store";
import { useHistory, useLocation } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import { setSubmittalList } from "store/slices/submittalsSlices";
import { AppLogoIcon } from "components/svg-icons";
import { slugToText } from "utils/stringutil";
import { AccountMenu } from "components";
import Menus from "./menus";
import "./navbar.css";

function Nav() {
  const dispatch = useAppDispatch();
  const { projectId } = useAppSelector((state) => state.homeState);
  const auth = useAppSelector((state) => state.auth);
  const history = useHistory();
  const location = useLocation();

  return (
    <Row className="navbar">
      <Col className="brand-name navbarCol">
        <a href="/">
          <AppLogoIcon />
        </a>
      </Col>
      <Col
        flex="84.65%"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            location.pathname === "/projects" ||
            location.pathname === "/project/new"
              ? "flex-end"
              : "space-between"
        }}
      >
        {projectId !== "" && (
          <PageHeader
            className="site-page-header"
            backIcon={
              <span>
                <ArrowLeftOutlined />
                <span className="back-button-label">All projects</span>
              </span>
            }
            onBack={() => {
              dispatch(setProjectId(""));
              dispatch(setSubmittalList([]));
              history.push("/projects");
            }}
            title={slugToText(projectId)}
          />
        )}
        <Space>
          {projectId !== "" && (
            <div style={{ width: "43.19vw" }}>
              <Menus projectId={projectId} />
            </div>
          )}
          {location.pathname === "/projects" && (
            <div style={{ float: "right" }}>
              <Button
                style={{ margin: "6px" }}
                onClick={() => history.push("/project/new")}
              >
                New Project
              </Button>
            </div>
          )}
          {auth.currentUser && (
            <div style={{ float: "right" }}>
              <AccountMenu />
            </div>
          )}
        </Space>
      </Col>
    </Row>
  );
}

export default Nav;

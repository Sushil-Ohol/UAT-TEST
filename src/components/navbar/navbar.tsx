/* Navigation Component */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Row, Col, Button, PageHeader, Divider } from "antd";
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
      <Col span={3} className="brand-name navbarCol">
        <a href="/">
          <AppLogoIcon />
        </a>
      </Col>
      {projectId !== "" && (
        <>
          <Divider type="vertical" style={{ height: "auto" }} />
          <Col xl={{ span: 5 }} xxl={{ span: 4 }} className="navbarCol">
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
          </Col>
        </>
      )}
      {projectId !== "" && (
        <Col xl={{ span: 14 }} xxl={{ span: 15 }} className="navbarCol">
          <div style={{ width: "100%" }}>
            <Menus projectId={projectId} />
          </div>
        </Col>
      )}

      {location.pathname === "/projects" && (
        <Col span={3} offset={16} className="navbarCol">
          <div style={{ float: "right" }}>
            <Button
              style={{ margin: "6px" }}
              onClick={() => history.push("/project/new")}
            >
              New Project
            </Button>
          </div>
        </Col>
      )}
      {auth.currentUser && (
        <Col span={1} className="navbarCol">
          <div style={{ float: "right" }}>
            <AccountMenu />
          </div>
        </Col>
      )}
    </Row>
  );
}

export default Nav;

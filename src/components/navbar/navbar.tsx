/* Navigation Component */
import { Col, Row, PageHeader } from "antd";
import { useAppDispatch, useAppSelector } from "store";
import { useHistory } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import { AppLogoIcon } from "components/svg-icons";
import Menus from "./menus";
import "./navbar.css";

function Nav() {
  const dispatch = useAppDispatch();
  const { projectId } = useAppSelector((state) => state.homeState);
  const history = useHistory();

  return (
    <Row className="navbar">
      <Col span={2} offset={0}>
        <span className="brandName">
          <AppLogoIcon />
        </span>
      </Col>
      {projectId !== "" && (
        <Col span={4} offset={1}>
          <PageHeader
            className="site-page-header"
            onBack={() => {
              dispatch(setProjectId(""));
              history.push("/projects");
            }}
            title="All Projects"
            subTitle="Creating new project"
          />
        </Col>
      )}
      {projectId !== "" && (
        <Col span={11} offset={6}>
          <Menus projectId={projectId} />
        </Col>
      )}
    </Row>
  );
}

export default Nav;

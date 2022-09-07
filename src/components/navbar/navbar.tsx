/* Navigation Component */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { useAppDispatch, useAppSelector } from "store";
import { useHistory } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import { AppLogoIcon } from "components/svg-icons";
import { slugToText } from "utils/stringutil";
import Menus from "./menus";
import "./navbar.css";

function Nav() {
  const dispatch = useAppDispatch();
  const { projectId } = useAppSelector((state) => state.homeState);
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="brand-name">
        <a href="/">
          <AppLogoIcon />
        </a>
      </div>
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
            history.push("/projects");
          }}
          title={slugToText(projectId)}
        />
      )}
      {projectId !== "" && (
        <div className="navmenu">
          <Menus projectId={projectId} />
        </div>
      )}
    </div>
  );
}

export default Nav;

/* Project List Page Component */
import { useState } from "react";
import { Menu, MenuProps } from "antd";
import "./navbar.css";
import { useHistory, useLocation } from "react-router-dom";

function Menus(props: any) {
  const history = useHistory();
  const location = useLocation();
  const { projectId } = props;
  const items: MenuProps["items"] = [
    {
      label: "Project",
      key: `/project/details/${projectId}`
    },
    {
      label: "Schedule",
      key: `/project/details/${projectId}/schedule`
    },
    {
      label: "Specification",
      key: `/project/details/${projectId}/specification`
    },
    {
      label: "Materials",
      key: `/project/details/${projectId}/materials`
    },
    {
      label: "Submittals",
      key: `/project/details/${projectId}/submittals`
    }
  ];

  const [current, setCurrent] = useState(location.pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    history.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      items={items}
      mode="horizontal"
      className="menus"
    />
  );
}

export default Menus;

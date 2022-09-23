/* Project List Page Component */
import { useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import "./navbar.css";

function Menus(props: any) {
  const { projectId } = props;
  const items: MenuProps["items"] = [
    {
      label: (
        <Link to={`/project/details/${projectId}`} rel="noopener noreferrer">
          Project
        </Link>
      ),
      key: "1"
    },
    {
      label: (
        <Link
          to={`/project/details/${projectId}/schedule`}
          rel="noopener noreferrer"
        >
          Schedule
        </Link>
      ),
      key: "2"
    },
    {
      label: (
        <Link
          to={`/project/details/${projectId}/specification`}
          rel="noopener noreferrer"
        >
          Specification
        </Link>
      ),
      key: "3"
    },
    {
      label: (
        <Link
          to={`/project/details/${projectId}/materials`}
          rel="noopener noreferrer"
        >
          Materials
        </Link>
      ),
      key: "4"
    },
    {
      label: (
        <Link
          to={`/project/details/${projectId}/submittals`}
          rel="noopener noreferrer"
        >
          Submittals
        </Link>
      ),
      key: "5"
    }
  ];

  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
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

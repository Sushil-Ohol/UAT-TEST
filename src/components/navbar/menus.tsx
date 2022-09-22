/* Project List Page Component */
import { useState } from "react";
import { Menu, MenuProps } from "antd";
import "./navbar.css";

function Menus(props: any) {
  const { projectId } = props;
  const items: MenuProps["items"] = [
    {
      label: (
        <a href={`/project/details/${projectId}`} rel="noopener noreferrer">
          Project
        </a>
      ),
      key: "1"
    },
    {
      label: (
        <a
          href={`/project/details/${projectId}/schedule`}
          rel="noopener noreferrer"
        >
          Schedule
        </a>
      ),
      key: "2"
    },
    {
      label: (
        <a
          href={`/project/details/${projectId}/specification`}
          rel="noopener noreferrer"
        >
          Specification
        </a>
      ),
      key: "3"
    },
    {
      label: (
        <a
          href={`/project/details/${projectId}/materials`}
          rel="noopener noreferrer"
        >
          Materials
        </a>
      ),
      key: "4"
    },
    {
      label: (
        <a
          href={`/project/details/${projectId}/submittals`}
          rel="noopener noreferrer"
        >
          Submittals
        </a>
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

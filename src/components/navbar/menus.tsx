/* Project List Page Component */
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";

function Menus() {
  const items: MenuProps["items"] = [
    {
      label: (
        <a href="projects" rel="noopener noreferrer">
          Project
        </a>
      ),
      key: "1"
    },
    {
      label: (
        <a href="schedule" rel="noopener noreferrer">
          Schedule
        </a>
      ),
      key: "2"
    },
    {
      label: (
        <a href="specification" rel="noopener noreferrer">
          Specification
        </a>
      ),
      key: "3"
    },
    {
      label: (
        <a href="materials" rel="noopener noreferrer">
          Material
        </a>
      ),
      key: "4"
    },
    {
      label: (
        <a href="submittals" rel="noopener noreferrer">
          Submittal
        </a>
      ),
      key: "5"
    },
    { label: <UserOutlined className="UserOutlined" />, key: "6" }
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
      style={{ float: "right", width: "100%" }}
    />
  );
}

export default Menus;

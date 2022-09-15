import { Space } from "antd";
import React from "react";

function IconText({ icon, text }: { icon: React.FC; text: any }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}

export default IconText;

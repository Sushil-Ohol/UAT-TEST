import { Space } from "antd";
import React from "react";

function IconText({ icon, text }: { icon: React.FC; text: string }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}

export default IconText;

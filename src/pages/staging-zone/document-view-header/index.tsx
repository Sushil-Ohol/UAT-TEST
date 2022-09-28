import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";

export type DocumentViewHeaderProps = {
  prev: any;
  onDocumentClose: any;
  selectedDocument: any;
};

function DocumentViewHeader({
  prev,
  onDocumentClose,
  selectedDocument
}: DocumentViewHeaderProps) {
  return (
    <Row className="document-view-header">
      <Col span={5}>
        <Button
          onClick={prev}
          className="back-button"
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      </Col>
      <Col span={14}>
        <h2 className="heading">{selectedDocument.fileName}</h2>
      </Col>
      <Col span={1} offset={4}>
        <Button className="back-button" onClick={onDocumentClose}>
          Close
        </Button>
      </Col>
    </Row>
  );
}

export default DocumentViewHeader;

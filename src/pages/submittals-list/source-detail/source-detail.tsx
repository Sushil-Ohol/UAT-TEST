import { ICellRendererParams } from "ag-grid-community";
import { Button, Col, Row } from "antd";
import {
  ApprovedIcon,
  AutoInferredIcon,
  RejectedIcon
} from "components/svg-icons";
import { useState } from "react";
import "./source-detail.css";

import sampleSubmittalScreenshot from "../../../assets/submittal-sample-screenshot.png";

function SubmittalSourceDetailRenderer(params: ICellRendererParams) {
  const { api, data } = params;
  const [editedSubmittalName, setEditedSubmittalName] = useState(
    data.submittal
  );

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedSubmittalName(event.target.value);
  };

  const handleAcceptChange = () => {
    const newData = { ...data };
    newData.submittal = editedSubmittalName;
    api.applyTransaction({ update: [newData] });
  };

  const handleRejectChange = () => {
    setEditedSubmittalName(data.submittal);
  };

  return (
    <Row className="source-detail-container">
      <Col
        style={{ flex: "0 0 300px" }}
        className="source-detail-element source-detail-name-editor"
      >
        <textarea
          className="source-detail-name"
          value={editedSubmittalName}
          onChange={handleTextareaChange}
        />
        <div className="source-detail-edit-icons">
          <Button onClick={handleAcceptChange}>
            <ApprovedIcon />
          </Button>
          <Button onClick={handleRejectChange}>
            <RejectedIcon />
          </Button>
          <div className="source-detail-auto-icon">
            <AutoInferredIcon />
          </div>
        </div>
      </Col>
      <Col
        style={{ flex: "1 1 400px" }}
        className="source-detail-element source-detail-screenshot"
      >
        <img alt="" src={sampleSubmittalScreenshot} />
      </Col>
      <Col
        style={{ flex: "1 1 200px" }}
        className="source-detail-element source-detail-link"
      >
        <a href={data.linkToSpec}>View in specification</a>
      </Col>
    </Row>
  );
}

export default SubmittalSourceDetailRenderer;

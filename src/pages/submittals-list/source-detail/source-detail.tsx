// export function NewDatePicker() {
//   return <div />;
// }

import { GridApi, ICellRendererParams } from "ag-grid-community";
import { Button, Col, Row } from "antd";
import {
  ApprovedIcon,
  AutoInferredIcon,
  RejectedIcon
} from "components/svg-icons";
import { Component } from "react";
import "./source-detail.css";

import sampleSubmittalScreenshot from "../../../assets/submittal-sample-screenshot.png";

export default class SubmittalSourceDetailRenderer extends Component<
  {},
  {
    submittal: string;
    linkToSpec: string;
    originalData: any;
  }
> {
  gridApi: GridApi;

  constructor(params: ICellRendererParams) {
    super(params);
    const { api, data } = params;

    this.state = {
      submittal: data.submittal,
      linkToSpec: data.linkToSpec,
      originalData: data
    };
    this.gridApi = api;

    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleAcceptChange = this.handleAcceptChange.bind(this);
    this.handleRejectChange = this.handleRejectChange.bind(this);
  }

  handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ submittal: event.target.value });
  }

  handleAcceptChange() {
    const { submittal, originalData } = this.state;
    const newData = { ...originalData };
    newData.submittal = submittal;
    this.gridApi.applyTransaction({ update: [newData] });
  }

  handleRejectChange() {
    const { originalData } = this.state;
    this.setState({ submittal: originalData.submittal });
  }

  render() {
    const { submittal, linkToSpec } = this.state;
    return (
      <Row className="source-detail-container">
        <Col
          style={{ flex: "0 0 300px" }}
          className="source-detail-element source-detail-name-editor"
        >
          <textarea
            className="source-detail-name"
            value={submittal}
            onChange={this.handleTextareaChange}
          />
          <div className="source-detail-edit-icons">
            <Button onClick={this.handleAcceptChange}>
              <ApprovedIcon />
            </Button>
            <Button onClick={this.handleRejectChange}>
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
          <a href={linkToSpec}>View in specification</a>
        </Col>
      </Row>
    );
  }
}

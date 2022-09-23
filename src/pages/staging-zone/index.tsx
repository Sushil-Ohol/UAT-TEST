/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { Col, Row } from "antd";
import Discussions from "./discussion-list";
import DiscussionDetails from "./discussion-details";
import DiscussionDocs from "./discussion-docs";
import "./staging-zone.css";
import DocumentViewHeader from "./document-view-header";
import DocumentList from "./discussion-document-list";

export type StagingZoneProps = {
  onMouseDown: any;
  selectedData: any[];
  documentView: Function;
  isDocumentView: boolean;
};

function StagingZone(props: StagingZoneProps) {
  const { onMouseDown, selectedData, documentView, isDocumentView } = props;
  const [discussionId, setDiscussionId] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  React.useEffect(() => {}, []);

  const OnDiscussionSelected = (id: string) => {
    setDiscussionId(id);
  };
  const prev = () => {
    documentView(false);
  };
  const onDocumentSelect = (fileName: string) => {
    setSelectedDocument(fileName);
  };
  const onDocumentClose = () => {
    setSelectedDocument("");
  };
  return (
    <div id="page-wrap">
      <div
        style={{
          position: "absolute",
          height: "5px",
          padding: "0 4px 0",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          cursor: "ns-resize",
          backgroundColor: "#f4f7f9"
        }}
        onMouseDown={onMouseDown}
      />

      <div
        className="five-columns group"
        style={{
          display: isDocumentView ? "inline-block" : "none"
        }}
      >
        <DocumentViewHeader
          prev={prev}
          onDocumentClose={onDocumentClose}
          selectedDocument={selectedDocument}
        />

        <Row>
          <Col span={5}>
            <Row>
              <Col span={24} className="document-view-div-first">
                <div className="all-document-list">
                  <DocumentList
                    selectedDocument={selectedDocument}
                    onSelect={onDocumentSelect}
                  />
                </div>
              </Col>
              <Col span={24} className="document-view-div-second">
                <DiscussionDetails
                  className="col-two discussion"
                  discussionId={discussionId}
                  isDocumentView={isDocumentView}
                />
              </Col>
            </Row>
          </Col>
          <Col span={19}>
            <div className="col-two discussion-document-view document-bg-color">
              <h2> {selectedDocument || "Document"}</h2>
            </div>
          </Col>
        </Row>
      </div>
      <div
        className="five-columns group"
        style={{ display: isDocumentView ? "none" : "inline-block" }}
      >
        <Discussions
          className="col discussion"
          onClick={OnDiscussionSelected}
          selectedData={selectedData}
        />
        <DiscussionDetails
          className="col discussion"
          discussionId={discussionId}
          isDocumentView={isDocumentView}
        />
        <DiscussionDocs
          documentView={documentView}
          className="col discussion"
          discussionId={discussionId}
          onDocumentSelect={setSelectedDocument}
        />
      </div>
    </div>
  );
}

export default StagingZone;

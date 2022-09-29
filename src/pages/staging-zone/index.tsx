/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { Col, Row } from "antd";
import { DocumentView } from "components";
import { deleteDocument } from "store/slices/staging-zone-slice";
import { useDispatch } from "react-redux";
import Discussions from "./discussion-list";
import DiscussionDetails from "./discussion-details";
import DiscussionDocs from "./discussion-docs";
import "./staging-zone.css";
import DocumentList from "./discussion-document-list";
import DocumentViewHeader from "./document-view-header";

export type StagingZoneProps = {
  onMouseDown: any;
  selectedData: any[];
  documentView: Function;
  isDocumentView: boolean;
};

function StagingZone(props: StagingZoneProps) {
  const { onMouseDown, selectedData, documentView, isDocumentView } = props;
  const [discussionId, setDiscussionId] = useState("");
  const [selectedDocument, setSelectedDocument] = useState({
    fileName: "",
    fileUrl: ""
  });
  const dispatch = useDispatch();

  const OnDiscussionSelected = (id: string) => {
    setDiscussionId(id);
  };
  const prev = () => {
    documentView(false);
  };
  const onDocumentSelect = (fileName: any) => {
    setSelectedDocument(fileName);
  };
  const onDocumentClose = () => {
    setSelectedDocument({ fileName: "", fileUrl: "" });
  };
  const onDeleteDocument = () => {
    dispatch(deleteDocument({ discussionId, ...selectedDocument }));
    setSelectedDocument({ fileName: "", fileUrl: "" });
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
          onDeleteDocument={onDeleteDocument}
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
              {selectedDocument.fileUrl ? (
                <DocumentView
                  file={`${process.env.PUBLIC_URL}${selectedDocument.fileUrl}`}
                />
              ) : (
                <h1>Document View</h1>
              )}
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

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin, Upload } from "antd";
import { DocumentSection, DocumentView } from "components";
import {
  noDocumentMessage,
  noDocumentMessageUpload,
  noDocumentSelectMessage
} from "constants/index";
import { ConversationDoc } from "models/discussion";
import { useState } from "react";
import { PostProjectFile } from "services/projects-service";
import "./submittal-attachment.css";

function SubmittalAttachments({
  documents,
  handleDocuments,
  submittalData,
  disabled,
  selectedDocument,
  setSelectedDocument
}: any) {
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  const [documentList, setDocumentList] = useState(false);
  const addDocument = (info: any) => {
    const newdoc: ConversationDoc = {
      fileName: info.name,
      annotationCount: 3,
      id: info.uid,
      uploadDate: new Date(),
      uploadedBy: "john",
      uploadDocument: true,
      url: URL.createObjectURL(info)
    };
    handleDocuments("Add", newdoc);
  };

  const fullScreenDocument = () => {
    setDocumentList(!documentList);
  };
  const fileUploadRequest = async ({ file, onSuccess }: any) => {
    setFileLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "title");
    const result = await PostProjectFile(formData, null);
    if ((await result.data).data.success) {
      onSuccess("ok");
      addDocument(file);
      setFileLoading(false);
    }
  };
  return (
    <Row style={{ height: "80vh" }}>
      <Col span={4} style={{ display: documentList ? "none" : "" }}>
        <DocumentSection
          documents={documents}
          submittalData={submittalData}
          handleDocuments={handleDocuments}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          disabled={disabled}
        />
        <Upload
          showUploadList={false}
          customRequest={fileUploadRequest}
          // onChange={(info) => addDocument(info)}
          disabled={disabled}
        >
          <Button
            type="text"
            className="add-new-column-btn"
            disabled={disabled}
          >
            {fileLoading ? <Spin size="small" /> : "+ Add more files"}
          </Button>
        </Upload>
      </Col>
      <Col className="button-full-screen">
        {documentList ? (
          <span
            className="btn-left-outline"
            onClick={fullScreenDocument}
            onKeyPress={fullScreenDocument}
            role="button"
            tabIndex={0}
          >
            <LeftOutlined />
          </span>
        ) : (
          <span
            className="btn-left-outline"
            onClick={fullScreenDocument}
            onKeyPress={fullScreenDocument}
            role="button"
            tabIndex={0}
          >
            <RightOutlined />
          </span>
        )}
      </Col>

      <Col
        span={documentList ? 23 : 19}
        style={{ padding: "0px auto", height: "75vh" }}
      >
        {documents.length > 0 ? (
          (Object.values(selectedDocument).length > 0 && (
            <DocumentView
              file={
                selectedDocument.uploadDocument
                  ? `${selectedDocument.url}`
                  : `${window.location.origin}${selectedDocument.url}`
              }
            />
          )) || (
            <div className="document-not-selected">
              <h2>{noDocumentSelectMessage}</h2>
            </div>
          )
        ) : (
          <div className="document-not-selected">
            <h2>
              {noDocumentMessage} <br /> {noDocumentMessageUpload}
            </h2>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default SubmittalAttachments;

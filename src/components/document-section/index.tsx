import { Button, Col, Row, Space } from "antd";
import { ClearIcon } from "components/svg-icons";
import { ConversationDoc } from "models/discussion";
import { SubmittalLog } from "models/submittal-log";
import { useEffect, useState } from "react";
import { useAppSelector } from "store";
import "./document-section.css";

export type DocumentSectionProps = {
  documents: any;
  handleDocuments: Function;
  submittalData: any;
  selectedDocument: ConversationDoc;
  setSelectedDocument: any;
};
function DocumentSection({
  documents,
  handleDocuments,
  submittalData,
  selectedDocument,
  setSelectedDocument
}: DocumentSectionProps) {
  const assigneeOption: any = useAppSelector(
    (state) => state.submittals.assignees
  );
  const [updatedData, setUpdatedData] = useState<SubmittalLog>(submittalData);
  const removeDocs = (id: string) => {
    if (updatedData) {
      const updatedDependent = updatedData.docs?.filter(
        (data: any) => data.id !== id
      );
      setUpdatedData((prev: SubmittalLog) => {
        return prev ? { ...prev, docs: updatedDependent } : prev;
      });
      handleDocuments("Remove", { id });
    }
  };
  useEffect(() => {
    const assignedData =
      updatedData?.company.name in assigneeOption &&
      assigneeOption[updatedData?.company.name].filter(
        (item: any) => item.default === true
      )[0];
    if (updatedData.assigned.assignedTo === "") {
      setUpdatedData((prev) => {
        return {
          ...prev,
          assigned: assignedData
        };
      });
    }
  }, [updatedData, assigneeOption]);
  return (
    <div className="document-section-div">
      {documents
        ? documents.map((data: ConversationDoc) => {
            return (
              <Row
                className={
                  selectedDocument.id === data.id
                    ? "depends-on-rowData-active"
                    : "depends-on-rowData"
                }
              >
                <Col span={22} style={{ display: "flex" }}>
                  <Space onClick={() => setSelectedDocument(data)}>
                    <span>{data.fileName}</span>
                  </Space>
                </Col>
                <Col
                  span={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button
                    className="add-new-column-btn"
                    onClick={() => {
                      setSelectedDocument({});
                      removeDocs(data.id);
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </Col>
              </Row>
            );
          })
        : "no"}
    </div>
  );
}
export default DocumentSection;

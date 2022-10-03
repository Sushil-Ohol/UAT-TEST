import { useEffect, useState } from "react";
import { useAppSelector } from "store";
import { RootState } from "store/slices";
import "./document-list.css";

export type DocumentListProps = {
  selectedDocument: any;
  onSelect: any;
};

function DocumentList({ selectedDocument, onSelect }: DocumentListProps) {
  const [selectedDoc, setSelectedDoc] = useState("");
  const selectedDiscussion = useAppSelector(
    (state: RootState) => state.stagingZone.selectedDiscussion
  );
  const documents = useAppSelector(
    (state: RootState) => state.stagingZone.documents
  );
  function onClickFile(file: any) {
    setSelectedDoc(file.fileUrl);
    onSelect(file);
  }
  useEffect(() => {
    setSelectedDoc(selectedDocument.id);
  }, [selectedDocument, selectedDiscussion]);
  return (
    <>
      <h4 className="document-list-heading-h1">
        Document (
        {selectedDiscussion !== null &&
          documents[selectedDiscussion?.topicId]?.list.length}
        )
      </h4>

      {selectedDiscussion !== null &&
        documents[selectedDiscussion?.topicId]?.list.map((document: any) => (
          <div
            className={
              selectedDoc === document.id
                ? " document-item-active"
                : "document-item"
            }
            onClick={() =>
              onClickFile({
                fileName: document.fileName,
                fileUrl: document.url,
                id: document.id
              })
            }
            onKeyDown={() =>
              onClickFile({
                fileName: document.fileName,
                fileUrl: document.url,
                id: document.id
              })
            }
            role="button"
            tabIndex={0}
          >
            {document.fileName}
          </div>
        ))}
    </>
  );
}

export default DocumentList;

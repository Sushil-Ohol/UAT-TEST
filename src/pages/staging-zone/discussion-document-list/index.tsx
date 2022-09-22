import { useEffect, useState } from "react";
import { useAppSelector } from "store";
import { RootState } from "store/slices";
import "./document-list.css";

export type DocumentListProps = {
  selectedDocument: string;
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
  function onClickFile(fileName: string) {
    setSelectedDoc(fileName);
    onSelect(fileName);
  }
  useEffect(() => {
    setSelectedDoc(selectedDocument);
  }, [selectedDocument, selectedDiscussion]);
  return (
    <>
      <h4>
        Document (
        {selectedDiscussion !== null &&
          documents[selectedDiscussion?.topicId]?.list.length}
        )
      </h4>

      {selectedDiscussion !== null &&
        documents[selectedDiscussion?.topicId]?.list.map((document: any) => (
          <>
            <div
              className={
                selectedDoc === document.fileName
                  ? " document-item-active"
                  : "document-item"
              }
              onClick={() => onClickFile(document.fileName)}
              onKeyDown={() => onClickFile(document.fileName)}
              role="button"
              tabIndex={0}
            >
              {document.fileName}
            </div>
            <br />
          </>
        ))}
    </>
  );
}

export default DocumentList;

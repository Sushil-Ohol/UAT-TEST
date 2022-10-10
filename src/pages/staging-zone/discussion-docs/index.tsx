/* eslint-disable react-hooks/exhaustive-deps */
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, message, Spin } from "antd";
import { ConversationDoc } from "models/discussion";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import type { UploadProps } from "antd";
import {
  GetDiscussionDetails,
  newDocument
} from "store/slices/staging-zone-slice";
import "./discussion-docs.css";
import { DownloadIcon, CopyIcon } from "components/svg-icons";
import { PostProjectFile } from "services/projects-service";
import Dragger from "antd/lib/upload/Dragger";
import { CopyDocumentModal } from "popups";
import { updateDocs } from "store/slices/submittalsSlices";

export type DiscussionDocsProps = {
  className: string;
  discussionId: string;
  documentView: any;
  onDocumentSelect: Function;
  selectedData: any[];
  submittalDetailsId: string;
  handleDocuments: Function;
  updatedData: any;
};

function DiscussionDocs(props: DiscussionDocsProps) {
  const [isCopyDocumentModalOpen, setIsCopyDocumentModalOpen] = useState(false);
  const [copiedDocument, setCopiedDocument] = useState<any>({});
  const [submittalDocs, setSubmittalDocs] = useState<ConversationDoc[]>([]);
  const [fileUpload, setFileUpload] = useState(false);
  const [dragFile, setDragFile] = useState(false);
  const {
    className,
    discussionId,
    documentView,
    onDocumentSelect,
    selectedData,
    submittalDetailsId,
    updatedData,
    handleDocuments
  } = props;
  const [filterByDate, setFilterByDate] = useState<any>();
  const [uploadedDate, setUploadDate] = useState<string[]>();
  const importFile = useRef<any>();
  const dispatch = useAppDispatch();
  const bottomRef = useRef<any>(null);
  const documentsData = useAppSelector(
    (state: RootState) => state.stagingZone.documents
  );

  const submittalList = useAppSelector(
    (state: RootState) => state.submittals.list
  );

  const showCopyDocumentModal = (data: any) => {
    setCopiedDocument(data);
    setIsCopyDocumentModalOpen(true);
  };

  const handleOk = () => {
    if (updatedData.id !== undefined) {
      handleDocuments("Add", copiedDocument);
      setIsCopyDocumentModalOpen(false);
    } else {
      const newDoc = documentsData[discussionId].list[copiedDocument.id - 1];

      const index = submittalDocs.filter((item) => item.id === newDoc.id);

      if (index.length === 1) {
        message.error("Document already exist");
        setIsCopyDocumentModalOpen(false);
      } else {
        setSubmittalDocs([...submittalDocs, newDoc]);
        dispatch(
          updateDocs({
            submittalId: selectedData[0].id,
            docs: [...submittalDocs, newDoc]
          })
        );
        message.success("Document Added successfully");
        setIsCopyDocumentModalOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsCopyDocumentModalOpen(false);
  };

  // dummy user for testing
  const currentUser = "John";

  // get Total doc count
  const totalDocs =
    discussionId !== "" && documentsData[discussionId]
      ? documentsData[discussionId].list?.length
      : 0;

  const loadDiscussionDetails = async () => {
    await dispatch(GetDiscussionDetails(discussionId));
  };

  const onDocumentClick = (value: boolean, selectedDoc: object) => {
    documentView(value);
    onDocumentSelect(selectedDoc);
  };

  useEffect(() => {
    if (discussionId !== "" && !documentsData[discussionId]) {
      loadDiscussionDetails();
    }
  }, [discussionId]);

  useEffect(() => {
    const selectedSubmittal = submittalList.find(
      (data) => data.id === (selectedData.length === 1 && selectedData[0].id)
    );
    setSubmittalDocs(selectedSubmittal?.docs ? selectedSubmittal.docs : []);
  }, [selectedData]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filterByDate]);

  React.useEffect(() => {
    if (discussionId !== "" && documentsData[discussionId]) {
      const sortedChatByDate = documentsData[discussionId]?.list
        ?.slice()
        .sort(
          (a: any, b: any) =>
            new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        );
      const newSortedData = {
        ...documentsData[discussionId].list,
        docs: sortedChatByDate
      };
      const filterByDateData = newSortedData?.docs?.reduce(
        (result: any, currentValue: any) => {
          const newArray = result;
          (newArray[
            moment(currentValue.uploadDate, "YYYY-MM-DD")
              .format("dddd, DD MMM YYYY ")
              .toString()
          ] =
            result[
              moment(currentValue.uploadDate, "YYYY-MM-DD")
                .format("dddd, DD MMM YYYY ")
                .toString()
            ] || []).push(currentValue);
          return newArray;
        },
        {}
      );
      setFilterByDate(filterByDateData);

      const keys = filterByDateData ? Object.keys(filterByDateData) : [];

      setUploadDate(keys);
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [documentsData[discussionId], documentsData[discussionId]?.list]);

  const handleOpenFileInput = () => {
    importFile.current.click();
  };

  const addNewFile = async (file: any, isLoding: any) => {
    isLoding(true);
    const result = await PostProjectFile(file, null);
    if ((await result.data).data.success) {
      const newFile: any = {
        id: documentsData[discussionId].list.length + 1,
        fileName: file.name,
        url: URL.createObjectURL(file),
        uploadedBy: currentUser,
        uploadDate: moment(new Date(), "YYYY-MM-DD").format("MM-DD-YYYY"),
        annotationCount: 1,
        uploadDocument: true
      };
      dispatch(newDocument({ discussionId, newFile }));
      isLoding(false);
    } else {
      message.error("File not uploaded");
      isLoding(false);
    }
  };

  const draggerProps: UploadProps = {
    showUploadList: false,
    disabled: dragFile,
    name: "file",
    multiple: true,
    customRequest: async ({ file }: any) => {
      addNewFile(file, setDragFile);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    addNewFile(e.target.files && e.target.files[0], setFileUpload);
  };

  const dragStart = (data: any, event: any) => {
    event.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  return (
    <div className={className}>
      <div className="discussionDocs">
        <div className="document-count">Documents({totalDocs})</div>

        {fileUpload ? (
          <Spin size="small" className="importBtn" />
        ) : (
          <Button
            className="importBtn"
            disabled={discussionId === ""}
            onClick={handleOpenFileInput}
          >
            <DownloadOutlined />
            Import a file
          </Button>
        )}
        <input
          ref={importFile}
          style={{ display: "none" }}
          multiple
          type="file"
          onChange={handleFileUpload}
        />
      </div>
      {discussionId !== "" &&
        uploadedDate &&
        uploadedDate.map((messageDay) => (
          <div key={messageDay} style={{ paddingBottom: "10%" }}>
            <Divider style={{ color: "#0000007F" }}>{messageDay}</Divider>
            {filterByDate &&
              filterByDate[messageDay].map((data: ConversationDoc) => {
                return (
                  <div
                    key={data.id}
                    draggable
                    onDragStart={(e) => dragStart(data, e)}
                  >
                    <div
                      className={
                        currentUser === data.uploadedBy
                          ? "currentUserFile"
                          : "otherUserFile"
                      }
                    >
                      <div
                        style={{
                          textTransform: "capitalize",
                          float:
                            currentUser === data.uploadedBy ? "right" : "left",
                          clear: "both"
                        }}
                      >
                        <span style={{ color: "#000000" }}>
                          {currentUser === data.uploadedBy
                            ? "you"
                            : data.uploadedBy}
                          &bull;
                        </span>
                        <span style={{ marginLeft: "5px", color: "#0000007F" }}>
                          {moment(data.uploadDate, "h:mm a").format("h:mm a")}
                        </span>
                      </div>
                      <p
                        className={
                          currentUser === data.uploadedBy
                            ? "currentUserFilenName"
                            : "otherUserFilenName"
                        }
                      >
                        <div
                          onClick={() => {
                            onDocumentClick(true, {
                              fileName: data.fileName,
                              fileUrl: data.url,
                              id: data.id,
                              uploadDocument: data.uploadDocument
                            });
                          }}
                          onKeyDown={() => {
                            onDocumentClick(true, {
                              fileName: data.fileName,
                              fileUrl: data.url,
                              id: data.id,
                              uploadDocument: data.uploadDocument
                            });
                          }}
                          role="button"
                          tabIndex={0}
                          className="selected-document"
                        >
                          {" "}
                          {data.fileName}{" "}
                        </div>
                        <span className="downloadIcon">
                          <a href={data.url} download={data.fileName}>
                            <DownloadIcon />
                          </a>
                        </span>
                        <span
                          title="You can copy this document to selected sumbittal"
                          className="copyIcon"
                        >
                          {(selectedData.length === 1 ||
                            submittalDetailsId) && (
                            <div
                              onClick={() => showCopyDocumentModal(data)}
                              onKeyDown={showCopyDocumentModal}
                              role="button"
                              tabIndex={0}
                            >
                              <CopyIcon />
                            </div>
                          )}
                          <CopyDocumentModal
                            isCopyDocumentModalOpen={isCopyDocumentModalOpen}
                            handleCancel={handleCancel}
                            handleOk={handleOk}
                            isCopyDocumentModalTitle="Confirm"
                            selectedData={
                              updatedData.id === undefined
                                ? selectedData
                                : [{ ...updatedData }]
                            }
                          />
                        </span>
                      </p>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div ref={bottomRef} />
                  </div>
                );
              })}
          </div>
        ))}

      {discussionId !== "" ? (
        <div className="uploadFileDiv">
          <Dragger {...draggerProps}>
            {dragFile ? (
              <Spin size="small" className="ant-upload-text " />
            ) : (
              <p className="ant-upload-text">Drag a file to upload</p>
            )}
          </Dragger>
        </div>
      ) : (
        <h4>No Documents </h4>
      )}
    </div>
  );
}

export default DiscussionDocs;

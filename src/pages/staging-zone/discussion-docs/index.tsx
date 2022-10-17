/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, message, Row, Spin } from "antd";
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
import {
  DownloadIcon,
  CopyIcon,
  ThumbnailIcon,
  DocumentListIcon
} from "components/svg-icons";
import { PostProjectFile } from "services/projects-service";
import Dragger from "antd/lib/upload/Dragger";
import {
  discussionDetailsMessages,
  discussionDocsMessages,
  imgExtentions
} from "constants/index";
import { ImageThumbnailViewer, PdfThumbnailViewer } from "components";
import { CopyDocumentModal } from "popups";
import { updateDocs } from "store/slices/submittalsSlices";
import { DownloadOutlined } from "@ant-design/icons";

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
  const [fileUpload, setFileUpload] = useState(false);
  const [thumbnail, setThumbnail] = useState(false);
  const [isCopyDocumentModalOpen, setIsCopyDocumentModalOpen] = useState(false);
  const [copiedDocument, setCopiedDocument] = useState<any>({});
  const [submittalDocs, setSubmittalDocs] = useState<ConversationDoc[]>([]);
  const [dragFile, setDragFile] = useState(false);
  const {
    className,
    discussionId,
    documentView,
    onDocumentSelect,
    selectedData,
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
  const discussionList = useAppSelector(
    (state: RootState) => state.stagingZone.discussionList
  );
  const submittalList = useAppSelector(
    (state: RootState) => state.submittals.list
  );
  const selectedDiscussionType: any = useAppSelector(
    (state: RootState) => state.stagingZone.selectedDiscussion
  );
  const discussionListData = useAppSelector(
    (state: RootState) => state.stagingZone.documents
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
      const newDoc =
        documentsData[selectedDiscussionType?.topicId].list[
          copiedDocument.id - 1
        ];

      const index = submittalDocs.filter((item) => item.id === newDoc.id);

      if (index.length === 1) {
        message.error("Document already exist");
        setIsCopyDocumentModalOpen(false);
      } else {
        setSubmittalDocs([...submittalDocs, newDoc]);
        dispatch(
          updateDocs({
            submittalId: parseInt(selectedDiscussionType?.topicId, 10),
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
  }, [discussionId, discussionListData]);

  useEffect(() => {
    const selectedSubmittal = submittalList.find(
      (data) => +data.id === parseInt(selectedDiscussionType?.topicId, 10)
    );

    setSubmittalDocs(selectedSubmittal?.docs ? selectedSubmittal.docs : []);
  }, [selectedData, selectedDiscussionType]);

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
  const handleOpenFileInput = () => {
    importFile.current.click();
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
  const dragStart = (data: any, event: any) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({ data, drag: true })
    );
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    addNewFile(e.target.files && e.target.files[0], setFileUpload);
  };
  return (
    <div className={className}>
      <div className="discussionDocs">
        <div className="document-count">Documents({totalDocs})</div>
        <div>
          {fileUpload ? (
            <Spin size="small" className="importBtn" />
          ) : (
            <Row>
              <Col span={1} offset={20}>
                <Button
                  className="importBtn"
                  disabled={discussionId === ""}
                  onClick={handleOpenFileInput}
                >
                  <DownloadOutlined />
                  Import a file
                </Button>
              </Col>
              <Col
                onClick={(e: any) => {
                  if (discussionId !== "") {
                    setThumbnail(true);
                  }
                  return e.preventdefault();
                }}
                span={1}
                className="thumbnail-icon"
              >
                <ThumbnailIcon color={thumbnail ? "#007AFF" : "#808080"} />
              </Col>
              <Col
                span={1}
                className="document-list"
                onClick={(e: any) => {
                  if (discussionId !== "") {
                    setThumbnail(false);
                  }
                  return e.preventdefault();
                }}
              >
                <DocumentListIcon
                  color={
                    thumbnail
                      ? "#808080"
                      : (discussionId === "" && "#808080") || "#007AFF"
                  }
                />
              </Col>
            </Row>
          )}
          <input
            ref={importFile}
            style={{ display: "none" }}
            multiple
            type="file"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      {discussionId !== "" &&
        uploadedDate &&
        uploadedDate.map((messageDay) => (
          <div
            key={messageDay}
            style={{ paddingBottom: "10%", overflow: "auto" }}
          >
            <Divider style={{ color: "#0000007F" }}>{messageDay}</Divider>
            {filterByDate &&
              filterByDate[messageDay].map((data: ConversationDoc) => {
                const fileExtension = data.fileName.split(".").pop();
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
                        {data.fileName &&
                          thumbnail &&
                          fileExtension!.toLowerCase() === "pdf" && (
                            <PdfThumbnailViewer
                              data={data}
                              onClick={onDocumentClick}
                            />
                          )}
                        {data.fileName &&
                          thumbnail &&
                          imgExtentions.includes(
                            fileExtension!.toLowerCase()
                          ) && (
                            <ImageThumbnailViewer
                              data={data}
                              onClick={onDocumentClick}
                            />
                          )}
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
                          {data.fileName}{" "}
                        </div>
                        <span className="downloadIcon">
                          <a href={data.url} download={data.fileName}>
                            <DownloadIcon />
                          </a>
                        </span>

                        {selectedDiscussionType.type === "related" && (
                          <span
                            title="You can copy this document to selected sumbittal"
                            className="copyIcon"
                          >
                            <div
                              onClick={() => showCopyDocumentModal(data)}
                              onKeyDown={showCopyDocumentModal}
                              role="button"
                              tabIndex={0}
                            >
                              <CopyIcon />
                            </div>
                            <CopyDocumentModal
                              isCopyDocumentModalOpen={isCopyDocumentModalOpen}
                              handleCancel={handleCancel}
                              handleOk={handleOk}
                              isCopyDocumentModalTitle="Confirm"
                              selectedData={[
                                {
                                  id: selectedDiscussionType?.topicId,
                                  submittal: selectedDiscussionType?.topicName
                                }
                              ]}
                            />
                          </span>
                        )}
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
              <p className="ant-upload-text">Click or drop a file to upload</p>
            )}
          </Dragger>
        </div>
      ) : (
        <div className="discussions-no-docs">
          {discussionList.length === 0 ? (
            "No discussions are available for this project."
          ) : (
            <>
              <p> {discussionDetailsMessages.message}</p>
              <p>
                {discussionDetailsMessages.descFirst}
                <b>
                  {discussionDetailsMessages.boldTextFirst} <br />
                  {discussionDetailsMessages.boldTextSecond}
                </b>
                {discussionDetailsMessages.descSecond}
              </p>
            </>
          )}
        </div>
      )}
      {discussionId !== "" && uploadedDate?.length === 0 && (
        <div className="discussions-no-docs">
          <p>{discussionDocsMessages.message}</p>
          <p>
            {discussionDocsMessages.descFirst}{" "}
            <b>{discussionDocsMessages.boldText}</b>{" "}
            {discussionDocsMessages.descSecond} <br />{" "}
            {discussionDocsMessages.descThird}
          </p>
        </div>
      )}
    </div>
  );
}

export default DiscussionDocs;

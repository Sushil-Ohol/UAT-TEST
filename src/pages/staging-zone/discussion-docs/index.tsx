/* eslint-disable react-hooks/exhaustive-deps */
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { ConversationDoc } from "models/discussion";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import { GetDiscussionDetails } from "store/slices/staging-zone-slice";
import "./discussion-docs.css";
import { DownloadIcon, CopyIcon } from "components/svg-icons";

function DiscussionDocs(props: any) {
  const { className, discussionId } = props;
  const [filterByDate, setFilterByDate] = useState<any>();
  const [uploadedDate, setUploadDate] = useState<string[]>();
  const dispatch = useAppDispatch();
  const bottomRef = useRef<any>(null);
  const documentsData = useAppSelector(
    (state: RootState) => state.stagingZone.documents
  );

  // get Total doc count
  const totalDocs =
    discussionId !== "" && documentsData[discussionId]
      ? documentsData[discussionId].list?.length
      : 0;

  // dummy user for testing
  const currentUser = "John";

  const loadDiscussionDetails = async () => {
    await dispatch(GetDiscussionDetails(discussionId));
  };

  useEffect(() => {
    if (discussionId !== "" && !documentsData[discussionId]) {
      loadDiscussionDetails();
    }
  }, []);

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
            moment(currentValue.uploadDate)
              .format("dddd, DD MMM YYYY ")
              .toString()
          ] =
            result[
              moment(currentValue.uploadDate)
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
  }, [documentsData[discussionId], documentsData[discussionId]?.list]);

  return (
    <div className={className}>
      <div className="discussionDocs">
        <div style={{ padding: "2px 1.5%", float: "left" }}>
          Documents({totalDocs})
        </div>
        <Button className="importBtn" disabled={discussionId === ""}>
          <DownloadOutlined />
          Import a file
        </Button>
      </div>
      {discussionId !== "" &&
        uploadedDate &&
        uploadedDate.map((messageDay) => (
          <div key={messageDay}>
            <Divider style={{ color: "#0000007F" }}>{messageDay}</Divider>
            {filterByDate &&
              filterByDate[messageDay].map((data: ConversationDoc) => {
                return (
                  <div key={data.id}>
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
                          {moment(data.uploadDate).format("h:mm a")}
                        </span>
                      </div>
                      <p
                        className={
                          currentUser === data.uploadedBy
                            ? "currentUserFilenName"
                            : "otherUserFilenName"
                        }
                      >
                        <a href={data.url}> {data.fileName} </a>
                        <span className="downloadIcon">
                          <DownloadIcon />
                        </span>
                        <span
                          title="You can copy this document to selected sumbittal"
                          className="copyIcon"
                        >
                          <CopyIcon />
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
          <Dragger>
            <p className="ant-upload-text">Drag a file to upload</p>
          </Dragger>
        </div>
      ) : (
        <h4>No Documents </h4>
      )}
    </div>
  );
}

export default DiscussionDocs;

/* eslint-disable react-hooks/exhaustive-deps */
import { SendOutlined } from "@ant-design/icons";
import { Button, Divider, Input, InputRef } from "antd";
import { Conversation, Discussion } from "models/discussion";
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import { GetDiscussionDetails } from "store/slices/staging-zone-slice";
import "./discussion-details.css";

function DiscussionDetails(props: any) {
  const { className, discussionId } = props;

  const [discussionInfo, setDiscussionInfo] = useState<Discussion>();
  const [filterByDate, setFilterByDate] = useState<any>();
  const [msgDate, setMsgDate] = useState<string[]>();
  const chats = useAppSelector(
    (state: RootState) => state.stagingZone.discussionList
  );
  const dispatch = useAppDispatch();
  const sendMessage = useRef<InputRef>(null);
  const bottomRef = useRef<any>(null);

  // get Total chat count
  const totalChat = discussionInfo ? discussionInfo.chats?.length : 0;

  // dummy user for testing
  const currentUser = "ram";

  const loadList = async () => {
    await dispatch(GetDiscussionDetails());
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filterByDate]);

  useEffect(() => {
    loadList();
  }, []);

  useEffect(() => {
    const discussion = chats.find((data) => data.topicId === discussionId);
    setDiscussionInfo(discussion);
  }, [chats, discussionId]);

  const onClickSendBtn = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sortedChatByDate = discussionInfo?.chats
      ?.slice()
      .sort(
        (a: any, b: any) =>
          new Date(a.messageDate).getTime() - new Date(b.messageDate).getTime()
      );

    const newSortedData = { ...discussionInfo, chats: sortedChatByDate };

    const filterByDateData = newSortedData?.chats?.reduce(
      (result: any, currentValue: any) => {
        const newArray = result;
        (newArray[
          moment(currentValue.messageDate)
            .format("dddd, DD MMM YYYY ")
            .toString()
        ] =
          newArray[
            moment(currentValue.messageDate)
              .format("dddd, DD MMM YYYY ")
              .toString()
          ] || []).push(currentValue);
        return newArray;
      },
      {}
    );
    setFilterByDate(filterByDateData);

    const keys = filterByDateData ? Object.keys(filterByDateData) : [];

    setMsgDate(keys);
  }, [discussionInfo]);

  return (
    <div className={className}>
      <div className="discussionDetails">
        <div style={{ padding: "2px 1.5%", float: "left" }}>
          Discussion({totalChat})
        </div>
        <Button className="archieveBtn">Archieve...</Button>
      </div>
      {msgDate &&
        msgDate.map((messageDay) => (
          <div key={messageDay}>
            <Divider style={{ color: "#0000007F" }}>{messageDay}</Divider>
            {filterByDate &&
              filterByDate[messageDay].map((data: Conversation) => {
                return (
                  <div key={data.id}>
                    <div
                      className={
                        currentUser === data.messageBy
                          ? "currentUserChat"
                          : "otherUserChat"
                      }
                    >
                      <div
                        style={{
                          textTransform: "capitalize",
                          float:
                            currentUser === data.messageBy ? "right" : "left",
                          clear: "both"
                        }}
                      >
                        <span style={{ color: "#000000" }}>
                          {currentUser === data.messageBy
                            ? "you"
                            : data.messageBy}
                          &bull;
                        </span>
                        <span style={{ marginLeft: "5px", color: "#0000007F" }}>
                          {moment(data.messageDate).format("h:mm a")}
                        </span>
                      </div>
                      <p
                        className={
                          currentUser === data.messageBy
                            ? "currentUserMsg"
                            : "otherUserMsg"
                        }
                      >
                        {data.message}
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
      <div className="sendMsgDiv">
        <Input
          placeholder="Type your message"
          ref={sendMessage}
          size="large"
          suffix={<SendOutlined onClick={onClickSendBtn} />}
          id="sendMsg"
          style={{
            background: "#0000000D 0% 0% no-repeat padding-box"
          }}
        />
      </div>
    </div>
  );
}

export default DiscussionDetails;

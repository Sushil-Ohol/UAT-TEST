/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "store";
import { RootState } from "store/slices";
import {
  GetDiscussionDetails,
  newMessage
} from "store/slices/staging-zone-slice";
import { Conversation } from "models/discussion";
import "./discussion-details.css";

export type DiscussionDetailsProps = {
  className: string;
  discussionId: string;
  isDocumentView: boolean;
};

function DiscussionDetails(props: DiscussionDetailsProps) {
  const { className, discussionId, isDocumentView } = props;

  const [filterByDate, setFilterByDate] = useState<any>();
  const [msgDate, setMsgDate] = useState<string[]>();
  const [sendMessage, setSendMessage] = useState("");

  const bottomRef = useRef<any>(null);
  const inputdiv = useRef<any>(null);
  const topRef = useRef<any>();
  const chatMessages = useAppSelector(
    (state: RootState) => state.stagingZone.discussions
  );
  const dispatch = useAppDispatch();

  const height = topRef.current ? topRef.current.offsetHeight - 121 : 100;
  // get Total chat count
  const totalChat =
    discussionId !== "" && chatMessages[discussionId]
      ? chatMessages[discussionId].list?.length
      : 0;

  // dummy user for testing
  const currentUser = "roman";

  const loadList = async () => {
    await dispatch(GetDiscussionDetails(discussionId));
  };

  useEffect(() => {
    bottomRef.current?.scrollTo(0, bottomRef.current?.scrollHeight);
  }, [filterByDate]);

  useEffect(() => {
    if (discussionId !== "") {
      loadList();
    }
  }, [discussionId]);

  const onClickSendBtn = async () => {
    const chatInfo = {
      id: Math.floor(Math.random() * 11000),
      messageBy: currentUser,
      messageDate: moment(new Date(), "YYYY-MM-DD HH:MM A")
        .format("YYYY-MM-DD HH:MM A")
        .toString(),
      message: sendMessage
    };
    await dispatch(newMessage({ discussionId, chatInfo }));
    setSendMessage("");
  };

  useEffect(() => {
    if (discussionId !== "" && chatMessages[discussionId]) {
      const sortedChatByDate = chatMessages[discussionId]?.list
        ?.slice()
        .sort(
          (a: any, b: any) =>
            new Date(a.messageDate).getTime() -
            new Date(b.messageDate).getTime()
        );

      const newSortedData = {
        ...chatMessages[discussionId]?.list,
        chats: sortedChatByDate
      };

      const filterByDateData = newSortedData?.chats?.reduce(
        (result: any, currentValue: any) => {
          const newArray = result;
          (newArray[
            moment(currentValue.messageDate, "YYYY-MM-DD")
              .format("dddd, DD MMM YYYY ")
              .toString()
          ] =
            newArray[
              moment(currentValue.messageDate, "YYYY-MM-DD")
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
    }
  }, [chatMessages[discussionId]?.list, isDocumentView]);

  return (
    <div ref={topRef} className={className}>
      <div
        className={
          isDocumentView ? "discussionDetails-top" : "discussionDetails"
        }
      >
        <div className="discussion-count">Discussion({totalChat})</div>
        {!isDocumentView && (
          <Button className="archieveBtn" disabled={discussionId === ""}>
            Archieve...
          </Button>
        )}
      </div>

      {discussionId !== "" && (
        <div className="chatMessageParent">
          <div
            ref={bottomRef}
            style={{ overflowY: "scroll", height: `${height}px` }}
            id="chatSection"
          >
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
                                  currentUser === data.messageBy
                                    ? "right"
                                    : "left",
                                clear: "both"
                              }}
                            >
                              <span style={{ color: "#000000" }}>
                                {currentUser === data.messageBy
                                  ? "you"
                                  : data.messageBy}
                                &bull;
                              </span>
                              <span
                                style={{
                                  marginLeft: "5px",
                                  color: "#0000007F"
                                }}
                              >
                                {moment(data.messageDate, "h:mm a").format(
                                  "h:mm a"
                                )}
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
                        </div>
                      );
                    })}
                </div>
              ))}
          </div>
        </div>
      )}
      {discussionId !== "" ? (
        <div className="sendMsgDiv">
          <Input
            placeholder="Type your message"
            value={sendMessage}
            size="large"
            suffix={
              <SendOutlined
                style={{ display: sendMessage !== "" ? "inline" : "none" }}
                onClick={onClickSendBtn}
              />
            }
            id="sendMsg"
            style={{
              background: "#0000000D 0% 0% no-repeat padding-box"
            }}
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                setSendMessage(event.target.value);
                onClickSendBtn();
              }
            }}
            onChange={(e) => {
              setSendMessage(e.target.value);
            }}
          />
        </div>
      ) : (
        <h3> No Messages</h3>
      )}
      <div ref={inputdiv} />
    </div>
  );
}

export default DiscussionDetails;

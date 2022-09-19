/* eslint-disable react-hooks/exhaustive-deps */
import { List, Badge, message } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import {
  addNewDiscussion,
  GetDiscussions
} from "store/slices/staging-zone-slice";
import React, { useRef, useState } from "react";
import { IconText } from "components/widgets";
import { Discussion } from "models/discussion";
import { DocAttachIcon, MessageIcon } from "components/svg-icons";
import "./discussion-list.css";
import DiscussionHeader from "./header";

function DiscussionList(props: any) {
  const { className, onClick, selectedData } = props;
  const dispatch = useAppDispatch();
  const bottomRef = useRef<any>();
  const [showNewConPopup, setShowNewConPopup] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState("");

  const loadList = async () => {
    await dispatch(GetDiscussions());
  };

  React.useEffect(() => {
    loadList();
  }, []);

  const data = useSelector(
    (state: RootState) => state.stagingZone.discussionList
  );

  const onDiscussionClick = (id: string) => {
    onClick(id);
    setSelectedId(id);
  };
  const onSearchSelectClick = (id: string) => {
    onClick(id);
    setSelectedId(id);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const onAddHandle = (topicName: string) => {
    setShowNewConPopup(false);
    const existDiscussion = data.find(
      (item: any) => item.topicName === topicName
    );
    if (existDiscussion) {
      message.error("Topic name exists, please enter a unique name.");
    } else {
      const newTopicId = data.length + 1;
      const newDiscussion = {
        topicId: newTopicId.toString(),
        topicName,
        unreadCount: 0,
        documentCount: 0,
        type: selectedData.length === 1 ? "related" : "general",
        relation: selectedData.length === 1 ? "submittalLog" : "",
        recordId: selectedData.length === 1 ? selectedData[0].id : ""
      };
      dispatch(addNewDiscussion(newDiscussion));
      setSelectedId(newDiscussion.topicId.toString());
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const onCancelClickHandle = () => {
    setShowNewConPopup(false);
  };

  const discussionCard = (item: Discussion) => {
    return (
      <List.Item
        onClick={() => onDiscussionClick(item.topicId)}
        className={
          selectedId === item.topicId
            ? " discussion-list discussion-list-active"
            : "discussion-list"
        }
        key={item.topicName}
        actions={
          selectedId !== item.topicId
            ? [
                item.unreadCount > 0 && (
                  <IconText
                    icon={MessageIcon}
                    text={<Badge count={item.unreadCount} />}
                    key="list-vertical-star-o"
                  />
                ),
                item.documentCount > 0 && (
                  <IconText
                    icon={DocAttachIcon}
                    text={<Badge count={item.documentCount} />}
                    key="list-vertical-message"
                  />
                ),
                <RightOutlined
                  onClick={() => onDiscussionClick(item.topicId)}
                />
              ]
            : []
        }
      >
        <div>{item.topicName}</div>
      </List.Item>
    );
  };

  return (
    <div className={className}>
      <List
        header={
          <DiscussionHeader
            onSearchSelect={onSearchSelectClick}
            setShowNewConPopup={setShowNewConPopup}
            showNewConPopup={showNewConPopup}
            selectedData={selectedData}
            onAddHandle={onAddHandle}
            onCancelClickHandle={onCancelClickHandle}
            linkType="Submittal"
          />
        }
        dataSource={data}
        renderItem={(item: any) => discussionCard(item)}
      />
      <div ref={bottomRef} />
    </div>
  );
}

export default DiscussionList;

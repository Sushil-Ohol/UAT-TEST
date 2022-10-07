/* eslint-disable react-hooks/exhaustive-deps */
import { List, Badge, message, Tooltip } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import {
  addNewDiscussion,
  GetDiscussions
} from "store/slices/staging-zone-slice";
import React, { useState } from "react";
import { IconText } from "components/widgets";
import { Discussion } from "models/discussion";
import { DocAttachIcon, MessageIcon } from "components/svg-icons";
import "./discussion-list.css";
import DiscussionHeader from "./header";

export type DiscussionListProps = {
  className: string;
  onClick: Function;
  selectedData: any[];
  submittalDetailsId: string;
};

function DiscussionList(props: DiscussionListProps) {
  const { className, onClick, selectedData, submittalDetailsId } = props;
  const dispatch = useAppDispatch();

  const scrollerTop = document.querySelector("#scrollerTop");
  const [showNewConPopup, setShowNewConPopup] = useState<boolean>(false);

  const loadList = async () => {
    await dispatch(GetDiscussions());
  };
  const data = useSelector(
    (state: RootState) => state.stagingZone.discussionList
  );

  const rowId =
    selectedData.length === 1
      ? selectedData[0]?.id.toString()
      : submittalDetailsId || "1000";

  const [selectedTopicId, setSelectedTopicId] = useState(rowId);

  React.useEffect(() => {
    loadList();
    onClick(rowId);
    setSelectedTopicId(rowId);
  }, []);
  React.useEffect(() => {
    if (selectedData.length <= 1) {
      onClick(rowId);
      setSelectedTopicId(rowId);
    }
  }, [selectedData]);

  const onDiscussionClick = (id: string) => {
    onClick(id);
    setSelectedTopicId(id);
  };

  const onSearchSelectClick = (id: string) => {
    onDiscussionClick(id || submittalDetailsId);
  };

  const onAddHandle = (topicName: string) => {
    setShowNewConPopup(false);
    const existDiscussion = data.find(
      (item: any) => item.topicName === topicName
    );
    if (existDiscussion) {
      message.error("Topic name exists, please enter a unique name.");
    } else {
      const newTopicId = (data.length + 1000).toString();
      const newDiscussion = {
        topicId: newTopicId,
        topicName,
        unreadCount: 0,
        documentCount: 0,
        type: selectedData.length === 1 ? "related" : "general",
        relation: selectedData.length === 1 ? "submittalLog" : "",
        recordId: selectedData.length === 1 ? selectedData[0].id : ""
      };
      dispatch(addNewDiscussion(newDiscussion));
      setSelectedTopicId(newTopicId);
      onDiscussionClick(newTopicId);
      scrollerTop?.scrollTo(0, 0);
    }
  };

  const onCancelClickHandle = () => {
    setShowNewConPopup(false);
  };

  const discussionCard = (item: Discussion) => {
    return (
      <List.Item
        id="scrollerView"
        onClick={() => onDiscussionClick(item.topicId)}
        className={
          selectedTopicId === item.topicId
            ? " discussion-list discussion-list-active"
            : "discussion-list"
        }
        key={item.topicName}
        actions={
          selectedTopicId !== item.topicId
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
        <Tooltip title={item.topicName}>
          <div className="colFirstValue">{item.topicName}</div>
        </Tooltip>
      </List.Item>
    );
  };

  return (
    <div className={className} id="scrollerTop">
      <List
        header={
          <DiscussionHeader
            onSearchSelect={onSearchSelectClick}
            setShowNewConPopup={setShowNewConPopup}
            showNewConPopup={showNewConPopup}
            selectedData={selectedData}
            onAddHandle={onAddHandle}
            onCancelClickHandle={onCancelClickHandle}
          />
        }
        dataSource={data}
        renderItem={(item: any) => discussionCard(item)}
      />
    </div>
  );
}

export default DiscussionList;

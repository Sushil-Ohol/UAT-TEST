/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, List, Row, Badge, Select } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import { GetDiscussions } from "store/slices/staging-zone-slice";
import React, { useState } from "react";
import { IconText, SearchableDropdown } from "components/widgets";
import { Discussion } from "models/discussion";
import { DocAttachIcon, MessageIcon } from "components/svg-icons";
import "./discussion-list.css";

function DiscussionList(props: any) {
  const { className, onClick } = props;
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState("");
  const { Option } = Select;

  const loadList = async () => {
    await dispatch(GetDiscussions());
  };

  React.useEffect(() => {
    loadList();
  }, []);

  const data = useSelector((state: RootState) => state.stagingZone.list);

  const onDiscussionClick = (id: string) => {
    onClick(id);
    setSelectedId(id);
  };
  const onSearchSelectClick = (id: string) => {
    onClick(id);
    setSelectedId(id);
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
                <IconText
                  icon={MessageIcon}
                  text={<Badge count={item.unreadCount} />}
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={DocAttachIcon}
                  text={<Badge count={item.documentCount} />}
                  key="list-vertical-message"
                />,
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
          <div>
            <Row className="discussion-header">
              <Col span={1}>
                <Button
                  size="middle"
                  className="new-discussion-btn"
                  icon={<PlusOutlined className="add-icon" />}
                >
                  Start new discussion
                </Button>
              </Col>
              <Col span={7} offset={16} className="wrapper-input-search">
                <SearchableDropdown
                  placeholder="Search"
                  data={data}
                  onSelect={onSearchSelectClick}
                />
              </Col>
            </Row>
            <Select
              defaultValue="Recently edited"
              className="discussion-select-input"
            >
              <Option value="Recently edited">Recently edited</Option>
            </Select>
          </div>
        }
        dataSource={data}
        renderItem={(item) => discussionCard(item)}
      />
    </div>
  );
}

export default DiscussionList;

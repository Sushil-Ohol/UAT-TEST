/* eslint-disable react-hooks/exhaustive-deps */
import { List } from "antd";
import { FileFilled, MessageTwoTone, RightOutlined } from "@ant-design/icons";
import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import { GetDiscussions } from "store/slices/staging-zone-slice";
import React from "react";
import { IconText } from "components/widgets";
import { Discussion } from "models/discussion";

function DiscussionList(props: any) {
  const { className, onClick } = props;
  const dispatch = useAppDispatch();

  console.log("list");
  const loadList = async () => {
    await dispatch(GetDiscussions());
  };

  React.useEffect(() => {
    loadList();
  }, []);

  const data = useSelector((state: RootState) => state.stagingZone.list);

  const onDiscussionClick = (id: string) => {
    onClick(id);
  };

  const discussionCard = (item: Discussion) => {
    return (
      <List.Item
        key={item.topicName}
        actions={[
          <IconText icon={FileFilled} text="156" key="list-vertical-star-o" />,
          <IconText
            icon={MessageTwoTone}
            text="2"
            key="list-vertical-message"
          />,
          <RightOutlined onClick={() => onDiscussionClick(item.topicId)} />
        ]}
      >
        <div>{item.topicName}</div>
      </List.Item>
    );
  };

  return (
    <div className={className}>
      <List dataSource={data} renderItem={(item) => discussionCard(item)} />
    </div>
  );
}

export default DiscussionList;

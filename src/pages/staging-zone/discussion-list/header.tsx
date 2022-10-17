import React, { useEffect, useState } from "react";
import { Button, Col, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchableDropdown } from "components/widgets";
import NewDiscussionPopup from "components/new-discussion";
import { NewConversationContent } from "constants/index";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import "./discussion-list.css";

export type DicussionListHeaderProps = {
  selectedData: any;
  showNewConPopup: boolean;
  setShowNewConPopup: any;
  onAddHandle: any;
  onSearchSelect: any;
  onCancelClickHandle: any;
};

function DiscussionHeader(props: DicussionListHeaderProps) {
  const {
    onSearchSelect,
    setShowNewConPopup,
    selectedData,
    onAddHandle,
    showNewConPopup,
    onCancelClickHandle
  } = props;
  const { Option } = Select;
  const [isGeneric, setIsGeneric] = useState(false);
  const data: any = useSelector(
    (state: RootState) => state.stagingZone.discussionList
  );

  useEffect(() => {
    if (selectedData.length > 0) {
      setIsGeneric(
        !data?.some(
          (item: any) => item.topicId === selectedData[0]?.id.toString()
        )
      );
    }
  }, [selectedData, data]);
  return (
    <div>
      <Row className="discussion-header">
        <Col span={1}>
          <Button
            onClick={() => {
              setShowNewConPopup(true);
            }}
            size="middle"
            className="new-discussion-btn"
            icon={<PlusOutlined className="add-icon" />}
          >
            Start new discussion
          </Button>
          <NewDiscussionPopup
            isGeneric={isGeneric}
            show={showNewConPopup}
            selectedData={selectedData}
            addBtnClick={onAddHandle}
            onCancel={onCancelClickHandle}
            title={isGeneric ? "Add Discussion" : "Add General Discussion"}
            addBtnText={isGeneric ? "Continue" : "Add"}
            modelContent={
              isGeneric
                ? NewConversationContent.Submittal
                : NewConversationContent.General
            }
          />
        </Col>
        <Col span={9} offset={14} className="wrapper-input-search">
          <SearchableDropdown
            placeholder="Search"
            data={data}
            onSelect={onSearchSelect}
          />
        </Col>
      </Row>
      {data.length > 0 && (
        <Select
          defaultValue="Recently edited"
          className="discussion-select-input"
        >
          <Option value="Recently edited">Recently edited</Option>
        </Select>
      )}
    </div>
  );
}

export default DiscussionHeader;

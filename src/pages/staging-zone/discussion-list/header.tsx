import React from "react";
import { Button, Col, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchableDropdown } from "components/widgets";
import NewDiscussionPopup from "components/new-discussion";
import { NewConversationContent } from "constants/index";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";

export type DicussionListHeaderProps = {
  selectedData: any;
  showNewConPopup: boolean;
  setShowNewConPopup: any;
  onAddHandle: any;
  onSearchSelect: any;
  onCancelClickHandle: any;
  linkType: string;
};

function DiscussionHeader(props: DicussionListHeaderProps) {
  const {
    onSearchSelect,
    setShowNewConPopup,
    selectedData,
    onAddHandle,
    showNewConPopup,
    onCancelClickHandle,
    linkType
  } = props;
  const { Option } = Select;
  const data: any = useSelector(
    (state: RootState) => state.stagingZone.discussionList
  );

  return (
    <div>
      <Row className="discussion-header">
        <Col span={1}>
          <Button
            onClick={() => setShowNewConPopup(true)}
            size="middle"
            className="new-discussion-btn"
            icon={<PlusOutlined className="add-icon" />}
          >
            Start new discussion
          </Button>
          <NewDiscussionPopup
            isGeneric={selectedData.length === 1}
            show={showNewConPopup}
            selectedData={selectedData}
            addBtnClick={onAddHandle}
            onCancel={onCancelClickHandle}
            linkType={linkType}
            title={
              selectedData.length === 1
                ? "Add Discussion"
                : "Add General Discussion"
            }
            addBtnText={selectedData.length === 1 ? "Continue" : "Add"}
            modelContent={
              selectedData.length === 1
                ? NewConversationContent.General
                : NewConversationContent.Submittal
            }
          />
        </Col>
        <Col span={7} offset={16} className="wrapper-input-search">
          <SearchableDropdown
            placeholder="Search"
            data={data}
            onSelect={onSearchSelect}
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
  );
}

export default DiscussionHeader;

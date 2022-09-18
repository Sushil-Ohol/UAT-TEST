import React from "react";
import { Button, Col, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchableDropdown } from "components/widgets";
import DiscussionPopup from "components/new-discussion";
import {
  linkDiscussionContent,
  isGenericDiscussionContent
} from "constants/index";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";

function DiscussionHeader(props: any) {
  const {
    onSearchSelect,
    setIsVisible,
    selectedData,
    onAddHandle,
    isVisible,
    onCancelClickHandle
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
            onClick={() => setIsVisible(true)}
            size="middle"
            className="new-discussion-btn"
            icon={<PlusOutlined className="add-icon" />}
          >
            Start new discussion
          </Button>
          <DiscussionPopup
            isGeneric={selectedData.length === 1}
            isVisible={isVisible}
            selectedData={selectedData}
            onAdd={onAddHandle}
            onCancel={onCancelClickHandle}
            modelHeaderTitle={
              selectedData.length === 1
                ? "Add discussion"
                : "Add general discussion"
            }
            onAddText={selectedData.length === 1 ? "Continue" : "Add"}
            modelContent={
              selectedData.length === 1
                ? isGenericDiscussionContent
                : linkDiscussionContent
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

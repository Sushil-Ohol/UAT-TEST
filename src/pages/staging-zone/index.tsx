import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import React from "react";
import { Col, Row } from "antd";
import { GetDiscussions } from "store/slices/staging-zone-slice";
import Discussions from "./discussion-list";
import DiscussionDetails from "./discussion-details";
import DiscussionDocs from "./discussion-docs";
import "./staging-zone.css";

function StagingZone() {
  const dispatch = useAppDispatch();

  const discussions = useSelector((state: RootState) => state.projects.list);

  const loadList = async () => {
    await dispatch(GetDiscussions());
  };

  React.useEffect(() => {
    loadList();
    console.log(discussions);
  }, []);

  return (
     <Row className="stagingZone">
      <Col span={8} style={{ borderRight: "3px solid #0000001A" }}>
        <Discussions className="stagingZoneCardContent" />
      </Col>
      <Col span={8} style={{ borderRight: "3px solid #0000001A" }}>
        <DiscussionDetails className="stagingZoneCardContent" />
      </Col>
      <Col span={8}>
        <DiscussionDocs className="stagingZoneCardContent" />
      </Col>
    </Row>
  );
}

export default StagingZone;

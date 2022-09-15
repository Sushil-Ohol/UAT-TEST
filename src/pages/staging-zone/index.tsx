/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import Discussions from "./discussion-list";
import DiscussionDetails from "./discussion-details";
import DiscussionDocs from "./discussion-docs";
import "./staging-zone.css";

function StagingZone(props: any) {
  const { onMouseDown } = props;
  const [discussionId, setDiscussionId] = useState("");

  React.useEffect(() => {}, []);

  const OnDiscussionSelected = (id: string) => {
    setDiscussionId(id);
  };

  return (
    <div id="page-wrap">
      <div
        style={{
          position: "absolute",
          height: "5px",
          padding: "0 4px 0",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          cursor: "ns-resize",
          backgroundColor: "#f4f7f9"
        }}
        onMouseDown={onMouseDown}
      />
      <div className="five-columns group">
        <Discussions
          className="col discussion"
          onClick={OnDiscussionSelected}
        />
        <DiscussionDetails
          className="col discussion"
          discussionId={discussionId}
        />
        <DiscussionDocs
          className="col discussion"
          discussionId={discussionId}
        />
      </div>
    </div>
  );
}

export default StagingZone;

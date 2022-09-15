import React, { useState } from "react";
import Discussions from "./discussion-list";
import DiscussionDetails from "./discussion-details";
import DiscussionDocs from "./discussion-docs";
import "./staging-zone.css";

function StagingZone() {
  const [discussionId, setDiscussionId] = useState("");

  React.useEffect(() => {}, []);

  const OnDiscussionSelected = (id: string) => {
    setDiscussionId(id);
  };

  return (
    <div id="page-wrap">
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

import React from "react";

function DiscussionDetails(props: any) {
  console.log("details");
  const { className, discussionId } = props;
  React.useEffect(() => {}, [props]);
  return <div className={className}>{discussionId} Discussion Details</div>;
}

export default DiscussionDetails;

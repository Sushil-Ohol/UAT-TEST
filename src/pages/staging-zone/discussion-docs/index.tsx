import React from "react";

function DiscussionDocs(props: any) {
  console.log("docs");
  const { className, discussionId } = props;
  React.useEffect(() => {}, [props]);
  return <div className={className}>{discussionId}Documents</div>;
}

export default DiscussionDocs;

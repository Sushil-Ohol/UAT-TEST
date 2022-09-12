import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import React from "react";
import { GetDiscussions } from "store/slices/staging-zone-slice";
import Discussions from "./discussion-list";
import DiscussionDetails from "./discussion-details";
import DiscussionDocs from "./discussion-docs";

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
    <div>
      <Discussions />
      <DiscussionDetails />
      <DiscussionDocs />
    </div>
  );
}

export default StagingZone;

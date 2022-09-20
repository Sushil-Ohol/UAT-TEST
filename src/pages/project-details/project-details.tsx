import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { setProjectId } from "store/slices/homeSlice";

function ProjectDetails() {
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;

  React.useEffect(() => {
    dispatch(setProjectId(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="container">
      <div className="my-3" />
    </div>
  );
}

export default ProjectDetails;

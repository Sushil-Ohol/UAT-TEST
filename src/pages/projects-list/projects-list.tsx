/* eslint-disable react-hooks/exhaustive-deps */
/* Project List Page Component */

import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Project } from "models/project";
import { useAppDispatch } from "store";
import { getProjectList } from "store/slices/projectSlice";
import { Card, List } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import { useHistory } from "react-router";
import construction from "../../assets/construction.jpg";

const { Meta } = Card;

function ProjectList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const allProjects = useSelector((state: RootState) => state.projects.list);
  const loadList = async () => {
    await dispatch(getProjectList());
  };

  React.useEffect(() => {
    if (allProjects && allProjects.length === 0) {
      loadList();
    }
  }, []);

  return (
    <div style={{ height: "60vh" }}>
      <List
        grid={{
          column: 3
        }}
        style={{ margin: "15px" }}
        dataSource={allProjects}
        renderItem={(item: Project) => (
          <List.Item style={{ margin: "15px" }}>
            <Card
              hoverable
              cover={
                item.id === "0" ? "" : <img alt="example" src={construction} />
              }
              onClick={() =>
                item.id === "0"
                  ? history.push("/project/new")
                  : history.push(`/project/details/${item.id}/submittals`)
              }
            >
              <Meta
                style={{ margin: "5px" }}
                title={item.name}
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ProjectList;

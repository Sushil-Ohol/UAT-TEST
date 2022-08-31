/* eslint-disable react-hooks/exhaustive-deps */
/* Project List Page Component */

import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Project } from "models/project";
import { useAppDispatch } from "store";
import { getProjectList } from "store/slices/projectSlice";
import { ICellRendererParams } from "ag-grid-community";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";

function LinkComponent(props: ICellRendererParams) {
  const { value } = props;
  return <a href={`/project/details/${value}/submittals`}>{value}</a>;
}

function ProjectList() {
  const gridRef = useRef<AgGridReact<Project>>(null);
  const dispatch = useAppDispatch();

  const allProjects = useSelector((state: RootState) => state.projects.list);

  const columnDefs: any = [
    {
      field: "id",
      headerName: "ID",
      cellRenderer: "LinkComponent"
    },
    {
      field: "name",
      headerName: "Name",
      tooltipField: "name"
    },
    {
      field: "description",
      tooltipField: "description",
      headerName: "Description"
    },
    {
      field: "documents",
      headerName: "Documents"
    },
    {
      field: "floors",
      headerName: "Total Floors"
    },
    {
      field: "materials",
      headerName: "Total Materials"
    },
    {
      field: "submittals",
      headerName: "Total Submittals"
    }
  ];

  const loadList = async () => {
    await dispatch(getProjectList(0));
  };

  React.useEffect(() => {
    if (allProjects && allProjects.length === 0) {
      loadList();
    }
  }, []);

  return (
    <div style={{ height: "60vh" }}>
      <a href="/project/new" rel="noopener noreferrer">
        <Button>Create New Project</Button>
      </a>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact<Project>
          ref={gridRef}
          rowData={allProjects}
          columnDefs={columnDefs}
          frameworkComponents={{
            LinkComponent
          }}
          masterDetail
        />
      </div>
    </div>
  );
}

export default ProjectList;

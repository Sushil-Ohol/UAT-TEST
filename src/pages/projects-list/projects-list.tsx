/* eslint-disable react-hooks/exhaustive-deps */
/* Project List Page Component */

import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Project } from "models/project";
import { useAppDispatch } from "store";
import { getProjectList } from "store/slices/projectSlice";
import { isFulfilled } from "@reduxjs/toolkit";
import { ICellRendererParams } from "ag-grid-community";

function LinkComponent(props: ICellRendererParams) {
  const { value } = props;
  return <a href={`/project/details/${value}`}>{value}</a>;
}

function ProjectList() {
  const gridRef = useRef<AgGridReact<Project>>(null);
  const [rowData, setRowData] = useState<Project[]>();
  const dispatch = useAppDispatch();

  const columnDefs: any = [
    {
      field: "id",
      headerName: "ID",
      cellRenderer: "LinkComponent"
    },
    {
      field: "name",
      headerName: "Name"
    }
  ];

  const loadList = async () => {
    const actionResult = await dispatch(getProjectList(0));
    if (isFulfilled(actionResult)) {
      const { payload } = actionResult;
      if (payload.success) {
        setRowData(payload.response);
      }
    }
  };

  React.useEffect(() => {
    loadList();
  }, []);

  return (
    <div style={{ height: "60vh" }}>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-alpine"
      >
        <AgGridReact<Project>
          ref={gridRef}
          rowData={rowData}
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

/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* Project Details Page */
import { Row, Col, Input, Space, Select, Checkbox } from "antd";

import React, { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-alpine.css";

import "./submittal-list.css";

interface SubmittalGrid {
    id:number;
    submittal: string;
    notification: number;
    comments: number;
    revision: number;
    status: string;
    dueBy: string;
    contractor: string;
    dependsOn: string;
    assigned: string;
}
function SubmittalList() {
  const { Option } = Select;
  const gridRef = useRef<AgGridReact<SubmittalGrid>>(null);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalGrid[]>();
  const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    { field: "id", headerName: "ID",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    cellRendererParams: {checkbox: true}
      },
    { field: "submittal", headerName: "SUBMITTAL" },
    { field: "notification", headerName: "NOTIFICATION", icons: {menu: '<i class="fa fa-bell" aria-hidden="true"/>',}},
    { field: "comments", headerName: "COMMENTS", icons: {menu: '<i class="far fa-comments" aria-hidden="true"/>',}},
    { field: "revision", headerName: "REVISION", icons: {menu: '<i class="fa fa-file" aria-hidden="true"/>',}},
    {
      field: "status", headerName: "STATUS",
      cellStyle: (params: { value: string; }) => {
        if (params.value === "Approved") {
          return { color: "green" };
        } if (params.value === "In Review") {
          return { color: "orange" };
        } if (params.value === "Cancelled") {
          return { color: "red" };
        }
        return { color: "black" };;
      }
    },
    { field: "dueBy", headerName: "DUE BY" },
    { field: "contractor", headerName: "CONTRACTOR" },
    { field: "dependsOn", headerName: "DEPENDS ON" },
    { field: "assigned", headerName: "ASSIGNED" },
    { cellRenderer: "iconComponent" }

  
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Athlete",
      field: "athlete",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
      checkbox: true
      }
    };
  }, []);

  const defaultColDef: {} = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      minWidth: 100,
      editable: true,
      resizable: true,
      filter: true
    };
  }, []);
  const detailCellRendererParams = useMemo<any>(() => {
    return {
      detailGridOptions: {
        // rowSelection: "multiple",
        suppressRowClickSelection: true,
        enableRangeSelection: true,
        rowSelection: "multiple",
        pagination: true,
        onSelectionChanged: (event: {
          api: { getSelectedRows: () => any };
        }) => {
          console.log(event.api.getSelectedRows());
        },
        paginationAutoPageSize: true,
        columnDefs: [
          {
            field: "callId",
            checkboxSelection: true,
            headerCheckboxSelection: true
          },
          { field: "direction" },
          { field: "number", minWidth: 150 },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode", minWidth: 150 }
        ],
        defaultColDef: {
          sortable: true,
          flex: 1,
          editable: true
        }
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.callRecords);
      }
    };
  }, []);


  const onGridReady = useCallback(() => {
    // fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
    //   .then((resp) => resp.json())
    //   .then((data: any) => {
    //     setRowData([...data]);
    //   })

    const data:any = [{
        "id": "1001",
        "submittal": "Electrical Package",
        "notification": 2,
        "comments": 4,
        "revision": 3,
        "status": "Approved", 
        "dueBy": "20-08-2022",
        "contractor": "ABC Construction",
        "dependsOn": "1079",
        "assigned": "Luke"  
    },
    {
        "id": "1002",
        "submittal": "Piping Package",
        "notification": 2,
        "comments": 4,
        "revision": 3,
        "status": "In Review", 
        "dueBy": "20-08-2022",
        "contractor": "ABC Construction",
        "dependsOn": "2098",
        "assigned": "Luke"  
    }];

    setRowData([...data]);
    

  }, []);

  const onFirstDataRendered = useCallback(() => {
    setTimeout(() => {
      gridRef.current!.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const onCellEditRequest = useCallback((event) => {
  }, []);

  return (
    <>
      <Row className="FilterRow" />
             <Row>
        <Col span={24}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<SubmittalGrid>
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoGroupColumnDef={autoGroupColumnDef}
              rowSelection="multiple"
              groupSelectsChildren
              suppressRowClickSelection
              suppressAggFuncInHeader
              readOnlyEdit
              pagination
              paginationAutoPageSize
              masterDetail 
              detailCellRendererParams={detailCellRendererParams} 
              onGridReady={onGridReady} 
              onFirstDataRendered={onFirstDataRendered} 
              onCellEditRequest={onCellEditRequest}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

  export default SubmittalList;
  
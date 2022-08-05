/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* Project Details Page */
import { Row, Col, Input, Space, Select, Button, Card } from "antd";

import React, { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";

import { GridOptions, ICellRendererParams } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-alpine.css";

import "./submittal-list.css";

import { BellOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";

import jsonData from "./data.json";

import CreateSubmittal from "./create-submittal";

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

export type AppProps = {
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  gridOptions?: GridOptions;
};
// eslint-disable-next-line react/function-component-definition
const Buttons: React.FC<ICellRendererParams & AppProps> = (params: any) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      style={{
        border: "none",
        padding: 0,
        background: "none"
      }}
      onClick={() => {
        // eslint-disable-next-line react/destructuring-assignment
        params.onClick?.();
      }}
    >
      <MoreOutlined />
    </button>
  );
};

// eslint-disable-next-line react/function-component-definition
const CommentButtons: React.FC<ICellRendererParams & AppProps> = (params: any) => {
  return (
    <i className="far fa-comments mx-auto btn-lg" aria-hidden="true" />
  );
};


// eslint-disable-next-line react/function-component-definition
const NotificationBellButtons: React.FC<ICellRendererParams & AppProps> = (params: any) => {
  return (
    <i className="far fa-bell align-items-center d-flex col-md-6 btn-lg" aria-hidden="true" />
  );
};


// eslint-disable-next-line react/function-component-definition
const RevisionButtons: React.FC<ICellRendererParams & AppProps> = (params: any) => {
  return (
    <i className="far fa-file align-items-center d-flex col-md-6 btn-lg" aria-hidden="true" />
  );
};

function SubmittalList() {
  const { Option } = Select;
  const gridRef = useRef<AgGridReact<SubmittalGrid>>(null);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalGrid[]>();
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", headerName: "ID",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    cellRendererParams: {checkbox: true},
    },
    { field: "submittal", headerName: "SUBMITTAL" },
    { field: "notification", headerName: "", headerComponentFramework: NotificationBellButtons},
    { field: "comments", headerName: "", headerComponentFramework: CommentButtons},
    { field: "revision", headerName: "", headerComponentFramework: RevisionButtons},
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
    { cellRendererFramework: Buttons}

  
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "",
      field: "",
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
      editable: true,
      resizable: true,
      filter: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      wrapText: true,     // <-- HERE
      autoHeight: true,   // <-- & HERE  
    };
  }, []);


  const onGridReady = useCallback(() => {
    // fetch("http://localhost:3000/src/pages/submittal/data.json")
    //   .then((resp) => resp.json())
    //   .then((data: any) => {
    //     console.log(data);
    //     setRowData([...data]);
    //   })

      const data:any = jsonData;
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
      <Row className="FilterRow">
        <Col span={24}>
          <Space>
            <Input
              type="text"
              id="filter-text-box"
              placeholder="Search"
              onInput={onFilterTextBoxChanged}
              prefix={<SearchOutlined />}
            />
            <Input.Group compact>
        
              &nbsp;&nbsp;
              {/* <Input.Group compact> */}
              <Input style={{ width: "10%" }} defaultValue="Status" disabled />
              <Select
                style={{ width: 85 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                <Option value="0">All</Option>
                <Option value="1">Assigned</Option>
                <Option value="2">In Review</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Resolved</Option>
                <Option value="5">Closed</Option>
              </Select>
              {/* </Input.Group> */}
              &nbsp;&nbsp;
              {/* <Input.Group compact> */}
              <Input style={{ width: "10%" }} defaultValue="Contractor" disabled />

              <Select
                style={{ width: 85 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                <Option value="0">ABC Construction</Option>
                <Option value="1">Test Construction</Option>
              </Select>
              {/* </Input.Group> */}
              &nbsp;&nbsp;
              {/* <Input.Group compact> */}
              <Input style={{ width: "10%" }} defaultValue="Pass" disabled />

              <Select
                style={{ width: 100 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="Past due"
              >
                <Option value="0">Past due</Option>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <section >
              <CreateSubmittal/>
              </section>
            </Input.Group>

          </Space>
        </Col>
      </Row>
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
              masterDetail 
              onGridReady={onGridReady} 
              onFirstDataRendered={onFirstDataRendered} 
              onCellEditRequest={onCellEditRequest}
            />
          </div>

         {/* bottom part */}
         <section className="blue-grid">
            <Card bordered={false} style={{ width: "auto", border: "0.2px solid #e5e5e5" }}>
              <Row gutter={12}>
                <Col span={2}>
                  <div>
                    <span>3 Selected</span>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="block">
                    <Button block>
                      Create a Package...
                    </Button>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="block">
                    <Button block>
                      Merge...
                    </Button>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="block">
                    <Button block>
                      Archieve
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </section>
          </Col>
      </Row>
    </>
  );
}

  export default SubmittalList;
  
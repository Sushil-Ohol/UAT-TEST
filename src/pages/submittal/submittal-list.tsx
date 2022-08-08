import { Row, Col, Input, Space, Select, Button, Card } from "antd";

import React, { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-alpine.css";

import "./submittal-list.css";

import { MoreOutlined, SearchOutlined } from "@ant-design/icons";

import {
  statusValues,
  ContractorValues,
  AssignValues,
  ContractorOptions
} from "../constant";

import submittalLog from "../../assets/data/submittal-log.json";

import CreateSubmittal from "./create-submittal";

interface SubmittalGrid {
  id: number;
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

function Buttons() {
  return <MoreOutlined />;
}

function CommentButtons() {
  return <i className="far fa-comments mx-auto btn-lg" aria-hidden="true" />;
}

function NotificationBellButtons() {
  return (
    <i
      className="far fa-bell align-items-center d-flex col-md-6 btn-lg"
      aria-hidden="true"
    />
  );
}

function RevisionButtons() {
  return (
    <i
      className="far fa-file align-items-center d-flex col-md-6 btn-lg"
      aria-hidden="true"
    />
  );
}

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalGrid>>(null);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalGrid[]>();
  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRendererParams: { checkbox: true }
    },
    { field: "submittal", headerName: "SUBMITTAL" },
    {
      field: "notification",
      headerName: "",
      headerComponentFramework: NotificationBellButtons
    },
    {
      field: "comments",
      headerName: "",
      headerComponentFramework: CommentButtons
    },
    {
      field: "revision",
      headerName: "",
      headerComponentFramework: RevisionButtons
    },
    {
      field: "status",
      headerName: "STATUS",
      cellStyle: (params: { value: string }) => {
        if (params.value === "Approved") {
          return { color: "green" };
        }
        if (params.value === "In Review") {
          return { color: "orange" };
        }
        if (params.value === "Cancelled") {
          return { color: "red" };
        }
        return { color: "black" };
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: statusValues
      }
    },
    { field: "dueBy", headerName: "DUE BY" },
    {
      field: "contractor",
      headerName: "CONTRACTOR",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ContractorValues
      }
    },
    { field: "dependsOn", headerName: "DEPENDS ON" },
    {
      field: "assigned",
      headerName: "ASSIGNED",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: AssignValues
      }
    },
    { cellRendererFramework: Buttons, editable: false }
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "",
      field: "",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true
      },
      cellEditorPopup: true
    };
  }, []);

  const defaultColDef: {} = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      editable: true,
      filter: true,
      width: 100
    };
  }, []);

  const onGridReady = useCallback(() => {
    const data: any = submittalLog;
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
              <Input style={{ width: "10%" }} defaultValue="Status" disabled />
              <Select
                style={{ width: 85 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                {statusValues.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
              {/* </Input.Group> */}
              &nbsp;&nbsp;
              {/* <Input.Group compact> */}
              <Input
                style={{ width: "10%" }}
                defaultValue="Contractor"
                disabled
              />
              <Select
                style={{ width: 85 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                {ContractorOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
              {/* </Input.Group> */}
              &nbsp;&nbsp;
              {/* <Input.Group compact> */}
              <Input style={{ width: "10%" }} defaultValue="Due" disabled />
              <Select
                style={{ width: 100 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="Past due"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <section>
                <CreateSubmittal />
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
            />
          </div>

          {/* bottom part */}
          <section className="blue-grid">
            <Card
              bordered={false}
              style={{ width: "auto", border: "0.2px solid #e5e5e5" }}
            >
              <Row gutter={12}>
                <Col span={2}>
                  <div>
                    <span>0 Selected</span>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="block">
                    <Button block>Create a Package...</Button>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="block">
                    <Button block>Merge...</Button>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="block">
                    <Button block>Archieve</Button>
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

import { Row, Col, Input, Space, Select, Button } from "antd";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./material-list.css";
import { SearchOutlined } from "@ant-design/icons";
import jsonData from "./data.json";

interface MaterialGrid {
  id: number;
  qtyUnits: string;
  material: any;
  status: string;
  assigned: number;
  contractor: string;
  procureBy: number;
  diliverBy: string;
  dependsOn: string;
  submittal: string;
  // more: string;
}

function Materials() {
  const { Option } = Select;
  const gridRef = useRef<AgGridReact<MaterialGrid>>(null);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [rowData, setRowData] = useState<MaterialGrid[]>();
  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRendererParams: {
        checkbox: true
      }
    },
    {
      field: "qty",
      headerName: "QTY"
    },
    {
      field: "units",
      headerName: "UNITS"
    },
    {
      field: "material",
      headerName: "MATERIAL"
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
        return { color: "black" };
      }
    },
    {
      field: "assigned",
      headerName: "ASSIGNED"
    },
    {
      field: "contractor",
      headerName: "CONTRACTOR"
    },
    {
      field: "procureBy",
      headerName: "PROCURE BY"
    },

    {
      field: "deliverBy",
      headerName: "DELIVER BY"
    },
    { field: "dependsOn", headerName: "DEPENDS ON" },

    { field: "submittal", headerName: "SUBMITTAL" },
    { field: "", headerName: "" }
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
      minWidth: 100,
      editable: true,
      resizable: true,
      filter: true
    };
  }, []);

  const onGridReady = useCallback(() => {
    const data: any = jsonData;
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

  const onCellEditRequest = useCallback(() => {}, []);

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
              <Input style={{ width: "10%" }} defaultValue="Floor" disabled />
              <Select
                style={{ width: 100 }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="Floor 1"
              >
                <Option value="0">Floor 1</Option>
                <Option value="1">Floor 2</Option>
                <Option value="2">Floor 3</Option>
                <Option value="3">Floor 4</Option>
                <Option value="4">Floor 5</Option>
                <Option value="5">Floor 6</Option>
              </Select>
              &nbsp;&nbsp;
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
              &nbsp;&nbsp;
              <Input
                style={{ width: "10%" }}
                defaultValue="Assigned"
                disabled
              />
              <Select
                style={{ width: 85, background: "#DCDCDC" }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                <Option value="0">ABC</Option>
                <Option value="1">Other</Option>
              </Select>
              &nbsp;&nbsp;
              <Input
                style={{ width: "10%", background: "#DCDCDC" }}
                defaultValue="Procure by"
                disabled
              />
              <Select
                style={{ width: 85, background: "#DCDCDC" }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                <Option value="0">Before</Option>
                <Option value="1">After</Option>
              </Select>
              <Select
                style={{ width: 85, background: "#DCDCDC" }}
                onChange={(value: any) => {
                  gridRef.current!.api.setQuickFilter(value);
                }}
                defaultValue="All"
              >
                <Option value="0">This Week</Option>
                <Option value="1">This Month</Option>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <section>
                <Button>+ New Material</Button>
              </section>
            </Input.Group>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact<MaterialGrid>
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

export default Materials;

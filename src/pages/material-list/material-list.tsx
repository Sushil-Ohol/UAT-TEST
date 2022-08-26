import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./material-list.css";
import { Drawer } from "antd";
import MaterialCreateComponent from "pages/material-create";

import { setProjectId } from "store/slices/homeSlice";
import { useAppDispatch } from "store";
import { useParams } from "react-router-dom";
import MaterialListFilterBar from "./filter-bar";
import materialsData from "../../assets/data/materials.json";

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
}

function Materials() {
  const gridRef = useRef<AgGridReact<MaterialGrid>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [rowData, setRowData] = useState<MaterialGrid[]>();
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;
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

  React.useEffect(() => {
    dispatch(setProjectId(projectId));
  }, [dispatch, projectId]);

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

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true
          }
        }
      ],
      defaultToolPanel: ""
    };
  }, []);

  const onGridReady = useCallback(() => {
    const data: any = materialsData;
    setRowData([...data]);
  }, []);

  const onFirstDataRendered = useCallback(() => {
    setTimeout(() => {
      gridRef.current!.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }, []);

  const onCellEditRequest = useCallback(() => {}, []);

  const onNewClick = () => {
    setShowNewDrawer(true);
  };

  const onApplyClick = () => {
    setShowNewDrawer(true);
  };

  const onDrawerClose = () => {
    setShowNewDrawer(false);
  };

  return (
    <div>
      <div>
        <MaterialListFilterBar
          gridRef={gridRef}
          onNewClick={onNewClick}
          onApplyClick={onApplyClick}
        />
      </div>
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
          sideBar={sideBar}
          paginationAutoPageSize
          masterDetail
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          onCellEditRequest={onCellEditRequest}
        />
      </div>
      <Drawer
        title="Create Material"
        placement="right"
        width="1040px"
        onClose={onDrawerClose}
        visible={showNewDrawer}
      >
        {showNewDrawer && <MaterialCreateComponent />}
      </Drawer>
    </div>
  );
}

export default Materials;

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./material-list.css";
import { Drawer } from "antd";
import MaterialCreateComponent from "pages/material-create";

import { materialCellRenderer } from "components/cell-renders";
import { setProjectId } from "store/slices/homeSlice";
import { useAppDispatch } from "store";
import { useParams } from "react-router-dom";
import MaterialListFilterBar from "./filter-bar";
import materialsData from "../../assets/data/materials.json";

interface Insight {
  summary: string;
  description: string;
}

interface MaterialGrid {
  id: number;
  qtyUnits: string;
  material: any;
  status: string;
  assigned: number;
  company: string;
  procureBy: number;
  diliverBy: string;
  dependsOn: string;
  submittal: string;
  insights?: Insight[];
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
      minWidth: 20,
      maxWidth: 125,
      cellRendererParams: {
        checkbox: true
      }
    },
    {
      field: "qty",
      headerName: "QTY",
      minWidth: 20,
      maxWidth: 100
    },
    {
      field: "units",
      headerName: "UNITS",
      minWidth: 20,
      maxWidth: 100
    },
    {
      field: "material",
      headerName: "MATERIAL",
      cellRenderer: materialCellRenderer,
      minWidth: 200,
      maxWidth: 350
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
      field: "company",
      headerName: "COMPANY"
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

    { field: "submittal", headerName: "SUBMITTAL" }
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

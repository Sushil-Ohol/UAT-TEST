import { DatePicker, Drawer } from "antd";
import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./submittal-list.css";
import { Buttons } from "components/widgets";
import SubmittalCreateComponent from "pages/submittal-create/submittal-create";
import { DropDownData } from "../../constants";
import submittalLog from "../../assets/data/submittal-log.json";
import SubmittalListFilterComponent from "./filter-bar";
import SubmittalListBottomBar from "./bottom-bar";

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

function NewDatePicker() {
  return <DatePicker />;
}

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalGrid>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
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
      headerComponentFramework: Buttons.NotificationBellButton
    },
    {
      field: "comments",
      headerName: "",
      headerComponentFramework: Buttons.CommentButton
    },
    {
      field: "revision",
      headerName: "",
      headerComponentFramework: Buttons.RevisionButton
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
        values: DropDownData.StatusOptions
      }
    },
    {
      field: "dueBy",
      headerName: "DUE BY",
      cellEditor: NewDatePicker,
      cellEditorPopup: true
    },
    {
      field: "contractor",
      headerName: "CONTRACTOR",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: DropDownData.ContractorOptions
      }
    },
    { field: "dependsOn", headerName: "DEPENDS ON" },
    {
      field: "assigned",
      headerName: "ASSIGNED",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: DropDownData.AssignOptions
      }
    },
    { cellRendererFramework: Buttons.MoreOutlinedButton, editable: false }
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

  const onGridReady = () => {
    const data: any = submittalLog;
    setRowData([...data]);
  };

  const onNewClick = () => {
    setShowNewDrawer(true);
  };

  const onApplyClick = () => {
    setShowNewDrawer(true);
  };

  const onRowSelected = (row: any) => {
    if (row.node.selected) {
      setSelectedRows((count) => count + 1);
    } else {
      setSelectedRows((count) => count - 1);
    }
  };

  const onDrawerClose = () => {
    setShowNewDrawer(false);
  };

  const onFirstDataRendered = useCallback(() => {
    setTimeout(() => {
      gridRef.current!.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }, []);

  return (
    <div>
      <SubmittalListFilterComponent
        gridRef={gridRef}
        onNewClick={onNewClick}
        onApplyClick={onApplyClick}
      />
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
          onRowSelected={onRowSelected}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
      <SubmittalListBottomBar selected={selectedRows} />
      <Drawer
        title="Create a new submittal"
        placement="right"
        width="1040px"
        onClose={onDrawerClose}
        visible={showNewDrawer}
      >
        {showNewDrawer && <SubmittalCreateComponent />}
      </Drawer>
    </div>
  );
}

export default SubmittalList;

/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Drawer, message } from "antd";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  CellEditRequestEvent,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams
} from "ag-grid-community";
import "./submittal-list.css";
import { Buttons } from "components/widgets";
import { useAppDispatch } from "store";
import { getSubmittalList } from "store/slices/submittalsSlices";
import SubmittalCreateComponent from "pages/submittal-create/submittal-create";
import { SubmittalLog } from "models/submittal-log";
import { isFulfilled } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import SubmittalEdit from "pages/submittal-edit/submittal-edit";
// import moment from "moment";
import {
  ApprovedCommentsIcon,
  ApprovedIcon,
  InreviewIcon,
  RejectedIcon,
  Notification1Icon,
  Notification2Icon,
  ChatIcon,
  DocAttachIcon,
  NotificationIcon
} from "../../components/svg-icons/index";
import AddNewColumn from "./add-new-column/add-new-column";
// LicenseManager.setLicenseKey("<enterprisekey>");
import { DropDownData } from "../../constants";
import SubmittalListFilterComponent from "./filter-bar";
import SubmittalListBottomBar from "./bottom-bar";

function asDate(dateAsString: string) {
  const splitFields = dateAsString.split("-");
  return new Date(
    Number.parseInt(splitFields[2], 10),
    Number.parseInt(splitFields[1], 10) - 1,
    Number.parseInt(splitFields[0], 10)
  );
}

const dateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const cellDate = asDate(cellValue);

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 1;
  }
};

function NewDatePicker() {
  return <DatePicker />;
}
const statusCellRenderer = (params: any) => {
  if (params.value === "Approved") {
    return <ApprovedIcon />;
  }
  if (params.value === "In Review") {
    return <InreviewIcon />;
  }
  if (params.value === "Approved with Comments") {
    return <ApprovedCommentsIcon />;
  }
  return <RejectedIcon />;
};

const notificationCellRenderer = (params: any) => {
  if (params.value === "1") {
    return <Notification1Icon />;
  }
  return <Notification2Icon />;
};

let immutableRowData: any[];

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalLog>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const [showSubmittalEdit, setShowSubmittalEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const gridStyle = useMemo(() => ({ height: "800px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalLog[]>();
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      minWidth: 102
    },
    {
      field: "submittal",
      headerName: "SUBMITTAL",
      minWidth: 250,
      tooltipField: "submittal"
    },
    {
      field: "notification",
      headerName: "NOTIFICATION",
      minWidth: 40,
      cellRendererFramework: notificationCellRenderer,
      headerComponentFramework: NotificationIcon
    },
    {
      field: "comments",
      headerName: "COMMENTS",
      minWidth: 40,
      headerComponentFramework: ChatIcon
    },
    {
      field: "revision",
      headerName: "REVISION",
      minWidth: 40,
      headerComponentFramework: DocAttachIcon
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 120,
      cellRendererFramework: statusCellRenderer,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: DropDownData.StatusOptions
      }
    },
    {
      field: "dueBy",
      headerName: "DUE BY",
      minWidth: 140,
      cellEditor: NewDatePicker,
      cellEditorPopup: true,
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams
    },
    {
      field: "contractor",
      headerName: "CONTRACTOR",
      minWidth: 180,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: DropDownData.ContractorOptions
      }
    },
    {
      field: "dependsOn",
      headerName: "DEPENDS ON",
      minWidth: 160,
      cellClass(params) {
        return params.value === "" ? "defaultCellColor" : "hoverColor";
      }
    },
    {
      field: "assigned",
      headerName: "ASSIGNED",
      cellEditor: "agSelectCellEditor",
      minWidth: 150,
      cellEditorParams: {
        values: DropDownData.AssigneeOptions
      }
    },
    {
      cellRendererFramework: Buttons.MoreOutlinedButton,
      editable: false,
      headerComponentFramework: AddNewColumn,
      suppressColumnsToolPanel: true
    }
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "",
      field: "",
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
      width: 120,
      alignItems: "center"
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

  const loadList = async () => {
    const actionResult = await dispatch(getSubmittalList(projectId));
    if (isFulfilled(actionResult)) {
      const { payload } = actionResult;
      if (payload.success) {
        immutableRowData = payload.response;
        setRowData(immutableRowData);
      }
    }
  };

  React.useEffect(() => {
    // todo - here we will fetch the actual project id from route params and we will load details
    loadList();
  }, []);

  React.useEffect(() => {}, [immutableRowData]);

  React.useEffect(() => {
    dispatch(setProjectId(projectId));
  }, [dispatch, projectId]);

  const onNewClick = () => {
    setShowNewDrawer(true);
  };

  const onSelectionChanged = (grid: any) => {
    setSelectedRows(grid.api.getSelectedRows().length);
  };

  const onDrawerClose = () => {
    setShowNewDrawer(false);
  };

  const onSubmittalEditClick = () => {
    setShowSubmittalEdit(true);
  };

  const onSubmittalEditClose = () => {
    setShowSubmittalEdit(false);
  };

  const onFirstDataRendered = useCallback(() => {
    setTimeout(() => {
      gridRef.current!.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }, []);

  const getRowId = useMemo<GetRowIdFunc>(() => {
    return (params: GetRowIdParams) => params.data.id;
  }, []);

  const onCellEditRequest = useCallback(
    (event: CellEditRequestEvent) => {
      const { data } = event;
      const { field } = event.colDef;
      const newItem = { ...data };
      newItem[field!] = event.newValue;
      immutableRowData = immutableRowData.map((oldItem) =>
        oldItem.id === newItem.id ? newItem : oldItem
      );
      gridRef.current!.api.setRowData(immutableRowData);
    },
    [immutableRowData]
  );

  const onEditLogs = (data: any) => {
    if (
      data.status &&
      data.contractor &&
      data.status !== "" &&
      data.contractor !== "" &&
      data.assigned &&
      data.assigned !== ""
    ) {
      const selectedlogs = gridRef.current!.api.getSelectedRows();
      const newData = [...immutableRowData];
      selectedlogs.forEach((row: any) => {
        const { id } = row;
        const index = newData.findIndex((x) => x.id === id);
        const newitem = {
          ...newData[index],
          status: data.status,
          contractor: data.contractor,
          assigned: data.assigned,
          dueBy: data.dueBy
        };
        newData[index] = newitem;
        gridRef.current!.api.setRowData(newData);
      });
      immutableRowData = newData;
      message.success("Updated submittals sucessfully");
    }
    setShowSubmittalEdit(false);
  };

  return (
    <div>
      <SubmittalListFilterComponent
        gridRef={gridRef}
        onNewClick={onNewClick}
        editEnabled={selectedRows > 0}
        onSubmittalEditClick={onSubmittalEditClick}
      />
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<SubmittalLog>
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
          animateRows={false}
          sideBar={sideBar}
          onSelectionChanged={onSelectionChanged}
          onFirstDataRendered={onFirstDataRendered}
          getRowId={getRowId}
          onCellEditRequest={onCellEditRequest}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
        />
      </div>
      <SubmittalListBottomBar selected={selectedRows} />
      <Drawer
        title="Create a new submittal"
        placement="right"
        onClose={onDrawerClose}
        visible={showNewDrawer}
      >
        {showNewDrawer && <SubmittalCreateComponent />}
      </Drawer>
      <Drawer
        title="Bulk Edit"
        placement="right"
        onClose={onSubmittalEditClose}
        visible={showSubmittalEdit}
      >
        {showSubmittalEdit && (
          <SubmittalEdit
            onCancelClick={onSubmittalEditClose}
            onApplyClick={onEditLogs}
          />
        )}
      </Drawer>
    </div>
  );
}

export default SubmittalList;

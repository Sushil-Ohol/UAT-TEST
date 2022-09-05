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
import moment from "moment";
import { Buttons } from "components/widgets";
import { useAppDispatch } from "store";
import { getSubmittalList } from "store/slices/submittalsSlices";
import SubmittalCreateComponent from "pages/submittal-create/submittal-create";
import { SubmittalLog } from "models/submittal-log";
import { isFulfilled } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import SubmittalEdit from "pages/submittal-edit/submittal-edit";
import { DateFilter } from "utils/dateutils";
import {
  ChatIcon,
  DocAttachIcon,
  NotificationIcon
} from "../../components/svg-icons/index";
import AddNewColumn from "./add-new-column/add-new-column";
// LicenseManager.setLicenseKey("<enterprisekey>");
import { DropDownData } from "../../constants";
import SubmittalListFilterComponent from "./filter-bar";
import SubmittalListBottomBar from "./bottom-bar";
import DependsOnToolTip from "./depends-on-tooltip";
import DueDateFilters from "./due-date-filter";

function NewDatePicker() {
  return <DatePicker />;
}

const notificationCellRenderer = () => {
  return "";
};

let immutableRowData: any[];

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalLog>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const [showSubmittalEdit, setShowSubmittalEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const gridStyle = useMemo(() => ({ height: "780px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalLog[]>();
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      minWidth: 102,
      editable: false
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
      minWidth: 20,
      cellRendererFramework: notificationCellRenderer,
      headerComponentFramework: NotificationIcon,
      editable: false
    },
    {
      field: "comments",
      headerName: "COMMENTS",
      minWidth: 20,
      headerComponentFramework: ChatIcon,
      editable: false
    },
    {
      field: "revision",
      headerName: "REVISION",
      minWidth: 20,
      headerComponentFramework: DocAttachIcon,
      editable: false
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 120,
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
      filter: DueDateFilters
    },
    {
      headerName: "GOVERNING DATE",
      minWidth: 180,
      cellEditor: NewDatePicker,
      cellEditorPopup: true,
      filter: "agDateColumnFilter",
      filterParams: DateFilter
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
      tooltipField: "dependsOn",
      cellClass(params) {
        return params.value === "" ? "defaultCellColor" : "hoverColor";
      },
      tooltipComponent: DependsOnToolTip
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
    const newData = [...immutableRowData];
    gridRef.current!.api.getSelectedRows().forEach((row: any) => {
      const { id } = row;
      const index = newData.findIndex((x) => x.id === id);
      const newitem = {
        ...newData[index],
        status: data.status,
        contractor: data.contractor,
        assigned: data.assigned,
        dueBy: moment(data.dueBy).format("DD-MM-YYYY")
      };
      newData[index] = newitem;
      gridRef.current!.api.setRowData(newData);
    });
    immutableRowData = newData;
    message.success("Updated submittals sucessfully");
    gridRef.current!.api.deselectAll();
    setShowSubmittalEdit(false);
  };

  const onNewLog = (data: any) => {
    const newData = [...immutableRowData];
    const id = Math.max(...newData.map((item) => item.id));
    const newItem = {
      id: id + 1,
      ...data,
      notification: 0,
      comments: 0,
      revision: 0,
      status: ""
    };
    newData.push(newItem);
    setRowData(newData);
    immutableRowData = newData;
    message.success("New submittals added successfully");
    setShowNewDrawer(false);
  };

  return (
    <div>
      <SubmittalListFilterComponent gridRef={gridRef} onNewClick={onNewClick} />
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
      <SubmittalListBottomBar
        onSubmittalEditClick={onSubmittalEditClick}
        selected={selectedRows}
      />
      <Drawer
        title="Create a new submittal"
        placement="right"
        onClose={onDrawerClose}
        visible={showNewDrawer}
      >
        {showNewDrawer && (
          <SubmittalCreateComponent
            onCancelClick={onDrawerClose}
            onApplyClick={onNewLog}
          />
        )}
      </Drawer>
      <Drawer
        title={`Multi Edit | Submittals: ${selectedRows}`}
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

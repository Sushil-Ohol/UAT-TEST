/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { Drawer, message, Tooltip } from "antd";
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
import { FilterItem } from "models/types";
import { DateCellEditor } from "components";

import {
  IdLinkComponent,
  notificationCellRenderer,
  submittalCellRenderer,
  dateCellRenderer,
  contractorCellRenderer,
  contractorEditCellRenderer,
  assignedCellRenderer,
  assignedEditCellRenderer
} from "components/cell-renders";
import {
  ChatIcon,
  DocAttachIcon,
  NotificationIcon
} from "../../components/svg-icons/index";
import AddNewColumn from "./add-new-column";
import { DropDownData, DATE_FORMAT_MMDDYYY } from "../../constants";
import SubmittalListFilterComponent from "./filter-bar";
import SubmittalListBottomBar from "./bottom-bar";
import DependsOnToolTip from "./depends-on-tooltip";
import SubmittalTooltip from "./submittal-tooltip";
import CustomDateFilters from "./custom-date-filter";
import SubmittalSourceDetailRenderer from "./source-detail/source-detail";

let immutableRowData: any[];

const dependsOnCellRenderer = (props: any) => {
  const values = props.value.toString().split(",");
  return (
    <>
      {values.map((val: any, index: any) => {
        return (
          <Tooltip title={<DependsOnToolTip value={val} api={props.api} />}>
            <span>{val}</span>
            {values[index + 1] ? "," : ""}
          </Tooltip>
        );
      })}
    </>
  );
};

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalLog>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const [showSubmittalEdit, setShowSubmittalEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const gridStyle = useMemo(() => ({ height: "780px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalLog[]>();
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [customDateFilter, setCustomDateFilter] = useState<any>({});

  const onNewColumnAddition = (object: any) => {
    const columnDefsCopy = columnDefs;
    columnDefsCopy.splice(columnDefs.length - 1, 0, object);
    setColumnDefs(columnDefsCopy);
    message.success("New column added sucessfully");
    gridRef.current!.api.setColumnDefs(columnDefs);
  };

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      minWidth: 20,
      maxWidth: 125,
      filter: false,
      editable: false,
      cellRenderer: IdLinkComponent,
      cellRendererParams: {
        link: "/submittals/details"
      },
      cellClass(params) {
        return params.value === "" ? "idDefaultCellColor" : "idHoverColor";
      },
      cellStyle: {
        textAlign: "left",
        textDecoration: "underline",
        textDecorationStyle: "dashed"
      }
    },
    {
      field: "submittal",
      headerName: "SUBMITTAL",
      filter: false,
      minWidth: 350,
      maxWidth: 250,
      autoHeight: true,
      tooltipField: "submittal",
      cellRenderer: submittalCellRenderer,
      tooltipComponent: SubmittalTooltip,
      cellStyle: {
        overflow: "hidden",
        padding: 0
      },
      editable: false,
      onCellClicked: (event) => {
        event.node.setExpanded(!event.node.expanded);
      }
    },
    {
      field: "notification",
      headerName: "NOTIFICATION",
      minWidth: 10,
      maxWidth: 60,
      cellRendererFramework: notificationCellRenderer,
      headerComponentFramework: NotificationIcon,
      editable: false
    },
    {
      field: "comments",
      headerName: "COMMENTS",
      minWidth: 10,
      maxWidth: 60,
      headerComponentFramework: ChatIcon,
      editable: false
    },
    {
      field: "revision",
      headerName: "REVISION",
      minWidth: 10,
      maxWidth: 60,
      headerComponentFramework: DocAttachIcon,
      editable: false
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 50,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: DropDownData.StatusOptions
      },
      cellStyle: { color: "#000000FA" }
    },
    {
      field: "dueBy",
      headerName: "DUE BY",
      minWidth: 140,
      autoHeight: true,
      cellEditor: DateCellEditor,
      cellRenderer: dateCellRenderer,
      cellEditorPopup: true,
      filter: CustomDateFilters,
      filterParams: {
        columnData: { field: "dueBy", header: "DUE BY" },
        setCustomDateFilter
      }
    },
    {
      field: "governingDate",
      headerName: "GOVERNING DATE",
      minWidth: 180,
      autoHeight: true,
      cellEditor: DateCellEditor,
      cellRenderer: dateCellRenderer,
      cellEditorPopup: true,
      filter: CustomDateFilters,
      filterParams: {
        columnData: { field: "governingDate", header: "GOVERNING DATE" },
        setCustomDateFilter
      }
    },
    {
      field: "contractor",
      headerName: "CONTRACTOR",
      minWidth: 180,
      autoHeight: true,
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        cellRenderer: contractorEditCellRenderer,
        values: DropDownData.ContractorOptions,
        cellHeight: 20
      },
      cellRenderer: contractorCellRenderer,
      cellEditorPopup: true,
      keyCreator: (contractor) => {
        return contractor.value.name;
      }
    },
    {
      field: "dependsOn",
      headerName: "DEPENDS ON",
      minWidth: 160,
      cellRenderer: dependsOnCellRenderer,
      cellClass(params) {
        return params.value === ""
          ? "dependsOnDefaultCellColor"
          : "dependsOnHoverColor";
      },
      cellStyle: {
        textAlign: "left",
        textDecoration: "underline",
        textDecorationStyle: "dashed"
      }
    },
    {
      field: "assigned",
      headerName: "ASSIGNED",
      cellEditor: "agRichSelectCellEditor",
      minWidth: 100,
      autoHeight: true,
      cellEditorPopup: true,
      cellEditorParams: {
        cellRenderer: assignedEditCellRenderer,
        values: DropDownData.AssigneeOptions,
        cellHeight: 20
      },
      cellRenderer: assignedCellRenderer,
      keyCreator: (contractor) => {
        return contractor.value.assignedTo;
      }
    },
    {
      cellRendererFramework: Buttons.MoreOutlinedButton,
      editable: false,
      headerTooltip: "Add new column",
      headerComponentFramework: AddNewColumn,
      headerComponentParams: {
        onNewColumnAddition,
        gridRef
      },
      suppressColumnsToolPanel: true,
      headerClass: "ag-center-header",
      cellClass: "ag-center-cell",
      cellStyle: {
        textAlign: "center"
      },
      maxWidth: 70
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
      sortable: true,
      editable: true,
      filter: true,
      resizable: true
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
      gridRef.current!.api.refreshCells({ force: true });
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
        status: data.status !== undefined ? data.status : newData[index].status,
        contractor:
          data.contractor !== undefined
            ? data.contractor
            : newData[index].contractor,
        assigned:
          data.assigned !== undefined ? data.assigned : newData[index].assigned,
        dueBy:
          data.dueBy !== undefined
            ? moment(data.dueBy).format(DATE_FORMAT_MMDDYYY)
            : newData[index].dueBy
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
      revision: 0
    };
    newData.push(newItem);
    setRowData(newData);
    immutableRowData = newData;
    message.success("New submittals added successfully");
    setShowNewDrawer(false);
  };

  const onFiltersApplied = (event: any) => {
    const filtersApplied = event.api.getFilterModel();
    if (filtersApplied) {
      const items: FilterItem[] = new Array<FilterItem>();
      Object.keys(filtersApplied).forEach((key: any) => {
        if (filtersApplied[key].values.length > 0) {
          const field = columnDefs.filter((x) => x.field === key)[0];
          items.push({
            field: key,
            header: field ? field.headerName : key,
            value: filtersApplied[key].values.join()
          });
        }
      });
      if (Object.keys(customDateFilter).length > 0) {
        items.push(customDateFilter);
      }
      setFilters(items);
    }
  };

  return (
    <div>
      <SubmittalListFilterComponent
        gridRef={gridRef}
        onNewClick={onNewClick}
        items={filters}
        customDateFilter={customDateFilter}
        setCustomDateFilter={setCustomDateFilter}
        setItems={setFilters}
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
          onFilterChanged={onFiltersApplied}
          rowClass="table-row"
          masterDetail
          detailRowAutoHeight
          detailCellRenderer={SubmittalSourceDetailRenderer}
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

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Drawer, message, Space, Tooltip } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  CellEditRequestEvent,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  ICellEditorParams,
  RowNode
} from "ag-grid-community";
import "./submittal-list.css";
import moment from "moment";
import { Buttons } from "components/widgets";
import { useAppDispatch, useAppSelector } from "store";
import {
  getSubmittalList,
  setSubmittalList,
  updateSubmittal
} from "store/slices/submittalsSlices";
import SubmittalCreateComponent from "pages/submittal-create";
import SubmittalLogCreateComponent from "pages/submittal-log-create";
import { SubmittalLog } from "models/submittal-log";
import { isFulfilled } from "@reduxjs/toolkit";
import { useParams, withRouter } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import SubmittalEdit from "pages/submittal-edit/submittal-edit";
import StagingZone from "pages/staging-zone";
import { FilterItem } from "models/types";
import { DateCellEditor } from "components";
import { AddNewColumn } from "popups";
import { DateFilter } from "utils/dateutils";

import {
  IdLinkComponent,
  notificationCellRenderer,
  submittalCellRenderer,
  dateCellRenderer,
  companyCellRenderer,
  companyEditCellRenderer,
  assignedCellRenderer,
  assignedEditCellRenderer
} from "components/cell-renders";
import { RootState } from "store/slices";
import DropdownOption from "components/cell-editor/SubmittalStatusDropdownCtrl";
import { FolderOutlined } from "@ant-design/icons";
import { DropdownOptionCellEditor } from "components/cell-editor";
import { DATE_FORMAT_MMDDYYY } from "../../constants";
import {
  ChatIcon,
  DocAttachIcon,
  ExpandIcon,
  NotificationIcon
} from "../../components/svg-icons/index";
import SubmittalListFilterComponent from "./filter-bar";
import SubmittalListBottomBar from "./bottom-bar";
import DependsOnToolTip from "./depends-on-tooltip";
import SubmittalTooltip from "./submittal-tooltip";
import CustomDateFilters from "./custom-date-filter";
// import SubmittalSourceDetailRenderer from "./source-detail/source-detail";

const { Title } = Typography;

let immutableRowData: any[];

let filterType = "All";

const dependsOnCellRenderer = (props: any) => {
  return (
    props.value &&
    props.value.map((val: any, index: any) => {
      return (
        <Tooltip
          title={<DependsOnToolTip value={val.submittalId} api={props.api} />}
        >
          <span>{val.submittalId}</span>
          {props.value[index + 1] ? " , " : ""}
        </Tooltip>
      );
    })
  );
};

const isExternalFilterPresent = () => {
  return true;
};

const doesExternalFilterPass = (node: RowNode) => {
  if (filterType === "All") {
    return node.data.status !== "Submittal not required";
  }

  if (filterType === "Rejected") {
    return node.data.status === "Submittal not required";
  }

  return true;
};

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalLog>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const [showLogDrawer, setShowLogDrawer] = useState(false);
  const [showSubmittalEdit, setShowSubmittalEdit] = useState(false);
  const [showStagingZone, setShowStagingZone] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [height, setHeight] = useState(490);

  const [isDocumentView, setIsDocumentView] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const gridStyle = useMemo(
    () => ({
      height: showStagingZone ? `${780 - height}px` : "780px",
      width: "100%",
      transition: "all 0.3s"
    }),
    [showStagingZone, height]
  );

  // const [rowData, setRowData] = useState<SubmittalLog[]>();
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [customDateFilter, setCustomDateFilter] = useState<any>({});
  // const [submittalDetailsId] = useState("");
  const submittalState = useAppSelector((state: RootState) => state.submittals);

  const [showFiterChips, setShowFiterChips] = useState<boolean>(true);
  const onNewColumnAddition = (object: any) => {
    const columnDefsCopy = columnDefs;
    columnDefsCopy.splice(columnDefs.length - 1, 0, object);
    setColumnDefs(columnDefsCopy);
    message.success("New column added sucessfully");
    gridRef.current!.api.setColumnDefs(columnDefs);
  };

  const viewDocument = (value: boolean) => {
    if (value) {
      const viewDocHeight = document.body.offsetHeight - 46;
      setHeight(viewDocHeight);
    } else {
      setHeight(490);
    }
    setIsDocumentView(value);
  };

  const companyEditorParams = (params: ICellEditorParams) => {
    const { company } = params.data;
    const assignee = submittalState.companies
      .map((item) => {
        return item.name === company.name && item.assignees;
      })
      .filter(Boolean);
    return {
      cellRenderer: assignedEditCellRenderer,
      values: assignee[0]
    };
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
      menuTabs: [],
      editable: false,
      cellRenderer: IdLinkComponent,
      cellRendererParams: {
        link: "/submittals/details",
        projectId
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
      menuTabs: [],
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
      cellEditorParams: DropdownOption,
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
        title: "Due By",
        columnData: {
          field: "dueBy",
          header: "DUE BY"
        },
        setCustomDateFilter
      },
      comparator: DateFilter.comparator
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
        title: "Governing Date",
        columnData: {
          field: "governingDate",
          header: "GOVERNING DATE"
        },
        setCustomDateFilter
      },
      comparator: DateFilter.comparator
    },
    {
      field: "company",
      headerName: "COMPANY",
      minWidth: 180,
      autoHeight: true,
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        cellRenderer: companyEditCellRenderer,
        values: submittalState.companies,
        cellHeight: 20
      },
      cellRenderer: companyCellRenderer,
      cellEditorPopup: true,
      keyCreator: (company) => {
        return company.value.name;
      }
    },
    {
      field: "dependsOn",
      headerName: "DEPENDS ON",
      minWidth: 160,
      cellRenderer: dependsOnCellRenderer,
      editable: false,
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
      flex: 1,
      autoHeight: true,
      cellEditorPopup: true,
      cellEditor: DropdownOptionCellEditor,
      cellEditorParams: companyEditorParams,
      tooltipField: "assigned",
      cellRenderer: assignedCellRenderer,

      keyCreator: (company) => {
        return company.value.assignedTo;
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

  useEffect(() => {
    const temp = [...columnDefs];
    const itemIndexCompany = columnDefs.findIndex((o) => o.field === "company");
    if (itemIndexCompany > -1) {
      temp[itemIndexCompany] = {
        field: "company",
        headerName: "COMPANY",
        minWidth: 180,
        autoHeight: true,
        cellEditor: "agRichSelectCellEditor",
        cellEditorParams: {
          cellRenderer: companyEditCellRenderer,
          values: submittalState.companies,
          cellHeight: 20
        },
        cellRenderer: companyCellRenderer,
        cellEditorPopup: true,
        keyCreator: (company) => {
          return company.value.name;
        }
      };
    }
    const itemIndexassigned = columnDefs.findIndex(
      (o) => o.field === "assigned"
    );
    if (itemIndexassigned > -1) {
      temp[itemIndexassigned] = {
        field: "assigned",
        headerName: "ASSIGNED",
        cellEditor: DropdownOptionCellEditor,
        minWidth: 100,
        autoHeight: true,
        cellEditorPopup: true,
        cellEditorParams: companyEditorParams,
        cellRenderer: assignedCellRenderer,
        keyCreator: (company) => {
          return company.value.assignedTo;
        }
      };
    }
    setColumnDefs(temp);
  }, [submittalState.companies]);

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
      resizable: true,
      menuTabs: ["filterMenuTab"],
      getQuickFilterText(params: any) {
        if (params.colDef.field === "assigned") {
          return params.value.assignedTo;
        }
        if (params.colDef.field === "company") {
          return params.value.name;
        }
        return params.value;
      }
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

  const loadSubmittals = async () => {
    const actionResult = await dispatch(getSubmittalList(projectId));
    if (isFulfilled(actionResult)) {
      const { payload } = actionResult;
      if (payload.success) {
        immutableRowData = payload.response;
      }
    }
    gridRef.current!.api.onFilterChanged();
  };

  React.useEffect(() => {
    filterType = "All";
    if (submittalState.list.length === 0) {
      loadSubmittals();
    } else {
      immutableRowData = submittalState.list;
    }
  }, []);

  React.useEffect(() => {
    dispatch(setProjectId(projectId));
  }, [dispatch, projectId]);

  const onSelectionChanged = (grid: any) => {
    setSelectedRows(grid.api.getSelectedRows().length);
    setSelectedRowsData(grid.api.getSelectedRows());
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

  const onStagingZoneClick = () => {
    setShowStagingZone(true);
  };

  const onStagingZoneClose = () => {
    setShowStagingZone(false);
    setHeight(490);
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

      if (field === "company") {
        newItem.assigned = {
          ...newItem.company.assignees.filter(
            (item: any) => item.default === true
          )[0]
        };
      }

      immutableRowData = immutableRowData.map((oldItem) => {
        return oldItem.id === newItem.id ? newItem : oldItem;
      });
      immutableRowData = immutableRowData.map((oldItem) =>
        oldItem.id === newItem.id ? newItem : oldItem
      );
      dispatch(setSubmittalList(immutableRowData));
      gridRef.current!.api.onFilterChanged();
    },
    [immutableRowData]
  );

  const onEditLogs = (data: any) => {
    const newData: any = [...immutableRowData];
    gridRef.current!.api.getSelectedRows().forEach(async (row: any) => {
      const { id } = row;
      const index = newData.findIndex((x: any) => x.id === id);
      const newItem = {
        ...newData[index],
        status: data.status !== undefined ? data.status : newData[index].status,
        company:
          data.company !== undefined ? data.company : newData[index].company,
        assigned:
          data.assigned !== "" ? data.assigned : newData[index].assigned,
        dueBy:
          data.dueBy !== undefined
            ? moment(data.dueBy).format(DATE_FORMAT_MMDDYYY)
            : newData[index].dueBy
      };
      await dispatch(updateSubmittal(newItem));
      newData[index] = newItem;
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
      notification: "",
      comments: "",
      revision: ""
    };
    newData.push(newItem);
    dispatch(setSubmittalList(newData));
    immutableRowData = newData;
    message.success("New submittals added successfully");
    setShowNewDrawer(false);
  };

  const onFiltersApplied = (event: any) => {
    const filtersApplied = event.api.getFilterModel();
    if (filtersApplied) {
      const items: FilterItem[] = new Array<FilterItem>();
      Object.keys(filtersApplied).forEach((key: any) => {
        if (
          filtersApplied[key]?.values &&
          filtersApplied[key].values.length > 0
        ) {
          const field = columnDefs.filter((x) => x.field === key)[0];
          const { values } = filtersApplied[key];
          if (field?.cellEditorParams?.type === "currency") {
            values.forEach((value: any, index: number) => {
              values[index] = parseFloat(value).toFixed(2);
            });
          }
          items.push({
            field: key,
            header: field ? field.headerName : key,
            value: values.filter(Boolean).join(", ")
          });
        }
      });
      setFilters(items.filter(Boolean));
    }
  };

  const onMouseDown = () => {
    setIsResizing(true);
  };

  const onMouseUp = () => {
    setIsResizing(false);
  };

  const onMouseMove = (e: { clientY: number }) => {
    if (isResizing) {
      const offsetBottom =
        document.body.offsetHeight - (e.clientY - document.body.offsetTop);
      const minHeight = 50;
      const maxHeight = document.body.offsetHeight;
      if (offsetBottom > minHeight && offsetBottom < maxHeight) {
        setHeight(offsetBottom);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  const onCreateLogDrawerClose = () => {
    setShowLogDrawer(false);
  };

  const onCreateLogClick = () => {
    setShowLogDrawer(true);
  };

  const onCreateLog = (data: any) => {
    const newData = [...immutableRowData];
    const newItem = {
      ...data,
      notification: "",
      comments: "",
      revision: ""
    };
    newData.push(newItem);
    dispatch(setSubmittalList(newData));
    immutableRowData = newData;
    message.success("submittal log added successfully");
    setShowLogDrawer(false);
  };

  const onRejectButtonClick = () => {
    if (showFiterChips) {
      filterType = "Rejected";
    } else {
      filterType = "All";
    }

    setShowFiterChips(!showFiterChips);

    gridRef.current!.api.onFilterChanged();
  };
  return (
    <div className="a">
      <SubmittalListFilterComponent
        gridRef={gridRef}
        items={filters}
        customDateFilter={customDateFilter}
        setCustomDateFilter={setCustomDateFilter}
        setItems={setFilters}
        onCreateLogClick={onCreateLogClick}
        showFiterChips={showFiterChips}
        onRejectButtonClick={onRejectButtonClick}
      />
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact<SubmittalLog>
          ref={gridRef}
          rowData={submittalState.list}
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
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
        />
      </div>
      <SubmittalListBottomBar
        onSubmittalEditClick={onSubmittalEditClick}
        onStagingZoneClick={onStagingZoneClick}
        showStagingZone={showStagingZone}
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
        title="Create Submittal Log"
        placement="right"
        onClose={onCreateLogDrawerClose}
        visible={showLogDrawer}
      >
        {showLogDrawer && (
          <SubmittalLogCreateComponent
            onCancelClick={onCreateLogDrawerClose}
            onCreateClick={onCreateLog}
            gridRef={gridRef}
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
            selectedRows={selectedRowsData}
          />
        )}
      </Drawer>
      <Drawer
        title={
          <Space>
            <Title level={5}>Staging Zone</Title>
            <Title level={5} className="private-org">
              Private within org
            </Title>
            <Title level={5}>
              Use this space to discuss within your team mates, share documents.
              All content are private within your org.
            </Title>
            {!isDocumentView && (
              <Title level={5} onClick={onStagingZoneClose}>
                <ExpandIcon className="expand-icon-right" />
              </Title>
            )}
            {isDocumentView && (
              <Title level={5} className="expand-icon-right-with-text">
                <FolderOutlined /> Browse previous projects
              </Title>
            )}
          </Space>
        }
        placement="bottom"
        className="stagingZoneDrawer"
        onClose={onStagingZoneClose}
        visible={showStagingZone}
        mask={false}
        headerStyle={{ borderBottom: "none" }}
        height={height}
      >
        {showStagingZone && (
          <StagingZone
            setSubmittalDetailsId={() => null}
            submittalDetailsId=""
            onMouseDown={onMouseDown}
            selectedData={selectedRowsData}
            documentView={viewDocument}
            isDocumentView={isDocumentView}
            handleDocuments={() => null}
            updatedData={{}}
          />
        )}
      </Drawer>
    </div>
  );
}

export default withRouter(SubmittalList);

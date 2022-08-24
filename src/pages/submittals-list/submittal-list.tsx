/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Drawer } from "antd";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./submittal-list.css";
import { Buttons } from "components/widgets";
import { useAppDispatch } from "store";
import { getSubmittalList } from "store/slices/submittalsSlices";
import SubmittalCreateComponent from "pages/submittal-create/submittal-create";
import { SubmittalLog } from "models/submittal-log";
import { isFulfilled } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { setProjectId } from "store/slices/homeSlice";
import { DropDownData } from "../../constants";
import SubmittalListFilterComponent from "./filter-bar";
import SubmittalListBottomBar from "./bottom-bar";
import ApprovedIcon from "../../components/svg-icons/approved-icon";
import InreviewIcon from "../../components/svg-icons/in-review";
import RejectedIcon from "../../components/svg-icons/rejected-icon";
import ApprovedCommentsIcon from "../../components/svg-icons/approved-comments";
import Notification1SvgIcon from "../../components/svg-icons/notification1";
import Notification2SvgIcon from "../../components/svg-icons/notification2";
import ChatIcon from "../../components/svg-icons/chat.tsx";
import DocAttachIcon from "../../components/svg-icons/doc-attach";
import NotificationIcon from "../../components/svg-icons/notifications-icon";

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
    return <Notification1SvgIcon />;
  }
  return <Notification2SvgIcon />;
};

function SubmittalList() {
  const gridRef = useRef<AgGridReact<SubmittalLog>>(null);
  const [showNewDrawer, setShowNewDrawer] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [rowData, setRowData] = useState<SubmittalLog[]>();
  const dispatch = useAppDispatch();
  const { projectId } = useParams() as any;

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    { field: "submittal", headerName: "SUBMITTAL" },
    {
      field: "notification",
      headerName: "",
      cellRendererFramework: notificationCellRenderer,
      headerComponentFramework: NotificationIcon
    },
    {
      field: "comments",
      headerName: "",
      headerComponentFramework: ChatIcon
    },
    {
      field: "revision",
      headerName: "",
      headerComponentFramework: DocAttachIcon
    },
    {
      field: "status",
      headerName: "STATUS",
      cellRendererFramework: statusCellRenderer,
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
        values: DropDownData.AssigneeOptions
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

  const loadList = async () => {
    const actionResult = await dispatch(getSubmittalList(projectId));
    if (isFulfilled(actionResult)) {
      const { payload } = actionResult;
      if (payload.success) {
        setRowData(payload.response);
      }
    }
  };

  React.useEffect(() => {
    // todo - here we will fetch the actual project id from route params and we will load details
    loadList();
  }, []);

  React.useEffect(() => {
    dispatch(setProjectId(projectId));
  }, [dispatch, projectId]);

  const onNewClick = () => {
    setShowNewDrawer(true);
  };

  const onApplyClick = () => {
    setShowNewDrawer(true);
  };

  const onSelectionChanged = (grid: any) => {
    setSelectedRows(grid.api.getSelectedRows().length);
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
          masterDetail
          animateRows={false}
          onSelectionChanged={onSelectionChanged}
          onFirstDataRendered={onFirstDataRendered}
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
    </div>
  );
}

export default SubmittalList;

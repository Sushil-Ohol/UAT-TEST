import { SearchOutlined } from "@ant-design/icons";
import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";
import { Input, List } from "antd";
import { DateRangePickerModal } from "components";
import moment from "moment";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./due-date-filters.css";

export default forwardRef((props: IFilterParams, ref: any) => {
  const { api } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [selectedVal, setSelectedVal] = useState<string>("");
  const dueDateFilters = [
    "Past due date",
    "Due today",
    "Next 3 days",
    "Custom"
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customDateRange, setCustomDateRange] = useState<any>({});

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      isFilterActive() {
        return selectedVal;
      },
      doesFilterPass(params: IDoesFilterPassParams) {
        const { colDef, column, columnApi, context, valueGetter } = props;
        const { node } = params;

        const value = valueGetter({
          api,
          colDef,
          column,
          columnApi,
          context,
          data: node.data,
          getValue: (field) => node.data[field],
          node
        })
          .toString()
          .toLowerCase();

        const tempDate = value.split("-");
        const currentDate = moment(
          `${tempDate[1]}/${tempDate[0]}/${tempDate[2]}`
        ).format("MM/DD/YYYY");

        switch (selectedVal) {
          case "Past due date": {
            const selectedDate = moment()
              .subtract(1, "days")
              .format("MM/DD/YYYY");
            return selectedDate > currentDate && value;
          }
          case "Due today": {
            const selectedDate = moment().format("MM/DD/YYYY");
            return currentDate === selectedDate && value;
          }
          case "Next 3 days": {
            const nextDate = moment().add(3, "days").format("MM/DD/YYYY");
            const today = moment().format("MM/DD/YYYY");
            return currentDate <= nextDate && currentDate > today && value;
          }
          case "Custom":
            setIsOpen(true);
            return true;
          case "FilterCustom": {
            const { from, to } = customDateRange;
            return currentDate >= from && currentDate <= to;
          }
          default:
            return false;
        }
      }
    };
  });

  useEffect(() => {
    api.setQuickFilter(searchText);
  }, [searchText, api]);

  useEffect(() => {
    props.filterChangedCallback();
  }, [selectedVal, props]);

  const onCustomDateFilterChanged = () => {
    if (customDateRange) {
      const from = moment(customDateRange.startDate).format("MM/DD/YYYY");
      const to = moment(customDateRange.endDate).format("MM/DD/YYYY");
      setCustomDateRange({ from, to });
      setSelectedVal("FilterCustom");
    }
  };

  return (
    <>
      <div className="due-date-filters">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          allowClear
          style={{ background: "#0000000D" }}
          bordered={false}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <List
          className="filter-list"
          dataSource={dueDateFilters}
          renderItem={(item) => (
            <List.Item onClick={() => setSelectedVal(item)}>{item}</List.Item>
          )}
        />
      </div>
      <DateRangePickerModal
        title="Due By"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCustomDateRange={setCustomDateRange}
        onOkClick={onCustomDateFilterChanged}
      />
    </>
  );
});

import { useCallback } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../submittal-list.css";
import { FilterChips } from "components";
import { FilterItem } from "models/types";

export type FilterProps = {
  gridRef: any;
  onNewClick: any;
  items: FilterItem[];
  setItems: any;
  customDateFilter: any;
  setCustomDateFilter: any;
  onCreateLogClick: any;
  onRejectButtonClick: any;
  showFiterChips: boolean;
};

function SubmittalListFilterComponent(props: FilterProps) {
  const {
    gridRef,
    onNewClick,
    items,
    setItems,
    customDateFilter,
    setCustomDateFilter,
    onCreateLogClick,
    onRejectButtonClick,
    showFiterChips
  } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  const onFilterChipDelete = (item: FilterItem) => {
    if (item.field === customDateFilter.field) {
      const index = items.findIndex(
        (val) => val.field === customDateFilter.field
      );
      if (index > -1) {
        delete items[index];
      }
      setItems([...items].filter(Boolean));
      setCustomDateFilter({});
      gridRef.current.api.destroyFilter(customDateFilter.field);
    } else {
      gridRef.current.api.destroyFilter(item.field);
    }
  };

  return (
    <div className="filterRow" style={{ display: "flex" }}>
      <Space>
        <section>
          <div className="searchInput">
            <Input
              type="text"
              id="filter-text-box"
              placeholder="Search"
              prefix={<SearchOutlined />}
              onInput={onFilterTextBoxChanged}
            />
          </div>
        </section>
        {showFiterChips && (
          <div>
            <FilterChips items={items} onChipDelete={onFilterChipDelete} />
          </div>
        )}
      </Space>

      <div id="outer" className="EditSubmittalbtn">
        <span>
          <div>
            <div className="inner">
              <Button
                onClick={onRejectButtonClick}
                size="middle"
                className="newSubmittalBtn"
              >
                {showFiterChips ? "Not Required Submittals" : "All Submittals"}
              </Button>
            </div>
            <div className="inner">
              <Button
                onClick={onCreateLogClick}
                size="middle"
                className="newSubmittalBtn"
              >
                + Submittal Log
              </Button>
            </div>
            <div className="inner">
              <Button
                onClick={onNewClick}
                size="middle"
                className="newSubmittalBtn"
              >
                + New Submittal
              </Button>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

export default SubmittalListFilterComponent;

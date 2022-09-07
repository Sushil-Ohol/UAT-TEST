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
  setDueDateFilter: any;
};

function SubmittalListFilterComponent(props: FilterProps) {
  const { gridRef, onNewClick, items, setItems, setDueDateFilter } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  const onFilterChipDelete = (item: FilterItem) => {
    if (item.field === "dueBy") {
      const index = items.findIndex((val) => val.field === "dueBy");
      if (index > -1) {
        delete items[index];
      }
      setItems([...items].filter(Boolean));
      setDueDateFilter("");
      gridRef.current.api.destroyFilter("dueBy");
    } else {
      const filterModel = gridRef.current!.api.getFilterModel();
      delete filterModel[item.field];
      gridRef.current!.api.setFilterModel(filterModel);
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
        <div>
          <FilterChips items={items} onChipDelete={onFilterChipDelete} />
        </div>
      </Space>

      <div id="outer" className="EditSubmittalbtn">
        <span>
          <div>
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

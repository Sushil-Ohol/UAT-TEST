import { useCallback } from "react";
import { Input, Button, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../submittal-list.css";
import { FilterChips } from "components";
import { FilterItem } from "models/types";

export type FilterProps = {
  gridRef: any;
  onNewClick: any;
  items: FilterItem[];
};

function SubmittalListFilterComponent(props: FilterProps) {
  const { gridRef, onNewClick, items } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  const onFilterChipDelete = (item: FilterItem) => {
    message.info(`Deleted ${item.field} filter`);
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
      </Space>
      <div>
        <FilterChips items={items} onChipDelete={onFilterChipDelete} />
      </div>
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

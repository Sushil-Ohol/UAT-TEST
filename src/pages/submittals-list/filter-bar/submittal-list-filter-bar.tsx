import { useCallback } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../submittal-list.css";

export type FilterProps = {
  gridRef: any;
  onNewClick: any;
  onSubmittalEditClick: any;
};

function SubmittalListFilterComponent(props: FilterProps) {
  const { gridRef, onNewClick, onSubmittalEditClick } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

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

      <div id="outer" className="EditSubmittalbtn">
        <span>
          <div>
            <div className="inner">
              <Button
                onClick={onSubmittalEditClick}
                size="middle"
                className="editBtn"
              >
                Edit
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

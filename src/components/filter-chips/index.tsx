import { Button } from "antd";
import { FilterItem } from "models/types";
import "./filter-chip.css";

type FilterChipProps = {
  items: FilterItem[];
  onChipDelete: any;
};

function FilterChips(props: FilterChipProps) {
  const { items, onChipDelete } = props;
  const handleDelete = (item: any) => {
    onChipDelete(item);
  };

  return (
    <div className="filter">
      {items.map((item: any) => (
        <div className="tag-item" key={item.field}>
          {item.header}:{item.value.split(",")[0]}
          <div className="tooltip">
            {item.value.split(",").length - 1 > 0 && (
              <Button className="button" id="numbers-filters">
                +
                {item.value.split(",") === ""
                  ? item.value.split(",").length - 2
                  : item.value.split(",").length - 1}
              </Button>
            )}

            <span className="tooltip-text">{`${item.value
              .split(",")
              .slice(1)}`}</span>
          </div>
          <Button
            className="button"
            onClick={() => {
              handleDelete(item);
              items.pop();
            }}
          >
            x
          </Button>
        </div>
      ))}
    </div>
  );
}

export default FilterChips;

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
    <div>
      {items.map((item: any) => (
        <div className="tag-item" key={item}>
          {item.field}
          <Button className="button" onClick={() => handleDelete(item)}>
            x
          </Button>
        </div>
      ))}
    </div>
  );
}

export default FilterChips;

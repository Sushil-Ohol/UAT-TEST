import { Select } from "antd";
import { SelectOption } from "components";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";

const DropdownOptionCellEditor = forwardRef((props: any, ref) => {
  const { Option } = Select;
  const [value, setValue] = useState(props.value ? props.value.assigned : "");
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.values);
  }, [props]);
  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value !== undefined
          ? data?.filter((item: any) => item.assignedTo === value)[0]
          : props.value;
      }
    };
  });
  return (
    <Select
      value={value}
      style={{ width: "240px" }}
      onChange={(event: any) => setValue(event)}
      showSearch
      filterOption
      virtual={false}
    >
      {data?.map((item: any) => (
        <Option key={item.assignedTo} value={item.assigned}>
          <SelectOption item={item} />
        </Option>
      ))}
    </Select>
  );
});

export default DropdownOptionCellEditor;

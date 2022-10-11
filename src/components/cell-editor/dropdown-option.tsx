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
        return data.filter((item: any) => item.assignedTo === value)[0];
      }
    };
  });
  return (
    <Select
      value={value}
      style={{ width: "200px" }}
      onChange={(event: any) => setValue(event)}
      //   title="STATUS"
      //   value={updatedData ? updatedData.status : undefined}
      //   onChange={(data) =>
      // setUpdatedData((prev: SubmittalLog) => {
      //   return prev ? { ...prev, status: data } : prev;
      // })
      //   }
      showSearch
      filterOption
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

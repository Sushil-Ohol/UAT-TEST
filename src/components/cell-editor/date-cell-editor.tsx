import { DatePicker } from "antd";
import moment from "moment";
import { forwardRef, useState, useImperativeHandle } from "react";

const dateCellEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return moment(value).format("MM/DD/YYYY");
      }
    };
  });

  return (
    <DatePicker
      value={value}
      onChange={(date: any) => {
        setValue(date);
      }}
      style={{ width: "100%" }}
    />
  );
});

export default dateCellEditor;

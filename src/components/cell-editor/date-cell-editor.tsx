import { DatePicker } from "antd";
import moment from "moment";
import { forwardRef, useState, useImperativeHandle } from "react";

const dateCellEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(
    moment(props.value || moment().format("MM-DD-YYYY"), "MM-DD-YYYY")
  );

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return moment(value).format("MM-DD-YYYY");
      }
    };
  });

  return (
    <DatePicker
      format="MM-DD-YYYY"
      value={value}
      onChange={(date: any) => {
        setValue(date);
      }}
      style={{ width: "100%" }}
    />
  );
});

export default dateCellEditor;

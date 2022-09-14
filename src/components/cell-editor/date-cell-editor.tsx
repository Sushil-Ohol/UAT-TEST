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
        setValue(date || moment(moment().format("MM-DD-YYYY"), "MM-DD-YYYY"));
      }}
      style={{ width: "150%" }}
    />
  );
});

export default dateCellEditor;

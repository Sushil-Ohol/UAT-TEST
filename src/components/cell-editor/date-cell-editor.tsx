import { DatePicker } from "antd";
import moment from "moment";
import { forwardRef, useState, useImperativeHandle } from "react";

const dateCellEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(
    moment(props.value || moment().format("DD-MM-YYYY"), "DD-MM-YYYY")
  );

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return moment(value).format("DD-MM-YYYY");
      }
    };
  });

  return (
    <DatePicker
      format="DD-MM-YYYY"
      value={value}
      onChange={(date: any) => {
        setValue(date || moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY"));
      }}
      style={{ width: "100%" }}
    />
  );
});

export default dateCellEditor;

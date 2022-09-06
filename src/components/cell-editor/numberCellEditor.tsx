import { forwardRef, useState, useImperativeHandle } from "react";

const numberCellEditor = forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      }
    };
  });

  return (
    <input
      type="number"
      value={value}
      onChange={(event: any) => setValue(event.target.value)}
      style={{ width: "100%" }}
      min="0"
    />
  );
});

export default numberCellEditor;

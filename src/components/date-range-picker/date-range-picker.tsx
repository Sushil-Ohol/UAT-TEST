import { Modal } from "antd";
import "./date-range-picker.css";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function DateRangePickerModal(props: any) {
  const { title, isOpen, setIsOpen, setCustomDateRange, onOkClick } = props;

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date()
    }
  ]);

  const handleChange = (item: any) => {
    setState([item.range1]);
    setCustomDateRange(item.range1);
  };

  return (
    <div>
      <Modal
        title={title}
        visible={isOpen}
        className="custom-date-picker"
        okText="Apply"
        onOk={() => {
          onOkClick();
          setIsOpen(false);
        }}
        onCancel={() => {
          setCustomDateRange();
          setIsOpen(false);
        }}
      >
        <DateRangePicker
          onChange={(item: any) => handleChange(item)}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          showDateDisplay={false}
        />
      </Modal>
    </div>
  );
}

export default DateRangePickerModal;

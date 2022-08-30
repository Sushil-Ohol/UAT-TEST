import { Modal, DatePicker } from "antd";
import "./date-range-picker.css";

const { RangePicker } = DatePicker;

function DateRangePickerModal(props: any) {
  const { title, isOpen, setIsOpen, setCustomDateRange, onOkClick } = props;

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
        <RangePicker
          format="DD-MM-YYYY"
          onChange={(value) => setCustomDateRange(value)}
        />
        <div className="customRangePicker" />
      </Modal>
    </div>
  );
}

export default DateRangePickerModal;

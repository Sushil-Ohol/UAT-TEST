import { Modal, DatePicker, Button } from "antd";
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
        footer={[
          <Button
            key="back"
            onClick={() => {
              setCustomDateRange();
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              onOkClick();
              setIsOpen(false);
            }}
          >
            Apply
          </Button>
        ]}
      >
        <RangePicker
          autoFocus
          open
          className="customRangePicker1"
          format="DD-MM-YYYY"
          onChange={(value) => setCustomDateRange(value)}
          defaultOpen
          getPopupContainer={(trigger) => {
            return trigger;
          }}
        />
      </Modal>
    </div>
  );
}

export default DateRangePickerModal;

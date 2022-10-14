import { DatePicker } from "antd";
import moment from "moment";
import "./submittal-details.css";

type Props = {
  title: string;
  value: string | undefined;
  onChange: (data: moment.Moment | null) => void;
  hasCurrentAccess: boolean;
};
function DateField(props: Props) {
  const { title, value, onChange, hasCurrentAccess } = props;
  return (
    <>
      <div>
        <p className="heading" style={{ float: "left" }}>
          {title}
        </p>
        <p className="validationColor" style={{ float: "right" }}>
          {value ? moment(value).fromNow() : undefined}
        </p>
      </div>

      <DatePicker
        className="selectStyle"
        style={{
          width: "100%",
          backgroundColor: "#0000000D",
          height: "32px",
          font: "normal normal normal 1.56vh/1.95vh Inter"
        }}
        format="MM-DD-YYYY"
        value={value ? moment(value, "MM-DD-YYYY") : undefined}
        onChange={onChange}
        disabled={hasCurrentAccess}
      />
    </>
  );
}

export default DateField;

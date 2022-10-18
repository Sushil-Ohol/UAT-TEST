// import { DropDownData } from "constants/index.js";
import { BulbOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { SelectOption } from "components";
import { colorCode } from "constants/index";
import moment from "moment";
import { Link } from "react-router-dom";

export function IdLinkComponent(props: any) {
  const { value, link, data, projectId } = props;
  return (
    <Link
      to={{
        pathname: link,
        state: { data, projectId }
      }}
    >
      {value}
    </Link>
  );
}

export const notificationCellRenderer = () => {
  return "";
};

export const insightNotification = (
  props: any,
  showLink = false,
  linkPathname = ""
) => {
  const { data, projectId } = props;
  const { insights } = data;
  const tooltipTitle = insights.map((insight: any) => {
    return (
      <div className="insight">
        <BulbOutlined style={{ color: colorCode.orange }} />
        <span className="insight-summary">{insight.summary}</span>
      </div>
    );
  });

  const tooltipLink = (
    <Link
      to={{
        pathname: linkPathname,
        state: { data, projectId }
      }}
      className="insights-details-link"
    >
      Find out more about these insights
    </Link>
  );

  return (
    <div className="insights">
      <Tooltip
        title={
          <div>
            {tooltipTitle}
            {showLink && tooltipLink}
          </div>
        }
      >
        <BulbOutlined style={{ color: colorCode.orange }} />
      </Tooltip>
    </div>
  );
};

export const submittalCellRenderer = (props: any) => {
  const { insights } = props.data;
  const hasInsight = insights != null && insights.length > 0;
  return (
    <>
      <p className="colFirstValue">{props.data.submittal}</p>
      <p className="colSecondValue">{props.data.description}</p>
      {hasInsight && insightNotification(props, true, "/submittals/details")}
    </>
  );
};

export const materialCellRenderer = (props: any) => {
  const { insights } = props.data;
  const hasInsight = insights != null && insights.length > 0;
  return (
    <>
      <p className="colFirstValue">{props.data.material}</p>
      {hasInsight && insightNotification(props)}
    </>
  );
};

export const dateCellRenderer = (props: any) => {
  const dates = props.value && props.value.split("-");
  const newDate =
    dates &&
    moment()
      .year(dates[2])
      .month(dates[0] - 1)
      .date(dates[1]);
  return (
    <>
      <p className="colFirstValue">{props.value}</p>
      <p className="colSecondValue">
        {newDate ? moment(newDate).fromNow() : ""}
      </p>
    </>
  );
};

export const companyCellRenderer = (props: any) => {
  return <p className="colFirstValue">{props.value.name}</p>;
};

export const companyEditCellRenderer = (params: any) => {
  return params?.value?.name || "";
};

export const assignedCellRenderer = (props: any) => {
  return (
    <Tooltip
      title={props.value ? <SelectOption item={props.value} /> : ""}
      placement="leftBottom"
    >
      <p
        className={
          props.value?.status !== ""
            ? "colFirstValue text-red-font"
            : "colFirstValue"
        }
      >
        {props.value && props.value.assignedTo}
      </p>
      <p className="colSecondValue">{props.value && props.value.destination}</p>
    </Tooltip>
  );
};

export const assignedEditCellRenderer = (params: any) => {
  return params?.value?.assignedTo || "";
};

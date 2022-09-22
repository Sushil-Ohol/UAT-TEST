// import { DropDownData } from "constants/index.js";
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

export const submittalCellRenderer = (props: any) => {
  return (
    <>
      <p className="colFirstValue">{props.data.submittal}</p>
      <p className="colSecondValue">{props.data.description}</p>
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

export const contractorCellRenderer = (props: any) => {
  return (
    <>
      <p className="colFirstValue">{props.value.name}</p>
      <p className="colSecondValue">{props.value.email}</p>
    </>
  );
};

export const contractorEditCellRenderer = (params: any) => {
  return params?.value?.name || "";
};

export const assignedCellRenderer = (props: any) => {
  return (
    <>
      <p className="colFirstValue">{props.value.name}</p>
      <p className="colSecondValue">{props.value.role}</p>
    </>
  );
};

export const assignedEditCellRenderer = (params: any) => {
  return params?.value?.name || "";
};

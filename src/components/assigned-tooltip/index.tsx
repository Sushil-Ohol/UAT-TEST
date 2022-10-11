import { ITooltipParams } from "ag-grid-community";
import { SelectOption } from "components/assignee-dropdown";

function AssignedTooltip(props: ITooltipParams) {
  const { rowIndex, api } = props;
  const data = api.getDisplayedRowAtIndex(rowIndex!)?.data || {};
  return <SelectOption item={data} />;
}

export default AssignedTooltip;

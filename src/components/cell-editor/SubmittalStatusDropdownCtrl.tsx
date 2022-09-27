import { ICellEditorParams } from "ag-grid-community";
import { DropDownData } from "constants/index";

const SubmittalStatusDropdownCtrl = (params: ICellEditorParams) => {
  if (
    params.data.assigned !== "" &&
    (params.data.status === "Submittal not required" ||
      params.data.status === "")
  ) {
    return {
      values: DropDownData.StatusOptionsForArchitects
    };
  }
  if (
    params.data.status !== "" &&
    params.data.status === "Submittal required"
  ) {
    return {
      values: [...DropDownData.StatusOptions, "For approval"]
    };
  }

  return {
    values: [...DropDownData.StatusOptions]
  };
};

export default SubmittalStatusDropdownCtrl;

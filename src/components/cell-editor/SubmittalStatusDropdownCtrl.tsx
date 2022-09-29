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

  return {
    values: [...DropDownData.StatusOptions]
  };
};

export default SubmittalStatusDropdownCtrl;

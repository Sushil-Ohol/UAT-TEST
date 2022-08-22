export const FILESIZE = 100857000;
const V1_URL = "http://localhost:5000/api/v1";
export const colorCode = {
  white: "white",
  error: "#ff3e3e",
  success: "#007d3e",
  grey: "#dedede",
  process: "#d0cec9",
  lightGrey: "#dedede"
};
const ContractorOptions = [
  "ABC Construction",
  "A Construction",
  "B Construction",
  "C Construction"
];
const DependsOnOptions = ["1079", "2098"];
const PastDueOptions = ["Past due date", "Due today", "Next 3 days", "Custom"];
const ProcureByOptions = ["Before", "After"];
const ProcureBySecondValues = ["This Week", "This Month"];
const StatusOptions = [
  "Approved",
  "In Review",
  "Rejected",
  "Approved with Comments"
];
const AssigneeOptions = ["Luke", "James"];
const PackageOptions = ["920:Electrical", "Piping"];

export const DropDownData = {
  ContractorOptions,
  StatusOptions,
  AssigneeOptions,
  DependsOnOptions,
  PastDueOptions,
  PackageOptions,
  ProcureByOptions,
  ProcureBySecondValues
};

export const APIs = {
  V1_URL
};

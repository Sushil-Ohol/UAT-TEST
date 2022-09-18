export const FILESIZE = 100857000;
const V1_URL = "http://localhost:5000/api/v1";
export const colorCode = {
  white: "white",
  error: "#FF3535",
  success: "#65D154",
  grey: "#b1b1b1",
  process: "#00000033",
  lightGrey: "#dedede",
  fileName: "#CCCCCC",
  orange: "#FFA41B"
};
export const steps = [
  {
    title: "Details",
    content: "Details"
  },
  {
    title: "Finish",
    content: "Finish"
  }
];
export const hexagoanStyleScreen1 = {
  textSize: "12px",
  className: "icon-style1",
  hexagoanSize: 100,
  errorStyleClass: "icon-style-wrong-screen-first"
};
export const hexagoanStyleScreen2 = {
  textSize: "8px",
  className: "icon-style2",
  hexagoanSize: 60,
  errorStyleClass: "icon-style-wrong-screen-second"
};
const ContractorOptions = [
  { name: "ABC Construction", email: "john@abcconstuct.com" },
  { name: "A Construction", email: "john@aconstuct.com" },
  { name: "B Construction", email: "john@bconstuct.com" },
  { name: "C Construction", email: "john@cconstuct.com" }
];
const DependsOnOptions = ["All", "1079", "2098"];
const PastDueOptions = ["Past due date", "Due today", "Next 3 days", "Custom"];
const ProcureByOptions = ["Before", "After"];
const ProcureBySecondValues = ["This Week", "This Month"];
const StatusOptions = [
  "In Review",
  "Approved",
  "Approved with Comments",
  "Rejected"
];
const AssigneeOptions = [
  {
    assignedTo: "Luke",
    destination: "Architect",
    contractor: "ABC Construction"
  },
  {
    assignedTo: "James",
    destination: "Project Manager",
    contractor: "ABC Construction"
  },
  {
    assignedTo: "John",
    destination: "Project Manager",
    contractor: "A Construction"
  },
  {
    assignedTo: "Maria",
    destination: "Architect",
    contractor: "A Construction"
  },
  {
    assignedTo: "Roger",
    destination: "Project Manager",
    contractor: "B Construction"
  },
  {
    assignedTo: "Mark",
    destination: "Architect",
    contractor: "B Construction"
  },
  {
    assignedTo: "Lionel",
    destination: "Project Manager",
    contractor: "C Construction"
  },
  {
    assignedTo: "Ronaldo",
    destination: "Architect",
    contractor: "C Construction"
  }
];

const PackageOptions = ["920:Electrical", "Piping"];

export const DATE_FORMAT_MMDDYYY = "MM-DD-YYYY";

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

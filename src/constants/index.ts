export const FILESIZE = 100857000;

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

export const ErrorMessages = {
  EmailRequired: "Please Enter Email-id",
  EmailInvalid: "Please Enter valid Email-id",
  PasswordRequired: "Please Enter Password"
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
  {
    name: "ABC Construction",
    email: "contact@abcconstruct.com",
    assignees: [
      { assignedTo: "Luke", destination: "Engineer" },
      { assignedTo: "James", destination: "Project Manager" }
    ]
  },
  {
    name: "A Construction",
    email: "contact@aconstruct.com",
    assignees: [
      { assignedTo: "John", destination: "Engineer" },
      { assignedTo: "Maria", destination: "Project Manager" }
    ]
  },
  {
    name: "B Construction",
    email: "contact@bconstruct.com",
    assignees: [
      { assignedTo: "Lionel", destination: "Engineer" },
      { assignedTo: "Ronaldo", destination: "Project Manager" }
    ]
  },
  {
    name: "C Construction",
    email: "contact@cconstruct.com",
    assignees: [
      { assignedTo: "Mark", destination: "Engineer" },
      { assignedTo: "Roger", destination: "Project Manager" }
    ]
  },
  {
    name: "Architect Company",
    email: "contact@architectconstruct.com",
    assignees: [
      { assignedTo: "Mark", destination: "Architect" },
      { assignedTo: "Roger", destination: "Architect" }
    ]
  }
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
const StatusOptionsForArchitects = [
  "Submittal required",
  "Submittal not required"
];
const AssigneeOptions = [
  {
    assignedTo: "Luke",
    destination: "Engineer",
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
    destination: "Engineer",
    contractor: "A Construction"
  },
  {
    assignedTo: "Roger",
    destination: "Project Manager",
    contractor: "B Construction"
  },
  {
    assignedTo: "Mark",
    destination: "Engineer",
    contractor: "B Construction"
  },
  {
    assignedTo: "Lionel",
    destination: "Project Manager",
    contractor: "C Construction"
  },
  {
    assignedTo: "Ronaldo",
    destination: "Engineer",
    contractor: "C Construction"
  },
  {
    assignedTo: "Ronaldo",
    destination: "Architect",
    contractor: "Architect company"
  },
  {
    assignedTo: "John",
    destination: "Architect",
    contractor: "Architect company"
  }
];

const PackageOptions = ["920:Electrical", "Piping"];

export const DATE_FORMAT_MMDDYYY = "MM-DD-YYYY";

export const NewConversationContent = {
  General:
    "This will be a general discussion. Please select a Submittal prior to adding a new discussion if an association is desired",
  Submittal:
    "This discussion will be associated with the selected Submittal. Please unselect the Submittal, prior to adding a new discussion if an association is not desired."
};

export const DropDownData = {
  ContractorOptions,
  StatusOptions,
  StatusOptionsForArchitects,
  AssigneeOptions,
  DependsOnOptions,
  PastDueOptions,
  PackageOptions,
  ProcureByOptions,
  ProcureBySecondValues
};

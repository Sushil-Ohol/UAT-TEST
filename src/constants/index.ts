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

export const AttachmentConfirmationMessages: any = {
  submittalDetail: {
    heading: "Do you want to attach this document into this submittal details?",
    subHeading:
      "This will give access to everyone in this submittal including external users outside of your org."
  },
  material: {
    heading: "Do you want to attach this document into this material?",
    subHeading:
      "This will give access to everyone in this material including external users outside of your org."
  }
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
const CompanyOptions = [
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
  "Rejected",
  "For Approval"
];
const StatusOptionsForArchitects = [
  "Submittal required",
  "Submittal not required"
];
const AssigneeOptions = [
  {
    assignedTo: "Luke",
    destination: "Engineer",
    company: "ABC Construction"
  },
  {
    assignedTo: "James",
    destination: "Project Manager",
    company: "ABC Construction"
  },
  {
    assignedTo: "John",
    destination: "Project Manager",
    company: "A Construction"
  },
  {
    assignedTo: "Maria",
    destination: "Engineer",
    company: "A Construction"
  },
  {
    assignedTo: "Roger",
    destination: "Project Manager",
    company: "B Construction"
  },
  {
    assignedTo: "Mark",
    destination: "Engineer",
    company: "B Construction"
  },
  {
    assignedTo: "Lionel",
    destination: "Project Manager",
    company: "C Construction"
  },
  {
    assignedTo: "Ronaldo",
    destination: "Engineer",
    company: "C Construction"
  },
  {
    assignedTo: "Ronaldo",
    destination: "Architect",
    company: "Architect Company"
  },
  {
    assignedTo: "John",
    destination: "Architect",
    company: "Architect Company"
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
  CompanyOptions,
  StatusOptions,
  StatusOptionsForArchitects,
  AssigneeOptions,
  DependsOnOptions,
  PastDueOptions,
  PackageOptions,
  ProcureByOptions,
  ProcureBySecondValues
};

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
  PasswordRequired: "Please Enter Password",
  AssigneeRole: "Please Select Assignee Role",
  AssigneeEmail: "Please enter an Assignee Email",
  AssigneeEmailRequired: "Please enter a valid email",
  AssigneeName: "Please enter an Assignee Name"
};

export const AttachmentConfirmationMessages: any = {
  heading: "Do you want to attach this document into this {type}?",
  subHeading:
    "This will give access to everyone in this {type} including external users outside of your org."
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
export const assigneesMessage = {
  project: "Not in Project",
  account: "Not in ConstructiveIQ",
  submittal: "Not in Submittal"
};

const CompanyOptions = [
  {
    name: "ABC Construction",
    email: "contact@abcconstruct.com",
    assignees: [
      {
        assignedTo: "Luke",
        destination: "Engineer",
        email: "luke@cconstruct.com",
        status: "Account Created in ConstructiveIQ",
        default: false
      },
      {
        assignedTo: "James",
        destination: "Project Manager",
        email: "james@cconstruct.com",
        status: "Project invite not accepted",
        default: false
      },
      {
        assignedTo: "Jack",
        destination: "Project Manager",
        email: "jack@cconstruct.com",
        status: "",
        default: false
      },
      {
        assignedTo: "John",
        destination: "Project Manager",
        email: "john@cconstruct.com",
        status: "Submittal invite not accepted",
        default: true
      }
    ]
  },
  {
    name: "A Construction",
    email: "contact@aconstruct.com",
    assignees: [
      {
        assignedTo: "John",
        destination: "Engineer",
        email: "john@cconstruct.com",
        status: "Project invite not accepted",
        default: false
      },
      {
        assignedTo: "Maria",
        destination: "Project Manager",
        email: "maria@cconstruct.com",
        status: "Submittal invite not accepted",
        default: true
      },
      {
        assignedTo: "Luke",
        destination: "Engineer",
        email: "luke@cconstruct.com",
        status: "",
        default: false
      },
      {
        assignedTo: "Mira",
        destination: "Engineer",
        email: "mira@cconstruct.com",
        status: "Account Created in ConstructiveIQ",
        default: false
      }
    ]
  },
  {
    name: "B Construction",
    email: "contact@bconstruct.com",
    assignees: [
      {
        assignedTo: "Lionel",
        destination: "Engineer",
        email: "lionel@cconstruct.com",
        status: "Submittal invite not accepted",
        default: false
      },
      {
        assignedTo: "Ronaldo",
        destination: "Project Manager",
        email: "ronaldo@cconstruct.com",
        status: "Project invite not accepted",
        default: false
      },
      {
        assignedTo: "Luke",
        destination: "Engineer",
        email: "luke@cconstruct.com",
        status: "Account Created in ConstructiveIQ",
        default: true
      },
      {
        assignedTo: "Jack",
        destination: "Engineer",
        email: "jack@cconstruct.com",
        status: "",
        default: false
      }
    ]
  },
  {
    name: "C Construction",
    email: "contact@cconstruct.com",
    assignees: [
      {
        assignedTo: "Mark",
        destination: "Engineer",
        email: "mark@cconstruct.com",
        status: "Account Created in ConstructiveIQ",
        default: false
      },
      {
        assignedTo: "Roger",
        destination: "Project Manager",
        email: "roger@cconstruct.com",
        status: "Submittal invite not accepted",
        default: true
      },
      {
        assignedTo: "Luke",
        destination: "Engineer",
        email: "luke@cconstruct.com",
        status: "Project invite not accepted",
        default: false
      },
      {
        assignedTo: "John",
        destination: "Engineer",
        email: "john@cconstruct.com",
        status: "",
        default: false
      }
    ]
  },
  {
    name: "Architect Company",
    email: "contact@architectconstruct.com",
    assignees: [
      {
        assignedTo: "Mark",
        destination: "Architect",
        email: "mark@cconstruct.com",
        status: "Submittal invite not accepted",
        default: false
      },
      {
        assignedTo: "Jack",
        destination: "Architect",
        email: "jack@cconstruct.com",
        status: "Account Created in ConstructiveIQ",
        default: false
      },
      {
        assignedTo: "Mack",
        destination: "Architect",
        email: "mack@cconstruct.com",
        status: "Project invite not accepted",
        default: true
      },
      {
        assignedTo: "Roger",
        destination: "Architect",
        email: "roger@cconstruct.com",
        status: "",
        default: false
      }
    ]
  }
];
export const imgExtentions = ["png", "jpg", "jpeg", "gif"];
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
export const assigneesStatus = {
  account: "Account Created in ConstructiveIQ",
  project: "Project invite not accepted",
  submittal: "Submittal invite not accepted",
  newAssignee: "Project invite not accepted",
  present: "Present in ConstructiveIQ"
};
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
const RoleOptions = [
  "Architect",
  "Project Engineer",
  "Project Manager",
  "Electrical Designer",
  "Mechanical Designer"
];

export const CopyDocumentModalContent = {
  Confirm: "Do you want to copy this document to ",
  General: "This will be associated with the selected Submittal."
};

export const CompanyChangeWarningMessages = {
  firstMsg:
    "Currently {companyName} has access to edit this submittal. To avoid conflicts, you cannot make edits while it is being worked on.",
  secondMsg: "Force regain edit access",
  thirdMsg: "{companyName} will lose edit access until you pass it back"
};

export const RegainEditConfirmationMessages = {
  firstMsg: "Force regain edit access?",
  secondMsg: "You are about to revoke edit access to the submittal.",
  thirdMsg:
    'This might lead to loss of unsaved work for the user; "{currentUserEmail}". Are you sure you want to continue?'
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
  ProcureBySecondValues,
  RoleOptions,
  assigneesStatus
};

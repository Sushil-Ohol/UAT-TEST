import { Form, Input, Select } from "antd";
// import "./assignee-dropdown.css";
import { DropDownData, ErrorMessages } from "constants/index";

function CompanyAssigneeForm(props: any) {
  const { isCompanyModal } = props;
  const { Option } = Select;

  return (
    <>
      {isCompanyModal && (
        <Form.Item
          name="companyName"
          label="Company Name"
          className="add-new-company-label"
          rules={[
            {
              required: true,
              message: "Please enter a company name"
            },
            {
              validator: (_, value) =>
                !value.startsWith(" ")
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("String does not start with space")
                    ),
              message: "String does not start with space"
            }
          ]}
        >
          <Input
            name="companyName"
            className="add-new-company-input"
            placeholder="Enter company name"
          />
        </Form.Item>
      )}
      <Form.Item
        name="assigneeUserName"
        label="Assignee Name"
        className="add-new-assignee-label"
        rules={[
          {
            required: true,
            message: ErrorMessages.AssigneeName
          },
          {
            validator: (_, value) =>
              !value.startsWith(" ")
                ? Promise.resolve()
                : Promise.reject(new Error("String does not start with space")),
            message: "String does not start with space"
          }
        ]}
      >
        <Input
          name="assigneeUserName"
          className="add-new-assignee-input"
          placeholder="Enter Assignee name"
        />
      </Form.Item>
      <Form.Item
        name="assigneeRole"
        label="Assignee Role"
        className="add-new-assignee-label"
        rules={[
          {
            required: true,
            message: ErrorMessages.AssigneeRole
          }
        ]}
      >
        <Select showSearch optionFilterProp="children" className="roleSelect">
          {DropDownData.RoleOptions.map((data: any) => (
            <Option key={data}>{data}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="assigneeEmailId"
        label="Assignee Email"
        className="add-new-assignee-label"
        rules={[
          { type: "email", message: ErrorMessages.AssigneeEmail },
          {
            required: true,
            message: ErrorMessages.AssigneeEmailRequired
          }
        ]}
      >
        <Input
          name="emailId"
          className="add-new-assignee-input"
          placeholder="Enter an email id"
        />
      </Form.Item>
    </>
  );
}

export default CompanyAssigneeForm;

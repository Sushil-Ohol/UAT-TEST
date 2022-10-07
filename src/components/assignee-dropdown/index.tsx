import { Button, Form, Select } from "antd";
import { FolderDottedIcon, ProfileDottedIcon } from "components/svg-icons";
import { assigneesStatus } from "constants/index";
import "./assignee-dropdown.css";

export function SelectOption({ item }: any) {
  return (
    <p
      style={{
        marginBottom: "3%"
      }}
    >
      {assigneesStatus.account === item.status && <ProfileDottedIcon />}
      &nbsp;
      {assigneesStatus.project === item.status && <FolderDottedIcon />}
      &nbsp;{" "}
      <span className="assignee-dropdown-heading">{item.assignedTo}</span>
      <br />{" "}
      <span className="assignee-dropdown-sub-heading">
        {item.destination} • {item.email}
      </span>
      <br />
      <span className="assignee-dropdown-sub-heading-red">{item.status}</span>
    </p>
  );
}

function AssigneeDropdown(props: any) {
  const { name, title, showNewButton, form, data, showModal } = props;
  const { Option } = Select;

  return (
    <Form.Item
      name={name}
      label={
        <span>
          {title}

          {showNewButton && form.getFieldValue("company") && (
            <Button className="add-new-assignee-btn" onClick={showModal}>
              + New
            </Button>
          )}
        </span>
      }
      rules={[
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (getFieldValue("company") && !value) {
              return Promise.reject(new Error(`Select ${title}.`));
            }
            return Promise.resolve();
          }
        })
      ]}
    >
      <Select
        className="constructionSelect"
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option!.key as unknown as string)
            .toLowerCase()
            .includes(input.toString().toLowerCase())
        }
      >
        {data?.length > 0 &&
          data
            .filter((x: any) => x.assignedTo !== "All")
            .map((item: any) => (
              <Option key={item.assignedTo} value={item.assignedTo}>
                {/* {item.assignedTo} */}
                <SelectOption item={item} />
              </Option>
            ))}
      </Select>
    </Form.Item>
  );
}

export default AssigneeDropdown;

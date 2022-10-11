import { Button, Form, Select, Tooltip } from "antd";
import {
  FolderDottedIcon,
  ProfileDottedIcon,
  SubmittalIcon,
  MaskGroupIcon
} from "components/svg-icons";
import { assigneesStatus } from "constants/index";
// import { useEffect } from "react";
import "./assignee-dropdown.css";

export function SelectOption({ item }: any) {
  return (
    <p
      style={{
        marginBottom: "3%",
        width: "100%"
      }}
    >
      {assigneesStatus.account !== item.status && <MaskGroupIcon />}
      {assigneesStatus.account === item.status && (
        <Tooltip title={assigneesStatus.account} placement="topLeft">
          <ProfileDottedIcon />
        </Tooltip>
      )}
      &nbsp;
      {assigneesStatus.project === item.status && <FolderDottedIcon />}
      {assigneesStatus.submittal === item.status && <SubmittalIcon />}
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
  const {
    name,
    title,
    showNewButton,
    form,
    data,
    showModal,
    setChangeAssignee
  } = props;
  const { Option } = Select;

  return (
    <Form.Item
      name={name}
      label={
        <div style={{ display: "flex", alignContent: "center" }}>
          {title()}
          {showNewButton && form.getFieldValue("company") && (
            <Button className="add-new-assignee-btn" onClick={showModal}>
              + New
            </Button>
          )}
        </div>
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
        onChange={(value) => {
          setChangeAssignee(value);
        }}
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

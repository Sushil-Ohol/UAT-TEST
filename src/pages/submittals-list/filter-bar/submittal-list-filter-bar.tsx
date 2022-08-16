import { useCallback } from "react";
import { Space, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DropDownData } from "../../../constants";

function SubmittalListFilterComponent(props: any) {
  const { gridRef, onApplyClick, onNewClick } = props;

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, [gridRef]);

  return (
    <div className="FilterRow" style={{ display: "flex", margin: "1px 0px" }}>
      <Space>
        <Input
          type="text"
          id="filter-text-box"
          placeholder="Search"
          prefix={<SearchOutlined />}
          onInput={onFilterTextBoxChanged}
        />
        <Input.Group compact>
          <Input style={{ width: "10%" }} defaultValue="Status" disabled />
          <Select
            style={{ width: 85 }}
            onChange={(value: any) => {
              gridRef.current!.api.setQuickFilter(value);
            }}
            defaultValue="All"
          >
            {DropDownData.StatusOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          &nbsp;&nbsp;
          <Input style={{ width: "10%" }} defaultValue="Contractor" disabled />
          <Select
            style={{ width: 85 }}
            onChange={(value: any) => {
              gridRef.current!.api.setQuickFilter(value);
            }}
            defaultValue="All"
          >
            {DropDownData.ContractorOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <Input style={{ width: "10%" }} defaultValue="Due" disabled />
          <Select
            style={{ width: 100 }}
            onChange={(value: any) => {
              gridRef.current!.api.setQuickFilter(value);
            }}
            defaultValue="Past due"
          />
        </Input.Group>
      </Space>
      <div style={{ display: "flex", margin: "1px 0px" }}>
        <Button onClick={onApplyClick}>Apply</Button>
        <Button onClick={onNewClick}>+ New Submittal</Button>
      </div>
    </div>
  );
}

export default SubmittalListFilterComponent;

import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Select, Button } from "antd";
import { useCallback } from "react";

import { DropDownData } from "../../../constants";

function MaterialListFilterBar(props: any) {
  const { gridRef, onNewClick, onApplyClick } = props;

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
          onInput={onFilterTextBoxChanged}
          prefix={<SearchOutlined />}
        />
        <Input.Group compact>
          <Input style={{ width: "10%" }} defaultValue="Status" disabled />
          <Select
            style={{ width: 120, background: "#DCDCDC" }}
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
          <Input style={{ width: "10%" }} defaultValue="Assigned" disabled />
          <Select
            style={{ width: 120, background: "#DCDCDC" }}
            onChange={(value: any) => {
              gridRef.current!.api.setQuickFilter(value);
            }}
            defaultValue="All"
          >
            {DropDownData.AssigneeOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          &nbsp;&nbsp;
          <Input
            style={{ width: "10%", background: "#DCDCDC" }}
            defaultValue="Procure by"
            disabled
          />
          <Select
            style={{ width: 120, background: "#DCDCDC" }}
            onChange={(value: any) => {
              gridRef.current!.api.setQuickFilter(value);
            }}
            defaultValue="All"
          >
            {DropDownData.ProcureByOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <Input style={{ width: "5%" }} defaultValue="Due" disabled />
          <Select
            style={{ width: 120, background: "#DCDCDC" }}
            onChange={(value: any) => {
              gridRef.current!.api.setQuickFilter(value);
            }}
            defaultValue="All"
          >
            {DropDownData.ProcureBySecondValues.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Input.Group>
        <Button onClick={onApplyClick}>Apply</Button>
      </Space>
      <div style={{ marginLeft: "auto" }}>
        <Button onClick={onNewClick}>+ New Material</Button>
      </div>
    </div>
  );
}

export default MaterialListFilterBar;
